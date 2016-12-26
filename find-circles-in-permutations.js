console.info('loaded permutations "module"')
function shuffle(origArray) {
  var array = origArray.slice(0)
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createArrayWithNumbers(length) {
  const numbers = []
  for (let i = 1; i <= length; i++) {
    numbers[i - 1] = i
  }

  return numbers
}

function findCircleInner(arr, containsNumber, firstNumber) {
  const currNumber = arr[containsNumber - 1]

  //detecting a cycle
  if (currNumber === firstNumber) {
    return []
  }

  return [containsNumber].concat(findCircleInner(arr, currNumber, firstNumber))
}

function findCircle(arr, containsNumber) {
  const firstNumber = arr[containsNumber - 1]

  return [containsNumber].concat(findCircleInner(arr, firstNumber, firstNumber))
}

function findCirclesInRandomArray(array) {
  const numbers = array
  let circles = []
  let lookup = {}

  for (let i = 0; i < numbers.length; i++) {
    var currNumber = numbers[i]

    if (!lookup[currNumber]) {
      const circle = findCircle(numbers, numbers[i])
      lookup = Object.assign(lookup, circle.reduce((a, b) => {
        a[b] = b
        return a
      }, {}))
      circles = circles.concat([circle])
    }
  }

  return circles
}

function getCirclesInRandomArray(length) {
  const randomArr = shuffle(createArrayWithNumbers(length))
  const circles = findCirclesInRandomArray(randomArr)

  const totalLength = circles
    .map(x => x.length)
    .reduce((a, b) => a + b)

  if (totalLength !== randomArr.length) {
    console.error('Sum of the lengths of resulted circles does not match original array length')
  }

  return circles
}


// function main() {
//   const TOTAL_NUM = 100
//   const randomArr = shuffle(createArrayWithNumbers(TOTAL_NUM))
// //   const randomArr = [1, 6, 12, 9, 13, 11, 18, 4, 7, 14, 10, 3, 5, 8, 19, 15, 17, 16, 20, 2]
// //   const randomArr = [1, 2, 3, 4, 5, 6]
//   const circles = findCirclesInRandomArray(randomArr)
//
//   const totalLength = circles
//     .map(x => x.length)
//     .reduce((a, b) => a + b)
//
//   if (totalLength !== randomArr.length) {
//     console.error('Sum of the lengths of resulted circles does not match original array length')
//   }
//
//   console.log(totalLength)
//
//   circles.forEach(x => console.log(x))
// //   console.log(JSON.stringify(circles))
// }


// main()
