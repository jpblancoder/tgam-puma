/* global process, __filename, Buffer */

import _ from "lodash";
import autocomplete from "inquirer-autocomplete-prompt";
import debug from "gulp-debug";
import del from "del";
import dotenv from "dotenv";
import fs from "fs"; // node file system
import fuzzy from "fuzzy";
import gulp from "gulp";
import open from "gulp-open";
import log from "fancy-log";
import prompt from "gulp-prompt";
import runSequence from "run-sequence";
import through from "through2";
import vinylPaths from "vinyl-paths";
import Promise from "promise";

dotenv.config(); // get: process.env.VAR
prompt.inq.registerPrompt("autocomplete", autocomplete); // for pen remove task

// package.json dependencies to be synced with this repo
const pack = {
  deps: [
    "es6-promise",
    "lodash",
    "reqwest",
    "domready"
  ],
  devDeps: [
    "autoprefixer",
    "babel-core",
    "babel-preset-es2015",
    "eslint",
    "eslint-config-idiomatic",
    "eslint-friendly-formatter",
    "eslint-loader",
    "node-sass"
  ]
};

// transform the config files that need adjustments
const transform = {
  ".babelrc": transformBabel,
  ".eslintrc.json": transformEsLint
};

// glob file paths for gulp tasks
const path = {
  localhost: "http://localhost:1234/",
  meta: {
    root: "./.posthtmlrc", // contains pens data
    pens: "plugins['posthtml-expressions'].locals.pens" // object path
  },
  codepen: {
    markup: "codepen.html"
  },
  partial: {
    pen: {
      markup: "markup.html",
      script: "script.js",
      style: "style.scss"
    }
  },
  base: {
    package: "package.json",
    configs: [ // to be synced
      ".babelrc",
      ".browserslistrc",
      ".editorconfig",
      ".eslintrc.json",
      ".npmrc",
      ".postcssrc",
      ".sass-lint.yml"
    ],
  },
  local: { // Puma repo
    root: "./"
  },
  remote: { // PageBuilder repo
    root: process.env.PB_REPO,
  }
};

// config paths to remote repo
path.remote.package = path.remote.root + path.base.package;
path.remote.configs = _.map(path.base.configs, filename => {
  return path.remote.root + filename;
});

// config paths to local repo
path.local.package = path.local.root + path.base.package;
path.local.configs = _.map(path.base.configs, filename => {
  return path.local.root + filename;
});

// process and transform the config file contents
function transformBabel(file) {
  const babel = JSON.parse(file.contents.toString());
  _.unset(babel, "env");
  file.contents = new Buffer(JSON.stringify(babel, null, 2));
  return file;
}

// process and transform the config file contents
function transformEsLint(file) {
  const eslint = JSON.parse(file.contents.toString());
  // add more console methods to ignore
  if (_.has(eslint, "rules['no-console'][1].allow")) {
    eslint.rules["no-console"][1].allow.push("clear", "log");
  }
  _.unset(eslint, "globals");
  file.contents = new Buffer(JSON.stringify(eslint, null, 2));
  return file;
}

// update each dependency item in list
function updateDeps(list, oldDeps, newDeps) {
  let ret = _.cloneDeep(oldDeps);
  list.forEach(item => {
    let value = newDeps[item];
    if (value) {
      ret[item] = value;
      log(`Synced: ${item}: ${value}`);
    } else {
      log.warning(`Missed: ${item}`);
    }
  });
  return ret;
}

// process glob of config files to load
function loadConfigs() {
  return through.obj((file, enc, callback) => {
    let f = file;
    Object.keys(transform).forEach(key => {
      f = (f.path.indexOf(key) >= 0) ? transform[key](f) : f;
    });
    callback(null, f);
  });
};

// return true if the directory path exists
function pathExists(filepath) {
  try {
    fs.accessSync(filepath);
    return true;
  } catch (err) {
    return false;
  }
}

