/**
 * Polyfill of the bind method
 * @param {*} context this object where the method is getting called
 * @param  {...any} args args of the find method
 * @returns a new function that can be called later
 */
function bindMethod(context, ...args) {
  // Preserve the original function by accessing this
  // As this is a function prototype so can be accessed by this
  const originalFn = this;
  return function (...nextArgs) {
    // Using call with args
    originalFn.call(context, ...args, ...nextArgs);
    // Using apply with args
    // originalFn.apply(context, [...args, ...nextArgs]);
  };
}

Function.prototype.bindMethod = bindMethod;

// Example usage
const obj = {
  first_name: "Iron",
  last_name: "Man",
};

function logMe(...params) {
  console.log("logging ", this.first_name, this.last_name, ...params);
}

const fn = logMe.bindMethod(obj);
fn("Hello", "World");

logMe.bindMethod(obj, "Namaste", "Duniya")();
