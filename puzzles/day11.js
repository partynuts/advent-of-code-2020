const fs = require('fs');

const input = fs.readFileSync('./inputs/day11.txt').toString().trim().split('\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n');

console.log("INPUT", testInput)

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

function getNumberOfOccupiedSeats(seatsArray) {
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

function countOccupiedSeatsInSight(seatArray, row, column) {
  let occupiedSeats = 0;

  for (let i = 0; i < seatArray.length; i++) {
    if (i !== row && !isEmptySeat(seatArray, i, column)) {
      occupiedSeats++
    }
  }

  for (let i = 0; i < seatArray.length; i++) {
    if (i !== column && !isEmptySeat(seatArray, row, i)) {
      occupiedSeats++
    }
  }

  let d = 1;
  // oben links
  while (seatArray[row - d] && seatArray[row - d][column - d]) {
    if (!isEmptySeat(seatArray, row - d, column - d)) {
      occupiedSeats++
    }
    d++;
  }

  d = 1

  //oben rechts: zeile kleiner spalte größer
  while (seatArray[row - d] && seatArray[row - d][column + d]) {
    if (!isEmptySeat(seatArray, row - d, column + d)) {
      occupiedSeats++
    }
    d++;
  }

  d = 1

  //unten rechts: zeile größer spalte größer
  while (seatArray[row + d] && seatArray[row + d][column + d]) {
    if (!isEmptySeat(seatArray, row + d, column + d)) {
      occupiedSeats++
    }
    d++;
  }

  d = 1

  //unten links: zeile größer spalte kleiner
  while (seatArray[row + d] && seatArray[row + d][column - d]) {
    if (!isEmptySeat(seatArray, row + d, column - d)) {
      occupiedSeats++
    }
    d++;
  }

  return occupiedSeats;
}

function isReallyEmptySeat(arr, row, column) {
  const value = arr[row][column];
  if (value === 'L') {
    return true;
  }
  return false
}

function checkFirstSeatInSight(seatArray, row, column) {
  let emptySeat = 0;
  let occupiedSeat = 0;

  // Reihe davor
  for (let i = row - 1; i >= 0; i--) {
    if (seatArray[i] && seatArray[i][column] === '#') {
      occupiedSeat++;
      break;
    } else if (seatArray[i] && seatArray[i][column] === 'L') {
      emptySeat++;
      break;
    }
  }

  // Reihe danach
  for (let i = row + 1; i < seatArray.length; i++) {
    if (seatArray[i] && seatArray[i][column] === '#') {
      occupiedSeat++;
      break;
    } else if (seatArray[i] && seatArray[i][column] === 'L') {
      emptySeat++;
      break;
    }
  }

  // Spalte danach
  for (let i = column + 1; i < seatArray[row].length; i++) {
    if (seatArray[row][i] && seatArray[row][i] === '#') {
      occupiedSeat++
      break;
    } else if (seatArray[row][i] && seatArray[row][i] === 'L') {
      emptySeat++
      break;
    }
  }

  // Spalte davor
  for (let i = column - 1; i >= 0; i--) {
    if (seatArray[row] && seatArray[row][i] && seatArray[row][i] === '#') {
      occupiedSeat++
      break;
    } else if (seatArray[row] && seatArray[row][i] && seatArray[row][i] === 'L') {
      emptySeat++
      break;
    }
  }

  // Diagonal rechts unten
  for (let i = 1; i < Math.min(seatArray.length - row, seatArray[row].length - column); i++) {
    if (seatArray[row + i][column + i] === '#') {
      occupiedSeat++;
      break;
    } else if (seatArray[row + i][column + i] === 'L') {
      emptySeat++;
      break;
    }
  }

  // Diagonal links unten
  for (let i = 1; i < Math.min(seatArray.length - row, column + 1); i++) {
    if (seatArray[row + i][column - i] === '#') {
      occupiedSeat++
      break;
    } else if (seatArray[row + i][column - i] === 'L') {
      emptySeat++
      break;
    }
  }

  // Diagonal links oben
  for (let i = 1; i < Math.min(row + 1, column+1); i++) {
    if (seatArray[row - i][column - i] === '#') {
      occupiedSeat++;
      break;
    } else if (seatArray[row - i][column - i] === 'L') {
      emptySeat++;
      break;
    }
  }

  // Diagonal recht oben
  for (let i = 1; i < Math.min(row + 1, seatArray[row].length - column); i++) {
    if (seatArray[row - i][column + i] === '#') {
      occupiedSeat++;
      break;
    } else if (seatArray[row - i][column + i] === 'L') {
      emptySeat++;
      break;
    }
  }

  return { emptySeat, occupiedSeat }
}

let counter = 1;

function findNewEmptySeats(seatsArray) {
  const newArr = seatsArray.map(seatsPerRow => [...seatsPerRow]);
  for (let i = 0; i < seatsArray.length; i++) {
    for (let j = 0; j < seatsArray[i].length; j++) {
      const seatSituation = checkFirstSeatInSight(seatsArray, i, j);
      if (seatsArray[i][j] === 'L' && seatSituation.occupiedSeat === 0) {
        newArr[i][j] = '#'
      }
      if (seatsArray[i][j] === '#' && seatSituation.occupiedSeat >= 5) {
        newArr[i][j] = 'L'
      }
    }
  }
  // console.log("NEW ARR", newArr);
  console.log(`PROBLEM SITZ ${counter}`, seatsArray[1][9])

  if (arrMatch(seatsArray, newArr)) {
    return newArr;
  }
  counter++;
  return findNewEmptySeats(newArr);
}

function getNumberOfNewlyOccupiedSeats(seatsArray) {
  let occupied = 0;
  // console.log("EMPTY SEATS", findEmptySeats(seatsArray).map(row => row.join('')).join(''))
  findNewEmptySeats(seatsArray).forEach(row => row.forEach(seat => {
    if (seat === '#') {
      // console.log("SEAT", seat)
      occupied++
      // console.log("OCCUPIED", occupied)
    }
  }));
  return occupied
}


// console.log("SPLITTED", splitIntoSeats(testInput));
// console.log("findEmptySeats", getNumberOfOccupiedSeats(splitIntoSeats(input)));
console.log("findNewEmptySeats", getNumberOfNewlyOccupiedSeats(splitIntoSeats(input)));

// Teil 2 => der erste Sitz im Blickfeld ist ausschlaggeben! Nicht die geamte Reihe bis zum Ende und nicht nur die direkt angrenzenden "Plätze"
// # => L wenn 5 oder mehr Sitze im Blickfeld belegt sind
// L => # wenn keine belegten Plätze im Blickfeld

