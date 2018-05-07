import fuzzy from "fuzzy";
import domReady from "domready";

domReady(() => {
  const search = document.getElementById("pen-search");
  const output = document.getElementById("pen-output");
  const kvps = window.pens; // kvp list (folder: title)
  const list = Object.keys(kvps).map(key => ({
    url: `./pens/${ key }/markup.html`,
    title: kvps[key]
  }));
  const onKeyUp = () => {
    listPens(search.value, list, output);
  };
  search.addEventListener("keyup", onKeyUp);
  onKeyUp();
});

function listPens(input = "", values, output) {
  const options = {
    pre: "<span class='pen-highlight'>",
    post: "</span>",
    extract: el => el.title
  };
  const filtered = fuzzy.filter(input, values, options);
  const markup = filtered.map(entry => {
    return `<li><a href="${ entry.original.url }">${ entry.string }</a></li>`;
  });
  output.innerHTML = markup.join("");
}
