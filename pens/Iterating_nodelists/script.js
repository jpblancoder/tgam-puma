// Iterating NodeLists
console.clear();

import isNil from "lodash/isNil";
import each from "lodash/each";
import map from "lodash/map";
import filter from "lodash/filter";

function toArray(val) {
  if (isNil(val)) {
    return null;
  } else if (!isNil(Array.from)) {
    return Array.from(val);
  } else {
    return [].slice.call(val);
  }
}

// generate HTML list
let out = document.getElementById("output");
out.innerHTML = "";

let ul = document.createElement("ul");

for (let i = 1; i <= 3; i++) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(`Item #${i}`));
  ul.appendChild(li);
}

out.appendChild(ul);

// select HTML list
let nodeList = document.querySelectorAll("ul > li");
let arrayList = toArray(nodeList);

// =====================
// arrayList

arrayList.forEach(item => {
  console.log("arrayList.forEach:", item);
});

arrayList.map(item => {
  console.log("arrayList.map:", item);
});

arrayList.filter((item, index) => {
  console.log("arrayList.filter:", item, index);
  return index >= 2;
});

each(arrayList, item => {
  console.log("each(arrayList):", item);
});

let map1 = map(arrayList, item => {
  console.log("map(arrayList):", item);
  return item;
});
console.log("map1", map1);

let filter1 = filter(arrayList, item => {
  console.log("filter(arrayList):", item);
  return item.innerHTML.indexOf("3") > -1;
});
console.log("filter1", filter1);

// =====================
// nodeList

nodeList.forEach(item => {
  console.log("nodeList.forEach:", item);
});

// Uncaught TypeError: nodeList.map is not a function
// nodeList.map((item) => {
//   console.log('nodeList.map:', item);
// });

each(nodeList, item => {
  console.log("each(nodeList):", item);
});

let map2 = map(nodeList, item => {
  console.log("map(nodeList):", item);
  return item;
});
console.log("map2", map2);

let filter2 = filter(nodeList, item => {
  console.log("filter(nodeList):", item);
  return item.innerHTML.indexOf("3") > -1;
});
console.log("filter2", filter2);
