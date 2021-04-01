const { expect } = require('chai');
const { dataParser } = require('../../puzzles/tdd/passportParserUtil')

const passport = {
  byr: undefined,
  cid: undefined,
  ecl: undefined,
  eyr: undefined,
  hcl: undefined,
  hgt: undefined,
  iyr: undefined,
  pid: undefined
};

describe('passportParser', () => {

  it('formats passport data correctly', () => {
    expect(transform('  ')).to.equal('')
    expect(transform(' hcl:23423 foo:bar  ')).to.equal('hcl:23423 foo:bar')
    expect(transform('hcl:23423\nfoo:bar')).to.equal('hcl:23423 foo:bar')
    expect(transform('hcl:#ae17e1 iyr:2013\n' +
      'eyr:2024\n' +
      'ecl:brn pid:760753108 byr:1931\n' +
      'hgt:179cm'))
      .to.equal('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm')
  })

  it('given data creates expected passport', () => {
    const samplePassport = {
      ecl: 'gry', pid: '860033327', eyr: '2020', hcl: '#fffffd',
      byr: '1937', iyr: '2017', cid: '147', hgt: '183cm'
    };

    expect(parsePassport(transform('ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
      'byr:1937 iyr:2017 cid:147 hgt:183cm'))).to.deep.include(samplePassport)
  })
});

function parsePassport(transformedData) {
  const newPassport = {};

  Object.keys(passport).forEach(key => newPassport[key] = dataParser.parse(transformedData, key));
  return newPassport
}

function transform(text) {
  const transformedText = text.trim().replace(/\n/g, ' ');
  return transformedText
}
