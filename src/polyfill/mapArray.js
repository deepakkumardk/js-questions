/**
 * Normal implementation
 * @param {*} callbackFn callback function with item,index,array args
 * @param {*} thisArg bind a specific object to the this function
 * @returns a new array
 */
function mapArray(callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + "is not a function");
  }

  const array = this;
  const resArr = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    // Check if the data exists at the index i
    if (array.hasOwnProperty(i)) {
      const res = callbackFn.call(thisArg, item, i, array);
      resArr.push(res);
    }
  }

  return resArr;
}

Array.prototype.mapArray = mapArray;

/**
 * ------Advance implementation------
 * @param {*} callbackFn callback function with item,index,array args
 * @param {*} thisArg bind a specific object to the this function
 * @returns a new array
 */
function mapArrayAdvance(callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + "is not a function");
  }

  const array = Object(this);
  const len = array.length;
  // Convert to a 32-bit unsigned integer (another advance handling)
  // const len = array.length >>>0

  // Initialize the resulting array as the original length of the array
  const resArr = Array(len);
  let i = 0;

  // use while loop instead of the for loop
  while (i < len) {
    const item = array[i];
    if (array.hasOwnProperty(i)) {
      const res = callbackFn.call(thisArg, item, i, array);
      //   index based assignment instead of push
      resArr[i] = res;
    }
    i++;
  }

  return resArr;
}

Array.prototype.mapArrayAdvance = mapArrayAdvance;

// Example usage
const arr1 = [1, 2, 3, 4];
const arr2 = new Array(5);
const arr3 = [1, , , , 2, , , 3, , , 4];
const arr4 = { length: 2, 0: 1, 1: 2, 2: 3 };

const square = function (value, i) {
  return value * 2;
};

const outputMap1 = arr1.map(square);
const outputMap2 = arr2.map(square);
const outputMap3 = arr3.map(square);
const outputMap4 = Array.prototype.map.call(arr4, square);
console.log("Original map output");
console.log(outputMap1, outputMap2, outputMap3, outputMap4);

const output1 = arr1.mapArray(square);
const output2 = arr2.mapArray(square);
const output3 = arr3.mapArray(square);
const output4 = Array.prototype.mapArray.call(arr4, square);
console.log("mapArray output");
console.log(output1, output2, output3, output4);

const outputAdvance1 = arr1.mapArrayAdvance(square);
const outputAdvance2 = arr2.mapArrayAdvance(square);
const outputAdvance3 = arr3.mapArrayAdvance(square);
const outputAdvance4 = Array.prototype.mapArrayAdvance.call(arr4, square);
console.log("mapArrayAdvance output");
console.log(outputAdvance1, outputAdvance2, outputAdvance3, outputAdvance4);

const logArray = [2, 4];
const outputLogArray = logArray.mapArray(
  (value, i, arr) => {
    i == 0 && console.log("\nlogArray", arr);
    return value * i;
  },
  { name: "Hello" }
);
console.log("Access all args on callbackFn");
console.log(outputLogArray);
