const fs = require('fs');

const input = fs.readFileSync('./inputs/day5.txt').toString().trim().split('\n');
// const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n');
console.log("INPUT", input)

function getRowStrings(seatData) {
  return seatData.map(seatString => seatString.slice(0, 7));
}

function moveRows(location) {

}

function getRow(seatData) {
  const rowData = getRowStrings(seatData);
  rowData.map(string => {
    const charsArr = string.split('');
    const lastRow = 127;
    const lastCol = 8;
    let rowLocationMax = lastRow;
    let round = 0;
    let rows = new Array(rowLocationMax);
    for (let i = 0; i < charsArr.length; i++) {
      round++;
      console.log("ROUND", round)
      for (let k = 0; k < rowLocationMax; k++) {
        rows[k] = k;
      }

      if (charsArr[i] === "F") {
        console.log("CHARS ARR F", charsArr[i] === "F")
        // console.log("ROWS LENGTH", rows.length);
        console.log("ROWS", rows[(rows.length + 1) / 2]);

        rowLocationMax = rows[(rows.length + 1) / 2]
        // console.log("IM F FALL", rows[rows.length/2])
        console.log("ROW LOCATION", rowLocationMax)

      } else if (charsArr[i] === "B") {
        console.log("CHARS ARR B", charsArr[i] === "B")

        rowLocationMax = rows[rows.length];
        // console.log("IM B FALL", rows[rows.length])

        console.log("ROW LOCATION", rowLocationMax)
      }
    }
    return rowLocationMax;
  })
}

console.log(getRow(input));
