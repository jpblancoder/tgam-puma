// Lodash condition
console.clear();

import _ from "lodash";

let func = _.cond([
  [_.matches({ "a": 1 }), _.constant("matches A")],
  [_.conforms({ "b": _.isNumber }), _.constant("matches B")],
  [_.stubTrue, _.constant("no match")]
]);

const t1 = func({ "a": 1, "b": 2 });
// => 'matches A'
console.log(t1);
