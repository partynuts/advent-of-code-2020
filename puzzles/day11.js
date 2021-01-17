const fs = require('fs');

const input = fs.readFileSync('./inputs/day11.txt').toString().trim().split('\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n');

// console.log("INPUT", testInput)

function splitIntoSeats(input) {
  return input.map(row => row.split(''))
}

function countEmptySeats(seatArray, row, column) {
  let emptySeats = 0;

  if (isEmptySeat(seatArray, row - 1, column)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row - 1, column - 1)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row - 1, column + 1)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row + 1, column)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row + 1, column - 1)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row + 1, column + 1)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row, column + 1)) {
    emptySeats++
  }
  if (isEmptySeat(seatArray, row, column - 1)) {
    emptySeats++
  }
  return emptySeats;
}

function countOccupiedSeats(seatArray, row, column) {
  let occupiedSeats = 0;

  if (isOccupiedSeat(seatArray, row - 1, column)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row - 1, column - 1)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row - 1, column + 1)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row + 1, column)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row + 1, column - 1)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row + 1, column + 1)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row, column + 1)) {
    occupiedSeats++
  }
  if (isOccupiedSeat(seatArray, row, column - 1)) {
    occupiedSeats++
  }
  return occupiedSeats;
}

function isEmptySeat(arr, row, column) {
  if (!arr[row]) {
    return true
  }

  const value = arr[row][column];
  if (value === undefined || value === '.' || value === 'L') {
    return true;
  }
  return false
}

function isOccupiedSeat(arr, row, column) {
  if (!arr[row]) {
    return false
  }

  const value = arr[row][column];
  if (value === '#') {
    return true;
  }
  return false
}

function arrMatch(originalArr, newArr) {
  for (let i = 0; i < originalArr.length; i++) {
    for (let j = 0; j < originalArr[i].length; j++) {
      if (originalArr[i][j] !== newArr[i][j]) {
        return false
      }
    }
  }
  return true

  // Alternativ:
  // const orArrStrg = originalArr.map(row => row.join('')).join('');
  // const newArrStrg = originalArr.map(row => row.join('')).join('');
  //
  // return orArrStrg === newArrStrg;
}


function findEmptySeats(seatsArray) {
  const newArr = seatsArray.map(seatsPerRow => [...seatsPerRow]);

  for (let i = 0; i < seatsArray.length; i++) {
    for (let j = 0; j < seatsArray[i].length; j++) {
      if (seatsArray[i][j] === 'L') {
        const emptySeats = countEmptySeats(seatsArray, i, j);
        if (emptySeats === 8) {
          newArr[i][j] = '#'
        }
      }
      if (seatsArray[i][j] === '#') {
        const occupiedSeats = countOccupiedSeats(seatsArray, i, j);
        if (occupiedSeats >= 4) {
          newArr[i][j] = 'L'
        }
      }
    }
  }
  if (arrMatch(seatsArray, newArr)) {
    return newArr;
  }
  return findEmptySeats(newArr);
}

function countOcupiedSeats(seatsArray) {
  let occupied = 0;
  // console.log("EMPTY SEATS", findEmptySeats(seatsArray).map(row => row.join('')).join(''))
  findEmptySeats(seatsArray).map(row => row.map(seat => {
    if (seat === '#') {
      // console.log("SEAT", seat)
      occupied++
      // console.log("OCCUPIED", occupied)
    }
  }));
  return occupied
}


// console.log("SPLITTED", splitIntoSeats(testInput));
console.log("findEmptySeats", countOcupiedSeats(splitIntoSeats(input)));



