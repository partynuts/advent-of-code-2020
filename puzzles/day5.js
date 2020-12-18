const fs = require('fs');

const input = fs.readFileSync('./inputs/day5.txt').toString().trim().split('\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n');
// console.log("INPUT", testInput)

function getRowStrings(seatData) {
  return seatData.map(seatString => seatString.slice(0, 7));
}

function getColStrings(seatData) {
  return seatData.map(seatString => seatString.slice(7, 10));
}

const rowsWithCols = new Object({})

function getRow(rowData) {
    const charsArr = rowData.split('');
    const lastRow = 127;
    let firstRow = 0;
    let rowLocationMax = lastRow;
    let round = 0;

    for (let i = 0; i < charsArr.length; i++) {
      round++;
      // console.log("ROUND", round)
      let rows = [];

      for (let k = firstRow; k <= rowLocationMax; k++) {
        rows.push(k);
      }
      // console.log("ROWS", rows)
      if (charsArr[i] === "F") {
        // console.log("CHARS ARR F", charsArr[i] === "F")
        // console.log("ROWS LENGTH", rows.length);
        // console.log("ROWS LENGTH", rows[Math.floor((rows.length) / 2)]);

        rowLocationMax = rows[Math.floor(rows.length / 2) - 1]
        firstRow = rows[0];
        //
        // console.log("FIRST ROW F", firstRow)
        // console.log("LAST ROW F", rowLocationMax)

        // console.log("IM F FALL", rows[rows.length/2])
        // console.log("ROW LOCATION", rowLocationMax)

      } else if (charsArr[i] === "B") {
        // console.log("CHARS ARR B", charsArr[i] === "B")

        rowLocationMax = rows[rows.length-1];
        firstRow = rows[Math.ceil((rows.length) / 2)]
        // console.log("CEIL", rows[Math.ceil((rows.length) / 2)])
        // console.log("FIRST ROW B", firstRow)
        // console.log("LAST ROW B", rowLocationMax)

        // console.log("IM B FALL", rows[rows.length])
        // console.log("ROW LOCATION", rowLocationMax)
      }
    }
    console.log("ROWLOWMAX >>>", rowLocationMax)
    return rowsWithCols.row = rowLocationMax;
}

function getCol(colData) {
    const charsArr = colData.split('');
    const lastCol = 7;
    let firstCol = 0;
    let colMax = lastCol;
    let round = 0;

    for (let i = 0; i < charsArr.length; i++) {
      round++;
      let cols = [];

      for (let k = firstCol; k <= colMax; k++) {
        cols.push(k);
      }
      if (charsArr[i] === "L") {
        colMax = cols[Math.floor(cols.length / 2) -1];
        firstCol = cols[0];
      } else if (charsArr[i] === "R") {
        colMax = cols[cols.length-1];
        firstCol = cols[Math.floor(cols.length / 2)];
      }
    }
    console.log("ColLowMax >>>", colMax)
    return colMax;
}

function bla(input) {
  const rowArr = getRowStrings(input)
  const colsArr = getColStrings(input)
  const rows = rowArr.map(rowData => getRow(rowData));
  const cols = colsArr.map(colData => getCol(colData))
  console.log("Rows ", rows);
  console.log("Cols ", cols);
  const seatNumbers = [];

  for (let i=0; i<rows.length; i++) {
    seatNumbers.push(rows[i] * 8 + cols[i])
  }

  const sortedSeats = seatNumbers.sort(function(a, b) {
    return a - b;
  });
  findMySeats(sortedSeats);
  console.log("SORTED SEATS", sortedSeats)
  return Math.max(...seatNumbers)
}

function findMySeats(sortedSeats) {
  for(let i = 1; i < sortedSeats.length; i++) {
    if(sortedSeats[i] - sortedSeats[i-1] != 1) {
      console.log("BLUBB", sortedSeats[i-1] + 1)
      return sortedSeats[i-1] + 1;
    }
  }
}

console.log(bla(input));
