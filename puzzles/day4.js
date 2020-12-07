const fs = require('fs');

const input = fs.readFileSync('./inputs/day4.txt').toString().split('\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().split('\n').join(', ').split(', , ');

// console.log(testInput.map(i => i.split(' ')))

function createPpObjects(input) {
  const newInput = input.map(i => i.trim().split(' '));
  const splitArr = newInput.map(item => item.map(arr => arr.split(",").join("")));
  const flattenedArr = splitArr.map(item => item.flat());
  const obj = flattenedArr.map(item => item.reduce((obj, str, index) => {
      let strParts = str.split(':');

      if (strParts[0] && strParts[1]) {
        obj[strParts[0]] = strParts[1];
      }
      return obj
    }, {})
  );

  return obj;
}

function checkValidityOfPp(input) {
  const passportsArray = createPpObjects(input);
  let counter = 0;
  passportsArray.map(passport => {
    if (Object.entries(passport).length === 8) {
      counter++
    } else if (Object.entries(passport).length === 7 && !Object.keys(passport).includes('cid')) {
      counter++
    } else {
      return;
    }
  });

  return counter;
}

console.log(checkValidityOfPp(input));
