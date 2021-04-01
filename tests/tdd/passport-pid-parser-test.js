// ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm
const { expect } = require('chai');
const {dataParser} = require('../../puzzles/tdd/passportParserUtil')

describe('passportdataParser ', () => {
  it('should return the passport id if only pid is given', () => {
    expect(dataParser.parsePid('pid:860033327')).to.equal('860033327')
    expect(dataParser.parsePid('pid:777')).to.equal('777')
    expect(dataParser.parsePid('pid:1')).to.equal('1')
  })

  it('should return empty string if another property is given', () => {
    expect(dataParser.parsePid('ecl:gry')).to.equal('')
  })

  it('should only return pid if more than one property is given', () => {
    expect(dataParser.parsePid('pid:123456 ecl:gry')).to.equal('123456')
    expect(dataParser.parsePid('hc:123456 pid:gry')).to.equal('gry')
  })

  it('return empty string if no pid can be found', () => {
    expect(dataParser.parsePid('pi:123456 ecl:gry')).to.equal('')
    expect(dataParser.parsePid('p: ecl:gry')).to.equal('')
    expect(dataParser.parsePid('p: :: : : ecl:gry')).to.equal('')
  })

  it('should return first found passport id', () => {
    expect(dataParser.parsePid('pid:123456 pid:gry')).to.equal('123456')
  })
})


