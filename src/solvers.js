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

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   // NAIVE SOLUTION
//   // edge case
//   if (n === 1) {
//     return 1;
//   }

//   var counter = 0;
//   // generate each possible subarray placement for the given n
//   var placement = new Array(n);
//   for (let i = 0; i < n; i++){
//     placement[i] = new Array(n);
//     placement[i].fill(0);
//     placement[i][i] = 1;
//   }

//   let layout;
//   let rep;
//   let stopIndex;
//   let iCopy;
//   let i = 0;

//   // continues looping until we've looked at every permutation of the rows
//   while (true) {
//     rep = [];
//     // copy i
//     iCopy = i;
//       // map iCopy into an array of placement indexes called rep
//       // convert iCopy into a string
//       iCopy = String(iCopy);
//       // while iCopy length is greater than 0
//       while (iCopy.length > 0) {
//         // take the last letter in iCopy, change it to a number, and unshift it onto rep
//         rep.unshift(Number(iCopy.charAt(iCopy.length - 1)));
//         // remove that letter from iCopy
//         iCopy = iCopy.slice(0, -1);
//       }

//       // fill empty rep indexes with 0s if necessary
//       // while rep length is less than n
//       while (rep.length < n) {
//         // unshift 0s onto rep
//         rep.unshift(0);
//       }

//     let flag = true;
//     let j = rep.length - 1;
//     // convert any rep indexes that equal n to appropriate index values. If they're all equal to n, we've looked at every possible permutation, so we can return counter.
//     while (flag) {
//         // check if index is equal n
//         if (rep[j] === n) {
//           // yes,
//             // if first index, we've looked at every permutation, return counter
//             if (j === 0) {
//               return counter;
//             }
//             // replace that index with 0, increment the index before it
//             rep[j] = 0;
//             rep[j - 1]++;
//         } else {
//           // no,
//           // move on
//         }
//       // decrement index
//       if (j === 0) {
//         flag = false;
//       }
//       --j;
//     }

//     // creates a board instance and fills with the appropriate rows
//     layout = new Board({'n': n});

//     for (let i = 0; i < n; i++) {
//       layout.set(i, placement[rep[i]]);

//       // stop adding lego blocks to matrix if there's already a conflict
//       if (layout.hasAnyRooksConflicts()) {
//         break;
//       }

//       // when matrix is built, test layout, increment counter if necessary
//       if (i === (n - 1) && !layout.hasAnyRooksConflicts()) {
//         ++counter;
//       }
//     }

//     // make the next iteration of i the rep array, joined
//     i = Number(rep.join(''));
//     ++i;
//   }
// };

