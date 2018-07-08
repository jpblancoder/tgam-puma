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

  // no need to throttle input, since data is local.
  search.addEventListener("keyup", () => {
    output.innerHTML = listPens(list, search.value);
  });
});

// return the markup for the desired pen list
function listPens(values, input = "") {
  const options = {
    pre: "<span class='pen-highlight'>",
    post: "</span>",
    extract: el => el.title
  };
  const filtered = fuzzy.filter(input, values, options);
  const markup = filtered.map(entry => {
    return `<li><a href="${ entry.original.url }">${ entry.string }</a></li>`;
  });
  return markup.join("");
}

// convert nodelist to an array
function toArray(v) {
  return (Array.from ? Array.from(v) : [].slice.call(v));
}
