const fs = require('fs');

const input = fs.readFileSync('./inputs/day4.txt').toString().split('\n\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().split('\n\n');

const rules = {
  byr: {
    characters: 4,
    min: 1920,
    max: 2002
  },
  iyr: {
    characters: 4,
    min: 2010,
    max: 2020
  },
  eyr: {
    characters: 4,
    min: 2020,
    max: 2030
  },
  hgt: {
    cm: {
      min: 150,
      max: 193
    },
    in: {
      min: 59,
      max: 76
    }
  },
  hcl: {
    initializer: '#',
    characters: 7,
    allowedChars: /^[0-9a-z]+$/
  },
  ecl: {
    options: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  },
  pid: {
    characters: 9,
    allowedChars: /^[0-9]+$/
  },
  cid: { optional: true }
};

function createPpObjects(input) {
  const newInput = input.map(passport => {
    const cleaned = passport.replace(/\n/g, ' ').trim().split(' ');
    const reduced = cleaned.reduce((obj, str, index) => {
      let strParts = str.split(':');
      if (strParts[0] && strParts[1]) {
        obj[strParts[0]] = strParts[1];
      }
      return obj
    }, {});
    return reduced;
  });
  return newInput
}

function checkValidityOfPp(input) {
  const passportsArray = createPpObjects(input);

  return passportsArray.map(validatePp).filter(Boolean).length;
}


function validatePp(passport) {
  let counter = 0;

  if (!passport) {

    return false
  }
  if (Object.entries(passport).length === 7 && !passport.cid || Object.entries(passport).length === 8) {
    const res = Object.entries(passport).map(entry => {
        if (entry[0] === 'byr') {
          if (entry[1].length === rules.byr.characters && entry[1] >= rules.byr.min && entry[1] <= rules.byr.max) {

            counter++;
            console.log("counter byr", counter)
          }
        }

        if (entry[0] === 'iyr') {
          if (entry[1].length === rules.iyr.characters && entry[1] >= rules.iyr.min && entry[1] <= rules.iyr.max) {

            counter++;
            console.log("counter iyr", counter)
          }
        }
        if (entry[0] === 'eyr') {
          if (entry[1].length === rules.eyr.characters && entry[1] >= rules.eyr.min && entry[1] <= rules.eyr.max) {

            counter++;
            console.log("counter eyr", counter)
          }
        }

        if (entry[0] === 'hgt') {

          if (entry[1].slice(entry[1].length - 2, entry[1].length) === rules.hgt.cm && Number(entry[1].slice(0, entry[1].length - 2)) >= rules.hgt.cm.min && Number(entry[1].slice(0, entry[1].length - 2)) <= rules.hgt.cm.max) {

            counter++;
            console.log("counter hgt cm", counter)
          } else if (entry[1].slice(entry[1].length - 2, entry[1].length) === rules.hgt.in && Number(entry[1].slice(0, entry[1].length - 2)) >= rules.hgt.in.min && Number(entry[1].slice(0, entry[1].length - 2)) <= rules.hgt.in.max) {

            counter++
            console.log("counter hgt in", counter)
          }
        }

        if (entry[0] === 'hcl') {
          if (entry[1].length === rules.hcl.characters && entry[1][0] === rules.hcl.initializer && entry[1].slice(1, entry[1].length).match(rules.hcl.allowedChars)) {
            counter++
            console.log("counter hcl", counter)
          }
        }

        if (entry[0] === 'ecl') {
          if (rules.ecl.options.find(col => col === entry[1])) {

            counter++
            console.log("counter ecl", counter)
          }
        }

        if (entry[0] === 'pid') {
          if (entry[1].slice(1, entry[1].length).match(rules.pid.allowedChars) && entry[1].length === rules.pid.characters) {
            counter++
            console.log("counter pid", counter)
          }
        }
        console.log("COUNTER", counter)

      }
    );
    console.log("RES", counter === 7)
    return counter === 7;
  }
}

console.log(checkValidityOfPp(testInput));

module.exports = {
  validatePp
};


// Object.entries(rules).map(([fieldName, rule]) => {
//   const passportField = passport[fieldName];
//   console.log("RULE", fieldName, rule, passportField, Object.keys(passport))
//   return (
//     (rule.optional || passportField) &&
//     (rule.characters === undefined || rule.characters === passportField.length) &&
//     (rule.min === undefined || rule.min <= Number(passportField)) &&
//     (rule.max === undefined || rule.max >= Number(passportField)) &&
//     (rule.cm && rule.in === undefined || (passportField && Object.keys(rule).find(unit => unit === passportField.slice(passportField.length - 2, passportField.length))))
//   );
// });


