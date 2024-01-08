// Grid Unique Paths : DP on Grids (DP8)
// In this article, we will solve the most asked coding interview problem: Grid Unique Paths

// Given two values M and N, which represent a matrix[M][N]. We need to find the total unique paths from the top-left cell (matrix[0][0]) to the rightmost cell (matrix[M-1][N-1]).

// At any cell we are allowed to move in only two directions:- bottom and right.

// Define a function to count the number of ways to reach cell (i, j) from the top-left corner (0, 0) in a grid of size row x col
function GridUniquePathsUtil(i, j, dp) {
  // If we have reached the top-left corner, there is one way to reach it.
  if (i === 0 || j === 0) return 1;

  // If i or j is negative, we are out of bounds, so there are no ways to reach this cell.

  if (i < 0 || j < 0) return 0;

  // If we have already computed the number of ways to reach this cell, return it.
  if (dp[i][j] !== -1) return dp[i][j];
  // Calculate the number of ways to reach this cell by moving up and left.
  const up = GridUniquePathsUtil(i - 1, j, dp);
  const left = GridUniquePathsUtil(i, j - 1, dp);
  // Store the result in the dp array and return it.
  dp[i][j] = up + left;

  return dp[i][j];
}

function GridUniquePaths(row, col) {
  // Create a 2D array to store the results of subproblems. Initialize it with -1
  //  let dp =  new Array(row)

  //  for(let i=0; i < row; i++){
  //     dp[i] = new Array(col).fill(-1)
  //  }

  //OR
  // let dp = Array.from(Array(m), () => Array(col).fill(-1))
  let dp = Array.from({ length: row }, () => Array(col).fill(-1));

  // Call the utility function to compute the result.

  return GridUniquePathsUtil(row - 1, col - 1, dp);
}

let row = 3;
let col = 2;

// Call the countWays function and print the result.

// Time Complexity: O(M*N)

// Reason: At max, there will be M*N calls of recursion.

// Space Complexity: O((N-1)+(M-1)) + O(M*N)

// Reason: We are using a recursion stack space: O((N-1)+(M-1)), here (N-1)+(M-1) is the path length and an external DP Array of size ‘M*N’.
let result = GridUniquePaths(row, col);

console.log(result);

// Define a function to count the number of ways to reach cell (m, n) in a grid.
function GridUniquePathsTabUtil(m, n, dp) {
  //Define the base Case
  dp[0][0] = 1;

  // Iterate through each cell in the grid.
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j == 0) continue;

      // Initialize variables to store the number of ways to reach the current cell by moving up and left.
      let up = 0,
        left = 0;
      // Check if we can move up (i > 0).
      if (i > 0) {
        up = dp[i - 1][j];
      }
      // Check if we can move left (j > 0).
      if (j > 0) {
        left = dp[i][j - 1];
      }
      // The total number of ways to reach the current cell is the sum of ways from above (up) and from the left (left).
      dp[i][j] = up + left;
    }
  }
  // The result is stored in the bottom-right cell of the grid (m-1, n-1).
  return dp[m][n];
}

function GridUniquePathsTab(row, col) {
  // Create a 2D array to store the results of subproblems. Initialize it with -1
  let dp = Array.from(Array(row), () => Array(col).fill(-1));
  return GridUniquePathsTabUtil(row - 1, col - 1, dp);
}

console.log("===================================");

// Complexity Analysis
// Time Complexity: O(M*N)

// Reason: There are two nested loops

// Space Complexity: O(M*N)

// Reason: We are using an external array of size ‘M*N’’.
let res = GridUniquePathsTab(row, col);

console.log(res);

console.log("=====================================");

function GridUniquePathSpaceOptimization(row, col) {
  // Create an array 'prev' to store the previous row's values.
  const previous = Array(col).fill(0);
  // Iterate through each row of the grid.

  for (let i = 0; i < row; i++) {
    // Create an array 'temp' to store the current row's values.
    let temp = Array(col).fill(0);

    // Iterate through each column of the grid.
    for (let j = 0; j < col; j++) {
      // Base condition: If we are at the top-left cell (0, 0), there is only one way to reach it.
      if (i === 0 && j === 0) {
        temp[j] = 1;
        continue;
      }

      // Initialize variables to store the number of ways to reach the current cell by moving up and left.
      let up = 0;
      let left = 0;

      // Check if we can move up (i > 0).
      if (i > 0) {
        up = previous[j];
      }
      // Check if we can move left (j > 0).
      if (j > 0) {
        left = temp[j - 1];
      }
      // The total number of ways to reach the current cell is the sum of ways from above (up) and from the left (left).
      temp[j] = up + left;
      // Update the 'prev' array with the values from the current row ('temp') for the next iteration.
    }
    previous.splice(0, col, ...temp);
  }
  // The result is stored in the last element of the 'prev' array.
  return previous[col - 1];
}


// Complexity Analysis
// Time Complexity: O(M*N)

// Reason: There are two nested loops

// Space Complexity: O(N)

// Reason: We are using an external array of size ‘N’ to store only one row.
let rsult = GridUniquePathSpaceOptimization(row, col);

console.log(result);
