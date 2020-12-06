const fs = require('fs');

const input = fs.readFileSync('./inputs/day3.txt').toString().trim().split('\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n');
console.log(testInput);

function countingTrees(input) {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 }];

  let treeArr = [];
  slopes.map(slope => {
    const res = loopThroughSlope(input, slope);
    console.log("RES", res)
    return treeArr.push(res);
  });

  console.log("TREES", treeArr)
  return treeArr.reduce((acc, currVal) => {
    return acc * currVal
  }, 1);
}

function loopThroughSlope(input, slope) {
  let numberOfTrees = 0;
  let x = 0;

  for (let i = slope.down; i < +input.length; i = i + slope.down) {
    x = x + slope.right;
    let rest = x % input[i].length;

    if (input[i].charAt(rest) === '#') {
      numberOfTrees++;
    }
  }
  return numberOfTrees;
}

console.log(countingTrees(input));
