// Safely Accessing Deeply Nested Values in JS
console.clear();

const get = (p, o) =>
  p.reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, o);

const props = {
  user: {
    posts: [
      { title: "Foo", comments: ["Good one!", "Interesting..."] },
      { title: "Bar", comments: ["Ok"] },
      { title: "Baz", comments: [] },
    ]
  }
};

console.log("1: ", get(["user", "posts", 0, "comments"], props));
console.log("2: ", get(["user", "posts", 1, "comments"], props));
console.log("3: ", get(["user", "wrong", 0, "comments"], props));
console.log("4: ", get(["user", "posts", 2, "title"], props));
