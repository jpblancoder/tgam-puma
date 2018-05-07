// Collection iteration
console.clear();

import _ from "lodash";

let collection = {
  "one": 1,
  "two": 2,
  "three": 3
};

_.each(collection, (item) => {
  console.log("_.each:", item);
});

_.map(collection, (item) => {
  console.log("_.map:", item);
});

for (let key in collection) {
  console.log("for key:", key, collection[key]);
}

// collection.forEach(function(item) {
//   console.log('collection.forEach:', item);
// });

