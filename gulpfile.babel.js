/* global process, Buffer */

import _ from "lodash";
import autocomplete from "inquirer-autocomplete-prompt";
import debug from "gulp-debug";
import del from "del";
import dotenv from "dotenv";
import fs from "fs"; // node file system
import fuzzy from "fuzzy";
import gulp from "gulp";
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
const paths = {
  meta: {
    root: "./.posthtmlrc", // contains (metaPens) data
    pens: "plugins['posthtml-expressions'].locals.pens" // object path
  },
  pens: "./pens/",
  localhost: {
    pens: "http://localhost:1234/pens/"
  },
  partial: {
    pen: {
      root: "./partial/pen/",
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
paths.remote.package = paths.remote.root + paths.base.package;
paths.remote.configs = _.map(paths.base.configs, filename => {
  return paths.remote.root + filename;
});

// config paths to local repo
paths.local.package = paths.local.root + paths.base.package;
paths.local.configs = _.map(paths.base.configs, filename => {
  return paths.local.root + filename;
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
  if (!_.has(metaData, paths.meta.pens)) {
    log.error("Error loading and processing metadata file: .posthtmlrc");
    return;
  }
  let pens = _.get(metaData, paths.meta.pens);

  // ensure all existing items still exist, otherwise remove them.
  Object.keys(pens).forEach(key => {
    let filepath = `${paths.pens}${key}/markup.html`;
    if (!pathExists(filepath)) {
      _.unset(pens, key); // delete item
      del([`${paths.pens}${key}`]); // entire folder
      log.warn(`Deleted expired pen: ${key}`);
    }
  });

  return _.set(metaData, paths.meta.pens, pens);
}

// save the new metaData file
function savePens(metaPath, metaData) {
  fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2));
}

// add a new pen to the metaData
function addPen(metaData, key, value) {
  let ret = _.cloneDeep(metaData);
  _.set(ret, `${paths.meta.pens}['${key}']`, value);
  return ret;
}

// remove a new pen from the metaData
function removePen(metaData, key) {
  let ret = _.cloneDeep(metaData);
  _.unset(ret, `${paths.meta.pens}['${key}']`);
  return ret;
}

// return the relative pen folder path
function destFolder(folder) {
  return `${paths.pens}${folder}/`;
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
    .src(paths.local.configs, {
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
    .src(paths.remote.configs, {
      base: paths.remote.root
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
  const localPack = JSON.parse(fs.readFileSync(paths.local.package));
  const remotePack = JSON.parse(fs.readFileSync(paths.remote.package));
  localPack.dependencies = updateDeps(pack.deps, localPack.dependencies, remotePack.dependencies);
  localPack.devDependencies = updateDeps(pack.devDeps, localPack.devDependencies, remotePack.devDependencies);
  fs.writeFileSync(paths.local.package, JSON.stringify(localPack, null, 2));
  log("Syncing completed - manually run: npm install");
  return gulp;
});

// create a new pen folder, based on name param, and pen template
gulp.task("pen:add", () => {
  const metaData = loadPens(paths.meta.root);

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

      savePens(paths.meta.root, newData);

      const url = `${paths.localhost.pens}${folder}/${paths.partial.pen.markup}`;
      log(`Created new pen: ${url}`);

      return gulp.src([
        paths.partial.pen.root + paths.partial.pen.markup,
        paths.partial.pen.root + paths.partial.pen.script,
        paths.partial.pen.root + paths.partial.pen.style
      ], {
        base: paths.partial.pen.root
      })
        .pipe(gulp.dest(destination));
    }));
});

// delete an unwanted pen item and related folder
gulp.task("pen:remove", (done) => {
  const metaData = loadPens(paths.meta.root);
  const pens = _.get(metaData, paths.meta.pens);
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

      savePens(paths.meta.root, newData);

      fs.rmdir(destination, (err) => {
        if (err) {
          throw err;
        }
        log(`Deleted folder: ${destination}`);
        done();
      });
    }));
});

// rename an existing pen item and related folder
gulp.task("pen:rename", (done) => {
  const metaData = loadPens(paths.meta.root);
  const pens = _.get(metaData, paths.meta.pens);
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

      savePens(paths.meta.root, newData);

      fs.renameSync(destination, newDestination, (err) => {
        if (err) {
          throw err;
        }
        log(`Renamed folder: ${newDestination}`);
        done();
      });
    }));
});

// prune and save the pens metaData of expired pens
gulp.task("pen:trim", () => {
  log("Pruning any pens, which don't have folders ...");
  savePens(paths.meta.root, loadPens(paths.meta.root));
});
