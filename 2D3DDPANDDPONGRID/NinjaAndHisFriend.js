// Problem Description:

// We are given an ‘N*M’ matrix. Every cell of the matrix has some chocolates on it, mat[i][j] gives us the number of chocolates. We have two friends ‘Alice’ and ‘Bob’. initially, Alice is standing on the cell(0,0) and Bob is standing on the cell(0, M-1). Both of them can move only to the cells below them in these three directions: to the bottom cell (↓), to the bottom-right cell(↘), or to the bottom-left cell(↙).

// When Alica and Bob visit a cell, they take all the chocolates from that cell with them. It can happen that they visit the same cell, in that case, the chocolates need to be considered only once.

// They cannot go out of the boundary of the given matrix, we need to return the maximum number of chocolates that Bob and Alice can together collect.

// Ninja has a 'GRID' of size 'R' X 'C'. Each cell of the grid contains some chocolates. Ninja has two friends Alice and Bob, and he wants to collect as many chocolates as possible with the help of his friends.

// Initially, Alice is in the top-left position i.e. (0, 0), and Bob is in the top-right place i.e. (0, ‘C’ - 1) in the grid. Each of them can move from their current cell to the cells just below them. When anyone passes from any cell, he will pick all chocolates in it, and then the number of chocolates in that cell will become zero. If both stay in the same cell, only one of them will pick the chocolates in it.

// If Alice or Bob is at (i, j) then they can move to (i + 1, j), (i + 1, j - 1) or (i + 1, j + 1). They will always stay inside the ‘GRID’.

// Your task is to find the maximum number of chocolates Ninja can collect with the help of his friends by following the above rules.

function NinjaAndHisFriendUtil(i, aliceCol, bobCol, row, col, matrix, dp) {
  // Check if the indices are out of bounds

  if (aliceCol < 0 || aliceCol >= col || bobCol < 0 || bobCol >= col) {
    return -1e9; // A very large negative value for invalid states
  }

  // Base case: if we are at the last row

  if (i === row - 1) {
    // If both indices are the same, return any value of col  either for bob or alice at that position
    if (aliceCol === bobCol) {
      return matrix[i][aliceCol];
    }
    // If the indices are different, return the sum of values at both positions
    else {
      return matrix[i][aliceCol] + matrix[i][bobCol];
    }
  }

  // If the result for this state is already computed, return it
  if (dp[i][aliceCol][bobCol] !== -1) return dp[i][aliceCol][bobCol];

  // Now // Initialize the maximum value to a very small number
  let maxi = Number.MIN_SAFE_INTEGER;

  // Iterate through neighboring positions, because
  // when  we move to the second row,
  // it is only the value of colums that was changing and the value of row remain the same
  // e.g  at left, we have (i+1,j-1), down, we have (i+1, j), and right (i+ 1, j+1)
  // As we can see, it is  only the  value of col that is changing from -1 to +1, while the
  // row keeps it value as +1
  for (let d1 = -1; d1 <= 1; d1++) {
    for (let d2 = -1; d2 <= 1; d2++) {
      let res;

      if (aliceCol === bobCol) {
        // we pick one out of aliceCol or bobCol
        res =
          matrix[i][aliceCol] +
          NinjaAndHisFriendUtil(
            i + 1,
            aliceCol + d1,
            bobCol + d2,
            row,
            col,
            matrix,
            dp
          );
      } else {
        res =
          matrix[i][aliceCol] +
          matrix[i][bobCol] +
          NinjaAndHisFriendUtil(
            i + 1,
            aliceCol + d1,
            bobCol + d2,
            row,
            col,
            matrix,
            dp
          );
      }
      // Update the maximum value
      maxi = Math.max(maxi, res);
    }
  }
  console.log(aliceCol, bobCol);
  // Store the maximum value in the dp array and return it
  return (dp[i][aliceCol][bobCol] = maxi);
  //return maxi;
}

function NinjaAndHisFriend(row, col, matrix) {
  //We are using 3D array in this problem because you are  using two columns

  // Initialize a 3D dp array with -1 values
  let dp = Array.from(Array(row), () =>
    Array.from(Array(col), () => Array(col).fill(-1))
  );
  // console.log(dp);
  //Here, we are using col -1 here because, Alice is standing at 0 col,
  // while Bob is standing at col -1 ( m- 1)
  return NinjaAndHisFriendUtil(0, 0, col - 1, row, col, matrix, dp);
}

const matrix = [
  [2, 3, 1, 2],
  [3, 4, 2, 2],
  [5, 6, 3, 5],
];

let row = matrix.length;
let col = matrix[0].length;

// Time Complexity: O(N*M*M) * 9

// Reason: At max, there will be N*M*M calls of recursion to solve a new problem and in every call, two nested loops together run for 9 times.

// Space Complexity: O(N) + O(N*M*M)

// Reason: We are using a recursion stack space: O(N), where N is the path length and an external DP Array of size ‘N*M*M’.
let result = NinjaAndHisFriend(row, col, matrix);

console.log(result);

console.log("Tabulation Appraoch");

function NinjaAndHisFriendTabApproachUtil(row, col, matrix, dp) {
  // Initialize dp array for the last row based on grid values
  for (let aliceCol = 0; aliceCol < col; aliceCol++) {
    for (let bobCol = 0; bobCol < col; bobCol++) {
      if (aliceCol === bobCol) {
        dp[row - 1][aliceCol][bobCol] = matrix[row - 1][aliceCol];
      } else {
        dp[row - 1][aliceCol][bobCol] =
          matrix[row - 1][aliceCol] + matrix[row - 1][bobCol];
      }
    }
  }

  // Iterate through rows in reverse order, i .e  from n-2  to 0
  for (let i = row - 2; i >= 0; i--) {
    for (let aliceCol = 0; aliceCol < col; aliceCol++) {
      for (let bobCol = 0; bobCol < col; bobCol++) {
        let maxi = Number.MIN_SAFE_INTEGER;

        // Iterate through all possible move combinations

        for (let d1 = -1; d1 <= 1; d1++) {
          for (d2 = -1; d2 <= 1; d2++) {
            let result;
            if (aliceCol === bobCol) {
              result = matrix[i][aliceCol];
            } else {
              result = matrix[i][aliceCol] + matrix[i][bobCol];
            }
            // Check if the move is valid (within grid bounds)
            if (
              aliceCol + d1 >= 0 &&
              aliceCol + d1 < col &&
              bobCol + d2 >= 0 &&
              bobCol + d2 < col
            ) {
              result += dp[i + 1][aliceCol + d1][bobCol + d2];
            } else {
              result += -1e9; // A very large negative value for invalid moves
            }
            maxi = Math.max(maxi, result);
          }
        }
        dp[i][aliceCol][bobCol] = maxi;
      }
    }
  }
  // The maximum chocolates will be stored in dp[0][0][m - 1]
  return dp[0][0][col - 1];
}

function NinjaAndHisFriendTabApproach(row, col, matrix) {
  // Initialize a 3D dp array with zeros
  let dp = Array.from(Array(row), () =>
    Array.from(Array(col), () => Array(col).fill(-1))
  );

  return NinjaAndHisFriendTabApproachUtil(row, col, matrix, dp);
}


// Time Complexity: O(N*M*M)*9

// Reason: The outer nested loops run for (N*M*M) times and the inner two nested loops run for 9 times.

// Space Complexity: O(N*M*M)

// Reason: We are using an external array of size ‘N*M*M’. The stack space will be eliminated.
let res = NinjaAndHisFriendTabApproach(row, col, matrix);
console.log(res);