// sanitize the folder name for Linux and Windows
function sanitizeFolder(name) {
  let ret = name.replace(/[\\\/\<\>\:\"\|\?\*]/g, "");
  return ret.replace(/[\s]/g, "_");
}

// load pens and prune any items that have expired (missing folders)
function loadPens(metaPath) {
  // load the metaData from the file
  const metaData = JSON.parse(fs.readFileSync(metaPath));
  if (!_.has(metaData, path.meta.pens)) {
    log.error("Error loading and processing metadata file: .posthtmlrc");
    return;
  }
  let pens = _.get(metaData, path.meta.pens);

  // ensure all existing items still exist, otherwise remove them.
  Object.keys(pens).forEach(key => {
    let filepath = `${path.local.root}pens/${key}/markup.html`;
    if (!pathExists(filepath)) {
      _.unset(pens, key); // delete item
      del([`${path.local.root}pens/${key}`]); // entire folder
      log.warn(`Deleted expired pen: ${key}`);
    }
  });

  return _.set(metaData, path.meta.pens, pens);
}

// save the new metaData file
function savePens(metaPath, metaData) {
  fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2));
}

// add a new pen to the metaData
function addPen(metaData, key, value) {
  let ret = _.cloneDeep(metaData);
  _.set(ret, `${path.meta.pens}['${key}']`, value);
  return ret;
}

// remove a new pen from the metaData
function removePen(metaData, key) {
  let ret = _.cloneDeep(metaData);
  _.unset(ret, `${path.meta.pens}['${key}']`);
  return ret;
}

// return the relative pen folder path
function destFolder(folder) {
  return `${path.local.root}pens/${folder}/`;
}

// generate the config for a title
function promptInput({ message } = {}) {
  return {
    type: "input",
    name: "title",
    message
  };
}

// generate the config for a pen selection prompt
function promptSelect({ message, choices } = {}) {
  return {
    type: "autocomplete",
    name: "pen", // answer key
    message, // displaed to user
    choices, // of pens in list
    pageSize: 10,
    // autocomplete fuzzy search
    source: (answers, input) => {
      let term = input || "";
      return new Promise(resolve => {
        var result = fuzzy.filter(term, choices);
        resolve(result.map(el => {
          return el.original;
        }));
      });
    }
  };
}

// copy all the config files from PageBuilder repo into this repo
gulp.task("config:sync", (cb) => {
  log("Syncing with PageBuilder repo ...");
  runSequence("config:clean", "config:copy", "config:package", cb);
});

// delete all the local config files
gulp.task("config:clean", () => {
  log("Deleting this repo's configs");
  return gulp
    .src(path.local.configs, {
      read: false
    })
    .pipe(debug({
      title: "Deleted:"
    }))
    .pipe(vinylPaths(del));
});

// copy all the config files from PageBuilder repo into this repo
gulp.task("config:copy", () => {
  log("Copying remote repo configs");
  return gulp
    .src(path.remote.configs, {
      base: path.remote.root
    })
    .pipe(debug({
      title: "Copied:"
    }))
    .pipe(loadConfigs())
    .pipe(gulp.dest("."));
});

// sync the package.json file from PageBuilder repo into this repo
gulp.task("config:package", () => {
  log("Syncing with remote package.json");
  const localPack = JSON.parse(fs.readFileSync(path.local.package));
  const remotePack = JSON.parse(fs.readFileSync(path.remote.package));
  localPack.dependencies = updateDeps(pack.deps, localPack.dependencies, remotePack.dependencies);
  localPack.devDependencies = updateDeps(pack.devDeps, localPack.devDependencies, remotePack.devDependencies);
  fs.writeFileSync(path.local.package, JSON.stringify(localPack, null, 2));
  log("Syncing completed - manually run: npm install");
  return gulp;
});

// create a new pen folder, based on name param, and pen template
gulp.task("pen:add", () => {
  const metaData = loadPens(path.meta.root);

  return gulp.src("./gulpfile.babel.js")
    .pipe(prompt.prompt([
      promptInput({
        message: "Enter new pen title:"
      })
    ], (answer) => {
      log(`Creating new pen: ${answer.title}`);
      const folder = sanitizeFolder(answer.title);
      const destination = destFolder(folder);
      const newData = addPen(metaData, folder, answer.title);

      savePens(path.meta.root, newData);

      const base = path.local.root + "partial/pen/";
      gulp.src([
        base + path.partial.pen.markup,
        base + path.partial.pen.script,
        base + path.partial.pen.style
      ], {
        base: base
      })
        .pipe(gulp.dest(destination));
    }));
});

