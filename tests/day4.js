const { expect } = require('chai');
const { validatePp } = require("../puzzles/day4");

describe('day4', () => {
  describe('validatePp', () => {
    it('should return false on no passport', () => {
      expect(validatePp()).to.be.false;
    });
    it('should return false on empty passport', () => {
      expect(validatePp({})).to.be.false;
    });
    it('should return true if all 8 properties are given', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1937',
        iyr: '2017',
        cid: '147',
        hgt: '183cm'
      };

      expect(validatePp(passport)).to.be.true;
    });
    it('should return true if the only property missing is cid', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1937',
        iyr: '2017',
        hgt: '183cm'
      };

      expect(validatePp(passport)).to.be.true;
    });
    it('should return false if the one or more props other than cid are missing', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1937',
        iyr: '2017',
      };

      const passport2 = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1937',
        iyr: '2017',
        cid: '147'
      };
      expect(validatePp(passport)).to.be.false;
      expect(validatePp(passport2)).to.be.false;
    });
    it('should return true if the requirements are met', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1937',
        iyr: '2017',
        hgt: '183cm'
      };

      expect(validatePp(passport)).to.be.true;
    });
    it('should return false if the number of digits is not met', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '190',
        iyr: '2017',
        hgt: '183cm'
      };

      expect(validatePp(passport)).to.be.false;
    });
    it('should return false if the min year is falling below', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1925',
        iyr: '1900',
        hgt: '183cm'
      };

      expect(validatePp(passport)).to.be.false;
    });
    it('should return false if the max year is exceeded', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '6020',
        hcl: '#fffffd',
        byr: '1925',
        iyr: '2010',
        hgt: '183cm'
      };

      expect(validatePp(passport)).to.be.false;
    });
    it('should return false if the unit of measurement for height is different from cm or in', () => {
      const passport = {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1925',
        iyr: '2010',
        hgt: '183kg'
      };

      expect(validatePp(passport)).to.be.false;
    });
  })
});
