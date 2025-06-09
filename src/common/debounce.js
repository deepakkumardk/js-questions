/**
 * debounce function with a delay
 * @param {*} callbackFn function to be debounced
 * @param {*} delay debouncing delay
 * @returns a new function with args params
 */
export function debounce(callbackFn, delay = 500) {
  let timeoutId;

  return function (...args) {
    // Preserve this value of the callback lexical scope
    const self = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      callbackFn.apply(self, args);
    }, delay);
  };
}

// Example usage
function logMe(params) {
  console.log("logging ", params);
}
const debouncedFn = debounce(logMe, 1000);

debouncedFn("Hello World");
debouncedFn("Hello World");
debouncedFn("Hello World");
