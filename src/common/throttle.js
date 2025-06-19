/**
 * throttle function with a delay
 * @param {*} callbackFn function to be throttled
 * @param {*} interval throttling delay
 * @returns a new function with args params
 */
export function throttle(callbackFn, interval = 500) {
  let lastTime = 0;

  return function (...args) {
    // Preserve the "this" value of the callback lexical scope
    const self = this;
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      callbackFn.apply(self, args);
    }
  };
}

// Example usage
function logMe(...params) {
  console.log("logging ", params);
}

const throttledFn = throttle(logMe, 10);

for (let i = 0; i < 100000; i++) {
  throttledFn("throttled", i);
  throttledFn("throttled", i);
  throttledFn("throttled", i);
}
