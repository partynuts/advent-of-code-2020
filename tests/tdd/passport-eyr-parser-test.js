// ecl:gry eyr:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm
const { expect } = require('chai');
const {dataParser} = require('../../puzzles/tdd/passportParserUtil')


describe('passportdataParser', () => {
  it('should return the eyr if only pid is given', () => {
    expect(dataParser.parseEyr('eyr:2020')).to.equal('2020')
    expect(dataParser.parseEyr('eyr:777')).to.equal('777')
    expect(dataParser.parseEyr('eyr:1')).to.equal('1')
  })

  it('should return empty string if another property is given', () => {
    expect(dataParser.parseEyr('ecl:gry')).to.equal('')
  })

  it('should only return pid if more than one property is given', () => {
    expect(dataParser.parseEyr('eyr:123456 ecl:gry')).to.equal('123456')
    expect(dataParser.parseEyr('hc:123456 eyr:gry')).to.equal('gry')
  })

  it('return empty string if no pid can be found', () => {
    expect(dataParser.parseEyr('pi:123456 ecl:gry')).to.equal('')
    expect(dataParser.parseEyr('p: ecl:gry')).to.equal('')
    expect(dataParser.parseEyr('p: :: : : ecl:gry')).to.equal('')
  })

  it('should return first found passport id', () => {
    expect(dataParser.parseEyr('eyr:123456 eyr:gry')).to.equal('123456')
  })
})
