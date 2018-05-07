// adslot pre-bidding - Method destructuring
console.clear();

// this method does use object destructuring in the params
function createBid1({ type = "", keywords = "" } = {}) {
  console.log(`1 type: ${type},  keywords: ${keywords}`);
}
createBid1({ type: "foo1", keywords: "bar1" });
createBid1(); // won't trigger error - will ouput no values

// this method does not use object destructuring in the params
function createBid2({ type = "", keywords = "" }) {
  console.log(`2 type: ${type}, keywords: ${keywords}`);
}
createBid2({ type: "foo2", keywords: "bar2" });
createBid2(); // will trigger JS error in console - Uncaught TypeError: Cannot destructure property `type` of 'undefined' or 'null'.
