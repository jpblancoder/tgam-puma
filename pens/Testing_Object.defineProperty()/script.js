// Testing Object.defineProperty()
console.clear();

window.tgam = window.tgam || {};
window.tgam.meta = {};

Object.defineProperty(window.tgam.meta, "isVideoPage", {
  get() {
    return window.tgam.meta.pagetype === "video";
  }
});

window.tgam.meta.pagetype = "video";

document.querySelector("#output").innerHTML = "isVideoPage:" + window.tgam.meta.isVideoPage;

console.log(document.querySelector("#output"));

console.log(`isVideoPage: ${window.tgam.meta.isVideoPage}`);
