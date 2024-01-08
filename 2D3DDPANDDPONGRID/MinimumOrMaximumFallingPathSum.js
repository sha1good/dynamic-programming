// In this article, we will solve the most asked coding interview problem: Minimum/Maximum falling path sum.

// Problem Link: Variable Starting and Ending Point

// Problem Description:

// We are given an ‘N*M’ matrix. We need to find the maximum path sum from any cell of the first row to any cell of the last row.

// At every cell we can move in three directions: to the bottom cell (↓), to the bottom-right cell(↘), or to the bottom-left cell(↙).

// function MinimumOrMaximumFallingPathSumUtil(row, col, matrix, dp) {
//   if (row === 0) return matrix[0][col];
//   if (col < 0 || col >= matrix[0].length) return -1e8;

//   //if the previous values has been computed
//   if (dp[row][col] !== -1) return dp[row][col];

//   let up =
//     matrix[row][col] +
//     MinimumOrMaximumFallingPathSumUtil(row - 1, col, matrix, dp);
//   let leftDiagonal =
//     matrix[row][col] +
//     MinimumOrMaximumFallingPathSumUtil(row - 1, col - 1, matrix, dp);
//   let rightDiagonal =
//     matrix[row][col] +
//     MinimumOrMaximumFallingPathSumUtil(row - 1, col + 1, matrix, dp);
//   return (dp[row][col] = Math.max(up, Math.max(leftDiagonal, rightDiagonal)));
// }

// function MinimumOrMaximumFallingPathSum(row, col, matrix) {
//   let dp = Array.from(Array(row), () => Array(col).fill(-1));
//   // Find the maximum value in the last row of dp

//   let maxi = -1e8;

//   for (let j = 0; j < col; j++) {
//     maxi = Math.max(
//       maxi,
//       MinimumOrMaximumFallingPathSumUtil(row - 1, j, matrix, dp)
//     );
//   }
//   return maxi;
// }

// let matrix = [
//   [1, 2, 10, 4],
//   [100, 3, 2, 1],
//   [1, 1, 20, 2],
//   [1, 2, 2, 1],
// ];

// let row = matrix.length;
// let col = matrix[0].length;

// let result = MinimumOrMaximumFallingPathSum(row, col, matrix);

// console.log(result);

function findMaximumFallingPathSumUtil(row, col, matrix, dp) {
  // Base cases
  if (row === 0) return matrix[0][col];
  if (col < 0 || col >= matrix[0].length) return Number.NEGATIVE_INFINITY;

  // Check if the value has been computed before
  if (dp[row][col] !== -1) return dp[row][col];

  // Calculate the maximum falling path sum for the current cell
  const up =
    matrix[row][col] + findMaximumFallingPathSumUtil(row - 1, col, matrix, dp);
  const leftDiagonal =
    matrix[row][col] +
    findMaximumFallingPathSumUtil(row - 1, col - 1, matrix, dp);
  const rightDiagonal =
    matrix[row][col] +
    findMaximumFallingPathSumUtil(row - 1, col + 1, matrix, dp);

  // Update the DP table and return the maximum falling path sum
  return (dp[row][col] = Math.max(up, leftDiagonal, rightDiagonal));
}

function findMaximumFallingPathSum(matrix) {
  // Check for empty matrix
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return Number.NEGATIVE_INFINITY;
  }

  const row = matrix.length;
  const col = matrix[0].length;

  // Initialize the DP table
  const dp = Array.from(Array(row), () => Array(col).fill(-1));

  // Find the maximum value in the last row of dp
  let maxi = Number.NEGATIVE_INFINITY;

  for (let j = 0; j < col; j++) {
    maxi = Math.max(
      maxi,
      findMaximumFallingPathSumUtil(row - 1, j, matrix, dp)
    );
  }

  return maxi;
}

let matrix = [
  [1, 2, 10, 4],
  [100, 3, 2, 1],
  [1, 1, 20, 2],
  [1, 2, 2, 1],
];

let result = findMaximumFallingPathSum(matrix);

console.log(result);

function findMaximumFallingPathSumTabApproach(matrix) {
  let row = matrix.length;
  let col = matrix[0].length;

  // Initialize a 2D array dp to store maximum path sums
  let dp = Array.from(Array(row), () => Array(col).fill(-1));

  // Initialize the first row of dp with values from the matrix
  for (let j = 0; j < col; j++) {
    dp[0][j] = matrix[0][j];
  }

  // Iterate over the matrix to calculate maximum path sums
  // And since the first row has been taken care of, we need to start from 1

  for (let i = 1; i < row; i++) {
    for (j = 0; j < col; j++) {
      let up = matrix[i][j] + dp[i - 1][j];

      let leftDiagonal = matrix[i][j];

      if (j - 1 >= 0) leftDiagonal += dp[i - 1][j - 1];
      else leftDiagonal -= 1e8; // Subtract a large negative value for invalid index

      let rightDiagonal = matrix[i][j];
      if (j + 1 < col) rightDiagonal += dp[i - 1][j + 1];
      else rightDiagonal -= 1e8; // Subtract a large negative value for invalid index

      dp[i][j] = Math.max(up, Math.max(leftDiagonal, rightDiagonal));
    }
  }

  // Find the maximum value in the last row of dp
  let maxi = Number.MIN_SAFE_INTEGER;
  for (let j = 0; j < col; j++) {
    maxi = Math.max(maxi, dp[row - 1][j]);
  }

  return maxi;
}

// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M’. The stack space will be eliminated.
let res = findMaximumFallingPathSumTabApproach(matrix);
console.log(res);

function findMaximumFallingPathSumOptimizationApproach(matrix) {
  let row = matrix.length;
  let col = matrix[0].length;

  // Initialize two arrays: prev and cur
  let prev = Array(col).fill(-1);
  let temp = Array(col).fill(-1);

  for (let j = 0; j < col; j++) {
    prev[j] = matrix[0][j];
  }

  // Iterate over the matrix to calculate maximum path sums
  for (let i = 1; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let up = matrix[i][j] + prev[j];

      let leftDiagonal = matrix[i][j];
      if (j - 1 >= 0) leftDiagonal += prev[j - 1];
      else leftDiagonal -= 1e8;

      let rightDiagonal = matrix[i][j];
      if (j + 1 < col) rightDiagonal += prev[j + 1];
      else rightDiagonal -= 1e8;

      temp[j] = Math.max(up, leftDiagonal, rightDiagonal);
    }

    prev = [...temp];
  }

  let maxi = -Infinity;
  for (let j = 0; j < col; j++) {
    maxi = Math.max(maxi, prev[j]);
  }

  return maxi;
}

let response = findMaximumFallingPathSumOptimizationApproach(matrix);

console.log(response);
