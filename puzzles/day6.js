const fs = require('fs');

const input = fs.readFileSync('./inputs/day6.txt').toString().trim().split('\n\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n\n');
console.log("INPUT", testInput)

function findGroupAnswers(input) {
  const uniqueAnswers = input.map(group => {
    const cleaned = group.replace(/\n/g, ' ').trim().split(' ');
    const separated = cleaned.map(string => string.split('')).flat();
    // console.log("Separated", cleaned)
    return Array.from(new Set(separated));
  });
  return uniqueAnswers;
}

function yesAnswers(input) {
  const answers = findGroupAnswers(input);
  const groupYes = answers.map(group => group.length);

  return groupYes.reduce((acc, currVal) => acc + currVal, 0)
}

function newYesAnswers(input) {
  const allYesAnswers = [];

  const uniqueAnswers = input.map(group => {
    const cleaned = group.replace(/\n/g, ' ').trim().split(' ');
    const numberPersons = cleaned.length;
    const answerCount = {};
    const bla = cleaned.map(answer => {
      return answer.split('').forEach(answ => {
        answerCount[answ] = answerCount[answ] ? answerCount[answ] : 0;
        answerCount[answ] = answerCount[answ] + 1
      })
    });
    console.log("NUMBER PERSONS", numberPersons)
    if (numberPersons === 1) {
      allYesAnswers.push(Object.entries(answerCount).length)
    } else {
      const yesAnsw = Object.values(answerCount).filter(answer => answer === numberPersons)
      allYesAnswers.push(yesAnsw.length)
    }
  });
  return allYesAnswers.reduce((acc, currVal) => {
    return acc + currVal
  }, 0)
}

console.log(newYesAnswers(input))