// delete an unwanted pen item and related folder
gulp.task("pen:remove", () => {
  const metaData = loadPens(path.meta.root);
  const pens = _.get(metaData, path.meta.pens);
  const values = Object.keys(pens).map(k => pens[k]);

  return gulp.src("./gulpfile.babel.js")
    .pipe(prompt.prompt([
      promptSelect({
        message: "Select the pen to delete:",
        choices: values
      })
    ], (answer) => {
      log(`Deleting pen: ${answer.pen}`);
      const folder = sanitizeFolder(answer.pen);
      const destination = destFolder(folder);
      const newData = removePen(metaData, folder);

      savePens(path.meta.root, newData);

      del([destination]).then(() => {
        log(`Deleted folder: ${destination}`);
      });
    }));
});

// rename an existing pen item and related folder
gulp.task("pen:rename", () => {
  const metaData = loadPens(path.meta.root);
  const pens = _.get(metaData, path.meta.pens);
  const values = Object.keys(pens).map(k => pens[k]);

  return gulp.src("./gulpfile.babel.js")
    .pipe(prompt.prompt([
      promptSelect({
        message: "Select the pen to rename:",
        choices: values
      }),
      promptInput({
        message: "Enter new pen title:"
      })
    ], (answer) => {
      log(`Renaming pen: ${answer.pen}`);
      const folder = sanitizeFolder(answer.pen);
      const destination = destFolder(folder);
      let newData = removePen(metaData, folder);

      log(`Renamed pen: ${answer.title}`);
      const newFolder = sanitizeFolder(answer.title);
      const newDestination = destFolder(newFolder);
      newData = addPen(newData, newFolder, answer.title);

      savePens(path.meta.root, newData);

      fs.renameSync(destination, newDestination);
      log(`Renamed folder: ${newDestination}`);
    }));
});

// convert an existing Puma pen into Codepen.io pen
gulp.task("pen:eject", () => {
  const metaData = loadPens(path.meta.root);
  const pens = _.get(metaData, path.meta.pens);
  const values = Object.keys(pens).map(k => pens[k]);

  return gulp.src("./gulpfile.babel.js")
    .pipe(prompt.prompt([
      promptSelect({
        message: "Select the pen to eject:",
        choices: values
      })
    ], (answer) => {
      log(`Ejecting pen: ${answer.pen}`);
      const folder = sanitizeFolder(answer.pen);
      const destination = destFolder(folder);

      // use the compiled markup instead of the uncompiled
      const markup = fs.readFileSync(`${path.local.root}dist/pens/${folder}/${path.partial.pen.markup}`, "utf8");
      // const markup = fs.readFileSync(destination + path.partial.pen.markup, "utf8");

      const script = fs.readFileSync(destination + path.partial.pen.script, "utf8");
      const style = fs.readFileSync(destination + path.partial.pen.style, "utf8");

      const specimen = codepenSpecimen(answer.pen, markup, script, style);
      const template = codepenTemplate(specimen);

      const filepath = path.local.root + "dist/" + path.codepen.markup;
      fs.writeFileSync(filepath, template);

      // open the temp file in the browser
      const uri = path.localhost + path.codepen.markup;
      return gulp.src(__filename).pipe(open({ uri }));
    }));
});

function codepenSpecimen(title, markup, script, style) {
  // CodePen.io prefill: https://blog.codepen.io/documentation/api/prefill/
  let codepenData = {
    title: title,
    editors: "111", // panels: html show, css show, js show
    head: "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
    html: markup,
    js: script,
    js_pre_processor: "babel",
    css: style,
    css_pre_processor: "scss"
  };
  // stringify the html for form submission to Codepen
  return JSON.stringify(codepenData).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
}

// generate a page that will re-direct a form POST to CodePen.io prefill url
function codepenTemplate(codepenData) {
  return `
  <html>
    <head>
      <title>TGAM Puma</title>
    </head>
    <body onload="document.codepen.submit()">
      <p>Redirecting to CodePen.io ...</p>
      <form id="codepen" name="codepen" action="https://codepen.io/pen/define" method="POST">
        <input type="hidden" name="data" value="${codepenData}" />
      </form>
    </body>
  </html>`;
}

// prune and save the pens metaData of expired pens
gulp.task("pen:trim", () => {
  log("Pruning any pens, which don't have folders ...");
  savePens(path.meta.root, loadPens(path.meta.root));
});
