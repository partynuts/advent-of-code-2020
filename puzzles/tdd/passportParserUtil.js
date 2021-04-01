const dataParser = {

  parsePid: function (data) {
    return this.parse(data, 'pid')
  },

  parseEyr: function (data) {
    return this.parse(data, 'eyr')
  },


  parse:  (data, key) => {
    const dataEntries = data.split(' ');
    const dataEntry = dataEntries.find(entry => entry.includes(key));

    if (dataEntry === undefined) {
      return ''
    }

    return dataEntry.split(':')[1]
  }

}


module.exports = {
  dataParser
}
