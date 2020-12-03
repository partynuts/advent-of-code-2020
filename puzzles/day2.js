const { deepEqual, equal } = require('assert');
const fs = require('fs');

const input = fs.readFileSync('./inputs/day2.txt').toString().trim().split('\n');

function createConditionsObject(input) {
  const obj = input.map(item => item.split('\n').reduce((obj, str, index) => {
    let strParts = str.split(':');
    if (strParts[0] && strParts[1]) {
      let conditions = strParts[0].split(' ');
      let appearances = conditions[0].split('-');
      obj.password = strParts[1].trim();
      obj.appearanceMin = appearances[0];
      obj.appearanceMax = appearances[1];
      obj.letter = conditions[1];
    }
    return obj;
  }, {})
  );

  return obj;
}

// console.log(createConditionsObject(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']));


function checkIfPasswordValid(data) {
  let counter = 0;

  const bla = data.map(item => {
    const pwArr = item.password.split('');
    if(pwArr.includes(item.letter)) {
      const foundLetter = pwArr.filter(letter => letter === item.letter).length;
      if(foundLetter >= item.appearanceMin && foundLetter <= item.appearanceMax) {
        counter++
      }
    }
  });

  return counter;
}

// console.log(checkIfPasswordValid(createConditionsObject(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'])));
console.log(checkIfPasswordValid(createConditionsObject(input)));

function checkAgainPWValidity(data) {
  let counter = 0;
  const bla = data.map(item => {
    const pwArr = item.password.split('');

    if(pwArr[item.appearanceMin - 1] === item.letter && pwArr[item.appearanceMax - 1] !== item.letter
      || pwArr[item.appearanceMin - 1] !== item.letter && pwArr[item.appearanceMax - 1] === item.letter ) {
      return counter++
    }

  });

  return counter;
}

// console.log(checkAgainPWValidity(createConditionsObject(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'])));
console.log(checkAgainPWValidity(createConditionsObject(input)));