window.countNRooksSolutions = function(n) {
  // RECURSIVE SOLUTION
  var layout = new Board({'n': n});
  var sum = 0;
  var tabooPositions = [
    [] // columns
  ];

  // index represents the row we're currently recursing through
  // tabooPositions is a collection of indexes on the next row (index + 1) that will generate conflicts
  var recurFxn = function(index, tabooPositions){
    if (index >= n) {
      if (!layout.hasAnyRooksConflicts()) {
        sum++;
      }
      return;
    }

    // the index position in the row we're currently looking through
    let i = 0;

    // iterate through the columns of the current row
    while (i < n) {
        // check if i exists in tabooPositions, and set flag
        var findsBadPosition = false;
        findsBadPosition = tabooPositions.some(taboo => {
          return taboo.some(badPosition => {
            return badPosition === i;
          })
        });

        if (findsBadPosition) {
          // next while loop iteration (ie, try the next column in the current row)

          i++;
        } else {
          // we've found a position that works for this row, so move to the next row (ie, next recursive call)

          // toggle the game piece for this row
          layout.togglePiece(index, i);

          // add the taboo positions for the row we're about to recurse into
          tabooPositions[0].push(i); // columns

          // // increment previous rows right diagonals by 1 to the right
          // tabooPositions[1] = tabooPositions[1].map(e => ++e);
          // tabooPositions[1].push(i + 1); // diagonal to the right

          // // increment previous rows left diagonals by 1 to the left
          // tabooPositions[2] = tabooPositions[2].map(e => --e);
          // tabooPositions[2].push(i - 1); // diagonal to the left
          i++;

          // recurse to the next row
          recurFxn(index+1, tabooPositions);

          // AFTER that recursion, toggle the piece back to 0
          layout.togglePiece(index, i-1);

          // remove each of the piece we just toggled off's taboo positions
          tabooPositions.forEach(taboo => taboo.pop());

          // // decrement the right and increment the left diagonals from tabooPositions[1] & tabooPositions[2]
          // tabooPositions[1] = tabooPositions[1].map(e => --e);
          // tabooPositions[2] = tabooPositions[2].map(e => ++e);
        }
    }
  }
  recurFxn(0, tabooPositions);
  return sum;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  var solution = new Board({n: n}); //[]

  // generate each possible subarray placement for the given n
  var placement = new Array(n);
  for (let i = 0; i < n; i++){
    placement[i] = new Array(n);
    placement[i].fill(0);
    placement[i][i] = 1;
  }

  // iterate 0 through n, twice
    // once ascending
      // iterate n times to build a matrix
        // starting at index 0, place each subarray row, skipping every other placement index
        // when we get to greater than n, start from the beggining again, place the subarrays that we skipped
    // once descending
      // iterate n times to build a matrix
        // do the same thing, but having the first row in the matrix start with the last subarray in placement

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // RECURSIVE SOLUTION

  // edge case
  if (n === 0 || n === 1) {
    return 1;
  }

  var layout = new Board({'n': n});
  var sum = 0;
  var tabooPositions = [
    [], // columns
    [], // diagonals to the right
    []  // diagonals to the left
  ];

  // index represents the row we're currently recursing through
  // tabooPositions is a collection of indexes on the next row (index + 1) that will generate conflicts
  var recurFxn = function(index, tabooPositions){
    if (index >= n) {
      if (!layout.hasAnyQueensConflicts()) {
        sum++;
      }
      return;
    }

    // the index position in the row we're currently looking through
    let i = 0;

    // iterate through the columns of the current row
    while (i < n) {
        // check if i exists in tabooPositions, and set flag
        var findsBadPosition = false;
        findsBadPosition = tabooPositions.some(taboo => {
          return taboo.some(badPosition => {
            return badPosition === i;
          })
        });

        if (findsBadPosition) {
          // next while loop iteration (ie, try the next column in the current row)

          i++;
        } else {
          // we've found a position that works for this row, so move to the next row (ie, next recursive call)

          // toggle the game piece for this row
          layout.togglePiece(index, i);

          // add the taboo positions for the row we're about to recurse into
          tabooPositions[0].push(i); // columns

          // increment previous rows right diagonals by 1 to the right
          tabooPositions[1] = tabooPositions[1].map(e => ++e);
          tabooPositions[1].push(i + 1); // diagonal to the right

          // increment previous rows left diagonals by 1 to the left
          tabooPositions[2] = tabooPositions[2].map(e => --e);
          tabooPositions[2].push(i - 1); // diagonal to the left
          i++;

          // recurse to the next row
          recurFxn(index+1, tabooPositions);

          // AFTER that recursion, toggle the piece back to 0
          layout.togglePiece(index, i-1);

          // remove each of the piece we just toggled off's taboo positions
          tabooPositions.forEach(taboo => taboo.pop());

          // decrement the right and increment the left diagonals from tabooPositions[1] & tabooPositions[2]
          tabooPositions[1] = tabooPositions[1].map(e => --e);
          tabooPositions[2] = tabooPositions[2].map(e => ++e);
        }
      }
    }
    recurFxn(0, tabooPositions);
    return sum;
};

