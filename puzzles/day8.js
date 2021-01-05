const fs = require('fs');

const input = fs.readFileSync('./inputs/day8.txt').toString().trim().split('\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n');

console.log("INPUT", testInput)

function getOperations(input) {
  return input.map(operation => {
    return operation.split(' ');
  });
}

function getAccumulator(input) {
  const program = getOperations(input)
  let accumulator = 0;
  let move;
  const cache = [];

  for (let i = 0; i < program.length; i = move) {
    const order = program[i][0];
    const value = Number(program[i][1]);
    if (cache.includes(i)) {
      return accumulator;
    }
    if (order === 'nop') {
      move = i+1
    }
    if (order === 'acc') {
      move = i+1;
      accumulator += value
    }
    if (order === 'jmp') {
      move += value;
    }
    cache.push(i);
  }
}

function checkForInfinityAndGetAcc(program) {
  let accumulator = 0;
  let move;
  const cache = [];

  for (let i = 0; i < program.length; i = move) {
    const order = program[i][0];
    const value = Number(program[i][1]);
    if (cache.includes(i)) {
      return;
    }
    if (order === 'nop') {
      move = i+1
    }
    if (order === 'acc') {
      move = i+1;
      accumulator += value

    }
    if (order === 'jmp') {
      move += value;

    }
    cache.push(i);
  }
  return accumulator;
}

function getCorrectAccumulator(input) {
  const program = getOperations(input);

  const res = program.map((operations, i) => {
    const newProgram = [...program];

      if (operations[0] === 'jmp') {
        newProgram[i] = ['nop', operations[1]]
      }
      else if (operations[0] === 'nop') {
        newProgram[i] = ['jmp', operations[1]]
      }

    return checkForInfinityAndGetAcc(newProgram)
    });
  return res.find(el => el !== undefined && el !== 0)
}

console.log("getOperations", getCorrectAccumulator(input))
