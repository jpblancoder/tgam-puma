import fuzzy from "fuzzy";
import domReady from "domready";

domReady(() => {
  const search = document.getElementById("js-pen-search");
  const output = document.getElementById("js-pen-output");
  const links = toArray(document.getElementsByClassName("js-pen-link"));

  const list = links.map(link => ({
    url: link.href,
    title: link.innerHTML
  }));

  const onKeyUp = () => {
    listPens(search.value, list, output);
  };
  search.addEventListener("keyup", onKeyUp);
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

function toArray(val) {
  if (Array.from) {
    return Array.from(val);
  } else {
    return [].slice.call(val);
  }
}
