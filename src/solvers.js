/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n}); //[]

  // iterate through matrix rows
  for (let i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  // the below code works, but feels hacky ...
  var result = [];
  // iterate through solution.attributes, building a matrix from the arrays there
  for (let i = 0; i < n; i++) {
    result.push(solution.attributes[i]);
  }
  return result;
};

  //   legoBlock = placement[iterate through 0-4]
  // while (indexOfTest < n) {
  //   recurFxn(indexOfTest, legoBlock){
  //     testArray[indexofTest] = legoBlock;
  //     recurFxn(indexOfTest+1, legoBlock) --- when indexOfTest is at the end[0000] - increment legoblock// reset layout
  //   }
  //   - [] - (1) [placement[i]] - (2)[0,0] (3) - stop and call function
  //   [0, 0, 0, 0]
  //   [0, 0, 0, 1]
  //   counter1: indexOfTest
  //   counter2: which block
  // }

  // 34
  // '34' - i
  // [, , '3', '4']
  // [0, 0, '3', '4']
  // [0, 0, 3, 4]
  // [0, 0, 4, 0]
  // [0, 1, 0, 0]

  // 0034
  // 0100
  // 0- 0000
  // 1- 0001
  // 2- 0002
  // 3- 0003
  // (4) 10- 0010
  // (5) 11- 0011
  // (6) 12- 0012
  // (7) 13- 0013
  // (8) 20- 0020
  // (9) 21- 0021
  // (10) 22- 0022
  // (11) 23- 0023 0024 0030
  // (12) 30- 0030
  // (13) 31- 0031
  // (14) 32- 0032
  // (15) 33- 0033 0034 0040
  // (16) 40- 0040
  // 16- 0100

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = new Board({n: n}); ; //fixme
  // var recurFxn = function(row) {
  //   // recursive solution on hold for now
  //   //if we put rook here - call function to test
  //     //if function is true, put it here
  //       //recurFxn(row+1)
  // }

  // edge case
  if (n === 1) {
    return 1;
  }

  var counter = 0;
  // generate each possible subarray placement for the given n
  var placement = new Array(n);
  for (let i = 0; i < n; i++){
    placement[i] = new Array(n);
    placement[i].fill(0);
    placement[i][i] = 1;
  }

  let layout;
  let rep;
  let stopIndex;
  let iCopy;
  let i = 0;

  // continues looping until we've looked at every permutation of the rows
  while (true) {
    rep = [];
    // copy i
    iCopy = i;
      // map iCopy into an array of placement indexes called rep
      // convert iCopy into a string
      iCopy = String(iCopy);
      // while iCopy length is greater than 0
      while (iCopy.length > 0) {
        // take the last letter in iCopy, change it to a number, and unshift it onto rep
        rep.unshift(Number(iCopy.charAt(iCopy.length - 1)));
        // remove that letter from iCopy
        iCopy = iCopy.slice(0, -1);
      }

      // fill empty rep indexes with 0s if necessary
      // while rep length is less than n
      while (rep.length < n) {
        // unshift 0s onto rep
        rep.unshift(0);
      }

    let flag = true;
    let j = rep.length - 1;
    // convert any rep indexes that equal n to appropriate index values. If they're all equal to n, we've looked at every possible permutation, so we can return counter.
    while (flag) {
        // check if index is equal n
        if (rep[j] === n) {
          // yes,
            // if first index, we've looked at every permutation, return counter
            if (j === 0) {
              return counter;
            }
            // replace that index with 0, increment the index before it
            rep[j] = 0;
            rep[j - 1]++;
        } else {
          // no,
          // move on
        }
      // decrement index
      if (j === 0) {
        flag = false;
      }
      --j;
    }

    // creates a board instance and fills with the appropriate rows
    layout = new Board({'n': n});
    rep.forEach((row, i) => {
      // push placement[value at rep index] into layout
      layout.set(i, placement[row]);
    });

    // test layout, increment counter if necessary
    if (!layout.hasAnyRooksConflicts()) {
      ++counter;
    }

    // make the next iteration of i the rep array, joined
    i = Number(rep.join(''));
    ++i;
  }
//   // - [0000] [1111] [2222] [3333]
//   // - [0, 0, 0, 0] [0001] [0002] [0003]
//   // -   0     0001   0002         0011

//   // iterate through var rep = numeric representation of subarrays
//     // push subarrays together
//     // decide if current rep has a conflict
//       // if no, increment counter
//     // increment rep by 1
//       // split rep into array
//         // while any indexes are greater than n
//           // find last index greater than n
//             // if the increment before that is negative, return counter
//               // else, increment the index before that, set that index to 1

//   // 0: [1000] 1[0,1,0,0] 2[0010] 3[0001]
//   // - 0000, ... 1112, 1113, 1114, 1121, 1122, 1123, 1124, -
//   //                                       5111
//   // 1111:
//   // [0001]
//   // [0001]
//   // [0001]
//   // [0001]

//   // 1112:
//   // [0001]
//   // [0001]
//   // [0001]
//   // [0010]

//   //   }
//   //     col++;
//   //     if(col < n) return;
//   //   }

//   //   result.forEach((rowArray)
//   //     //for
//   //       //for
//   //         //for
//   //         // check if conflict - call function hasAnyRooksConflicts();
//   //   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   //   return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
