const fs = require('fs');

const input = fs.readFileSync('./inputs/day10.txt').toString().trim();
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim();

// console.log("INPUT", testInput)
function parseInput(input) {
  return input.split('\n').map(Number)
}

function sortInput(input) {
  const parsed = parseInput(input);
  return parsed.sort((a, b) => a - b)
}

function getDifferences(input) {
  const sorted = sortInput(input);
  console.log("SORTED", sorted)
  console.log("SORTED", sorted.length)

  let oneJoltDiff = 0;
  let twoJoltDiff = 0;
  let threeJoltDiff = 0;
  sorted.map((number, i, sorted) => {
    if (number === sorted[0] && sorted[0] === 1) {
      oneJoltDiff++
    }
    if (number === sorted[0] && sorted[0] === 2) {
      twoJoltDiff++
    }
    if (number === sorted[0] && sorted[0] === 3) {
      threeJoltDiff++
    }
    if (number + 1 === sorted[i + 1]) {
      oneJoltDiff++
    }
    if (number + 2 === sorted[i + 1]) {
      twoJoltDiff++
    }
    if (number + 3 === sorted[i + 1] || sorted[i + 1] === undefined) {
      threeJoltDiff++
    }
  });

  return { oneJoltDiff, twoJoltDiff, threeJoltDiff }
}

function calculateResult(input) {
  const differences = getDifferences(input);
  console.log("DIFF COUNT", differences.oneJoltDiff + differences.twoJoltDiff + differences.threeJoltDiff)

  return differences.oneJoltDiff * differences.threeJoltDiff
}


// console.log("PARSE INPUT", parseInput(testInput))

console.log("calculateResult", calculateResult(input))
