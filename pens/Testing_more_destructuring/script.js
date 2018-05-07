// Testing more destructuring
console.clear();

// Works due to trying to destructure undefined
let ajax1 = ({ url: url = "localhost", port: p = 80 } = {}) => {
  console.log("ajax1", "Url:", url, "Port:", p);
};

ajax1(); // No error

// To fix this we need to have default value for parameter in function
// Note: See the `= {}` at the end, saying default empty object if the first argument is undefined.
let ajax2 = ({ url: url = "localhost", port: p = 80 } = {}) => {
  console.log("ajax2", "Url:", url, "Port:", p);
};

// Now this works.
ajax2();
// => Url: localhost Port: 80

ajax2({ });
// => Url: localhost Port: 80

ajax2({ port: 8080 });
//  => Url: localhost Port: 8080

ajax2({ url: "someHost", port: 8080 });
//  => Url: someHost Port: 8080
