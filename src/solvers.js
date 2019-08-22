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
window.countNRooksSolutions = function(n) {
  var solutionCount = new Board({n: n}); ; //fixme
  var recurFxn = function(row) {
    // recursive solution on hold for now
    //if we put rook here - call function to test
      //if function is true, put it here
        //recurFxn(row+1)
  }
  // var counter
  var counter = 0;
  // generate each possible subarray placement for the given n
  var placement = new Array(n);
  for (let i = 0; i < n; i++){
    placement[i] = new Array(n);
    placement[i].fill(0);
    placement[i][i] = 1;
  }

  // iterate through var rep = numeric representation of subarrays
    // push subarrays together
    // decide if current rep has a conflict
      // if no, increment counter
    // increment rep by 1
      // split rep into array
        // while any indexes are greater than n
          // find last index greater than n
            // if the increment before that is negative, return counter
              // else, increment the index before that, set that index to 1

  // 0: [1000] 1[0,1,0,0] 2[0010] 3[0001]
  // - 1111, 1112, 1113, 1114, 1121, 1122, 1123, 1124, -
  //                                       5111
  // 1111:
  // [0001]
  // [0001]
  // [0001]
  // [0001]

  // 1112:
  // [0001]
  // [0001]
  // [0001]
  // [0010]

  //   }
  //     col++;
  //     if(col < n) return;
  //   }

  //   result.forEach((rowArray)
  //     //for
  //       //for
  //         //for
  //         // check if conflict - call function hasAnyRooksConflicts();
  //   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //   return solutionCount;
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
