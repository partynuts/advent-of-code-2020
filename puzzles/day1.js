const { deepEqual } = require('assert');
const fs = require('fs');

const input = fs.readFileSync('./inputs/day1.txt').toString().trim().split('\n');

function get2020(input) {
  const inputArr = input.map(Number);

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr.length; j++) {
      if (inputArr[i] + inputArr[j] === 2020) {
        return [inputArr[i], inputArr[j]]
      }
    }
  }
}

// deepEqual(get2020(['1721', '979', '366', '299', '675', '1456']), [1721, 299]);
console.log('2 numbers', get2020(['1721', '979', '366', '299', '675', '1456']));
// console.log(get2020(input));

function multiplyNumbers(numbers) {
  const result = numbers.reduce((acc, currVal) => {
    return acc * currVal
  }, 1)
  return result;
}

// function multiplyNumbers(numbers) {
//   return numbers[0] * numbers[1] * numbers[2];
// }

// console.log(multiplyNumbers(get2020(['1721', '979', '366', '299', '675', '1456'])));
// console.log("2 multiplied numbers", multiplyNumbers(get2020(input)));


function get2020From3Numbers(input) {
  const inputArr = input.map(Number);

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (inputArr[i] + inputArr[j] + inputArr[k] === 2020) {
          const arr = [inputArr[i], inputArr[j], inputArr[k]];
          console.log("ARR", arr);
          return arr;
        }
      }
    }
  }
}

// console.log("3 numbers", get2020From3Numbers(['1721', '979', '366', '299', '675', '1456']));
// console.log("3 multiplied numbers", multiplyNumbers(get2020From3Numbers(['1721', '979', '366', '299', '675', '1456'])));
console.log("3 multiplied numbers", multiplyNumbers(get2020From3Numbers(input)));


