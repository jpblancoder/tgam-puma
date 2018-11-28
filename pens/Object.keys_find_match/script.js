// Object.keys find match
console.clear();

import find from "lodash/find";

const unitId = "btyb-gpt-1";
const isMatch = (id) => (unitId === id);

const cats = {
  "galleyFlex": () => isMatch("galflex-gpt-1"), // gallery - enhanced viewer
  "commentsBox": () => isMatch("boxc-gpt-1"), // comments - right-rail sticky ad
  "sponsoredBtyb": () => isMatch("btyb-gpt-1") // sponsored - (brought to you by) ad
};

const result = Object.keys(cats).find((key) => cats[key]()) || null;

console.log(`cats1 is: ${result}`);

const cats2 = [
  { name: "homePage", value: false }, // Page that uses "homepage" layout
  { name: "premiumPage", value: false }, // Premium article page
  { name: "standardPage", value: true }, // Standard article page
  { name: "premiumSection", value: false }, // Premium section page
  { name: "financialSection", value: false }, // Financial section or leaf page
  { name: "standardSection", value: true } // meta.isSectionPage (default)
];

console.log("cats2 is: " + cats2.find((item) => {
  return item.value === true;
}).name);

// news below is not a type, per se, but a catch all for "none"/"column"
const pgtype = "story";
const subtype = "video";
const types = {
  longread: subtype === "longread",
  video: subtype === "video",
  gallery: subtype === "gallery",
  news: pgtype === "story" && ["longread", "gallery", "interactive"].indexOf(subtype) === -1,
  interactive: subtype === "interactive"
};
const contentType = find(Object.keys(types), val => types[val] === true);
// const contentType = find(Object.keys(types), val => {
//   console.log("val", val);
//   return types[val] === true;
// });
console.log("contentType is: ", contentType);
