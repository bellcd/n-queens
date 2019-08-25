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
        });
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
        i++;

        // recurse to the next row
        recurFxn(index+1, tabooPositions);

        // AFTER that recursion, toggle the piece back to 0
        layout.togglePiece(index, i-1);

        // remove each of the piece we just toggled off's taboo positions
        tabooPositions.forEach(taboo => taboo.pop());
      }
    }
  };
  recurFxn(0, tabooPositions);
  return sum;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // RECURSIVE SOLUTION

  // edge case
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  }

  var layout = new Board({'n': n});
  let finished = false;
  var result = [];
  // var sum = 0;
  var tabooPositions = [
    [], // columns
    [], // diagonals to the right
    []  // diagonals to the left
  ];

  // index represents the row we're currently recursing through
  // tabooPositions is a collection of indexes on the next row (index + 1) that will generate conflicts
  var recurFxn = function(index, tabooPositions){
    if (index >= n && !finished) {
      if (!layout.hasAnyQueensConflicts()) {
        // sum++;
        finished = true;
        // the below code works, but feels hacky ...
        // iterate through layout, building a matrix from the arrays there
        for (let i = 0; i < n; i++) {
          result.push(layout.get(i).slice());
        }
        return;
      } else {
        return;
      }
    }

    // the index position in the row we're currently looking through
    let i = 0;

    // iterate through the columns of the current row
    while (i < n && !finished) {
      // check if i exists in tabooPositions, and set flag
      var findsBadPosition = false;
      findsBadPosition = tabooPositions.some(taboo => {
        return taboo.some(badPosition => {
          return badPosition === i;
        });
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
  };
  recurFxn(0, tabooPositions);

  // if no solution was found, create a blank matrix of size n
  if (result.length === 0) {
    for (let i = 0; i < n; i++) {
      result.push(new Array(n).fill(0));
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
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
        });
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
  };
  recurFxn(0, tabooPositions);
  return sum;
};