const fs = require('fs');

const input = fs.readFileSync('./inputs/day7.txt').toString().trim().split('\n\n');
const testInput = fs.readFileSync('./inputs/test-input.txt').toString().trim().split('\n\n');

// console.log("INPUT", testInput)

function getDirectGold(input, colour = 'shiny gold') {
  const cleaned = input.map(rule => rule.replace(/\n/g, '').trim().split('.')).flat()
  console.log("CLEANED", cleaned)

    const containsDirectlyGold = cleaned.filter(rule => rule.includes(colour) && !rule.startsWith(colour));
    const directGoldBags = containsDirectlyGold.map(d => d.split(' ').splice(0, 2).join(' '));
    console.log("DIRECT GOLD BAGS", directGoldBags);
    const res = directGoldBags.flatMap(color => Array.from(getDirectGold(input, color)));
    return new Set([...directGoldBags, ...res]);
}

function getNumberOfBags(input, colour = 'shiny gold') {
  const bagAmounts = {}
  const cleaned = input.map(rule => rule.replace(/\n/g, '').trim().split('.')).flat()
  const containsDirectlyGold = cleaned.find(rule => rule.startsWith(colour));
  const directlyWithinGold = containsDirectlyGold.split('contain').pop().split(',').map(el => el.trim())
  console.log("CONTAINS DIRECT", containsDirectlyGold, "BLUBB ", directlyWithinGold)
  directlyWithinGold.map(bag => {
    const bagsSplit = bag.split(' ')
    const bagsCount = bagsSplit[0]
    const bagsCol = bagsSplit.splice(1, bagsSplit.length).join(' ')
    bagAmounts[bagsCol] = bagsCount
    console.log("BAG Amount", bagAmounts)

    const withinOthers = cleaned.filter(rule => Object.keys(bagAmounts).some(col => rule.startsWith(col)))
    const secondLevelBags = withinOthers.map(bags => bags.split('contain').pop().split(',').map(el => el.trim())).flat()
    console.log("secondLevelBags", secondLevelBags)

    secondLevelBags.map(bag => {
      const bagsSplit = bag.split(' ')
      const bagsCount = bagsSplit[0]
      const bagsCol = bagsSplit.splice(1, bagsSplit.length).join(' ')
      bagAmounts[bagsCol] = bagsCount
      console.log("BAG Amount 2", bagAmounts)
    })
  })
  // const directGoldBags = containsDirectlyGold.map(d => d.split(' ').splice(0, 2).join(' '));
  // console.log("DIRECT GOLD BAGS", directGoldBags);
  // const res = directGoldBags.flatMap(color => Array.from(getDirectGold(input, color)));
  // return new Set([...directGoldBags, ...res]);
}


// console.log("OUTPUT", getDirectGold(testInput).size)
console.log("OUTPUT", getNumberOfBags(testInput))

