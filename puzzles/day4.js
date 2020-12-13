const fs = require('fs');

const input = fs.readFileSync('./inputs/day4.txt').toString().split('\n\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().split('\n\n');

const rules = {
  byr: {
    digits: 4,
    min: 1920,
    max: 2002
  },
  iyr: {
    digits: 4,
    min: 2010,
    max: 2020
  },
  eyr: {
    digits: 4,
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

  },
  ecl: {},
  pid: {},
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
  // console.log("PP ARR", passportsArray)

  return passportsArray.map(validatePp).filter(Boolean).length;
}


function validatePp(passport) {
  if (!passport) {
    return false
  }
// console.log("OBJ ENT", Object.entries(rules))
  return Object.entries(rules).map(([fieldName, rule]) => {
    const passportField = passport[fieldName];
console.log("RULE", fieldName, rule)

    return (
      (rule.optional || passportField) &&
      (rule.digits === undefined || rule.digits === passportField.length) &&
      (rule.min === undefined || rule.min <= Number(passportField)) &&
      (rule.max === undefined || rule.max >= Number(passportField)) &&
      (rule.cm && rule.in === undefined || (passportField && Object.keys(rule).find(unit => unit === passportField.slice(passportField.length - 2, passportField.length))))
    );
  });
}

console.log(checkValidityOfPp(testInput));

module.exports = {
  validatePp
};
