const fs = require('fs');

const input = fs.readFileSync('./inputs/day9.txt').toString().trim();
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim();

// console.log("INPUT", testInput)

function parseInput(input) {
  return input.split('\n').map(Number)
}

function getWrongNumber(input) {
  const data = parseInput(input);
  let res = [];
  for (let i = 25; i < data.length; i++) {
    let arr = new Set();
    for (let j = i - 25; j < i; j++) {
      for (let k = i - 25; k < i; k++) {
        if (k !== j) {

          arr.add(data[j] + data[k])
        }
      }
    }
    const sumOfTwo = Array.from(arr).find(number => number === data[i]);
    if (!sumOfTwo) {
      res.push(data[i])
    }
  }
  return res[0]
}

function createArrayOfNumbers(data, stop) {
  let arr = [];
  data.map((number, index) => {
    if (stop < index) {
      return
    }
    arr.push(number);
  });
  return arr;
}

function getArrayOfAllPossibleCombinations(input) {
  const data = parseInput(input);
  const wrongNumber = getWrongNumber(input);
  const stop = data.indexOf(wrongNumber);


  return data.map((el, index) => {
    let arrayOfArrays = [];
    let arr = [];
    for (let i = index; i < stop; i++) {
      arrayOfArrays.push([...arr, data[i]]);
      arr.push(data[i]);
      // console.log("ARRAY", arr)
      // console.log("Expanded ARRAY", arr)
      // console.log("ARRAY Of Arrays", expandedArr)
    }
    return arrayOfArrays;
  })
}

function getArrayOfAllPossibleCombinationsEnd(input) {
  const data = parseInput(input);
  const wrongNumber = getWrongNumber(input);
  const stop = data.indexOf(wrongNumber);


  return data.map((el, index) => {
    let arrayOfArrays = [];
    let arr = [];
    for (let i = stop + 1; i < data.length; i++) {
      arrayOfArrays.push([...arr, data[i]]);
      arr.push(data[i]);
    }
    return arrayOfArrays;
  })
}

function getNumberRow(input) {
  const wrongNumber = getWrongNumber(input);
  const combinations1 = getArrayOfAllPossibleCombinations(input);
  const combinations2 = getArrayOfAllPossibleCombinationsEnd(input);
  const combinations = [...combinations1, ...combinations2]
  const combiObj = {};

  const resultsArr = combinations.flat().map(combination => {
    // console.log("COMBINATION", combination)
    const reduced = combination.reduce((acc, curVal) => {
        const sum = acc + curVal;
        // console.log("SUM", sum)

        return sum
      }, 0);

    // console.log("REDUCED", reduced)
    combiObj[reduced] = combination;

    }
  );

  return Object.entries(combiObj).find(entry => Number(entry[0]) === wrongNumber)[1];
}

function getSumOfSmallestAndLargest(input) {
  const row = getNumberRow(input);
  console.log("ROW", row)
  // const maxNum = Math.max(row);
  // const minNum = Math.min(row);
  // return maxNum + minNum;
  const sorted = row.sort((a,b) => a - b);

  return sorted[0] +  sorted[sorted.length-1]
}

console.log("getSumOfSmallestAndLargest", getSumOfSmallestAndLargest(input))
// console.log("PARSE INPUT", parseInput(testInput))
