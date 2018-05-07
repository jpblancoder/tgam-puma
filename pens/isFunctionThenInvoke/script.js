// isFunctionThenInvoke
console.clear();

import _ from "lodash";

/**
 * @method isFunctionThenInvoke
 * @description If `func` is a Function, then return the value of invoked `func` with `args`.
 * Otherwise, if `func` isn't a Function, the return the `def` (default) value.
 * @param {function} func - The function to invoke.
 * @param {array} args - The arguments to invoke `func` with.
 * @param {*} def - The default value to return.
 * @returns {*} Returns the result of `func`.
 */
export function isFunctionThenInvoke(func, args = null, def = null) {
  return _.isFunction(func) ? func.apply(undefined, args) : def; // https://lodash.com/docs/#isFunction
}

let test1 = undefined;
function test2(p) {
  return p;
}

console.log("test 1a", isFunctionThenInvoke(test1));
console.log("test 1b", isFunctionThenInvoke(test1, [111]));
console.log("test 1c", isFunctionThenInvoke(test1, null, 11));
console.log("test 1d", isFunctionThenInvoke(test1, [111], 11));

console.log("test 2a", isFunctionThenInvoke(test2));
console.log("test 2b", isFunctionThenInvoke(test2, [222]));
console.log("test 2c", isFunctionThenInvoke(test2, null, 22));
console.log("test 2d", isFunctionThenInvoke(test2, [222], 22));
