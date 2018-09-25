console.clear(); // optional

function ifCond(a, operator, b) {
  if (arguments.length < 3) {
    throw new Error("handlebars Helper {{ifCond}} expects 4 arguments");
  }
  let result;
  switch (operator) {
    case "==": result = a == b; break;
    case "===": result = a === b; break;
    case "!=": result = a != b; break;
    case "!==": result = a !== b; break;
    case "<": result = a < b; break;
    case ">": result = a > b; break;
    case "<=": result = a <= b; break;
    case ">=": result = a >= b; break;
    case "&&": result = a && b; break;
    case "||": result = a || b; break;
    case "typeof": result = typeof a === b; break;
    default: {
      throw new Error("helper {{ifCond}}: invalid operator: `" + operator + "`");
    }
  }
  return result;
}

console.log("OR 1", ifCond(true, "||", true));
console.log("OR 2", ifCond(false, "||", false));
console.log("OR 3", ifCond(true, "||", false));
console.log("OR 4", ifCond(false, "||", true));

console.log("AND 1", ifCond(true, "&&", true));
console.log("AND 2", ifCond(false, "&&", false));
console.log("AND 3", ifCond(true, "&&", false));
console.log("AND 4", ifCond(false, "&&", true));
