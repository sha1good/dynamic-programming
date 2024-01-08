// Problem Description:

// We are given an “N*M” matrix of integers. We need to find a path from the top-left corner to the bottom-right corner of the matrix, such that there is a minimum cost past that we select.

// At every cell, we can move in only two directions: right and bottom. The cost of a path is given as the sum of values of cells of the given matrix.

// Define a function to find the minimum sum path in a matrix

function MinimumPathSumInGridUtil(row, col, matrix, dp) {
  if (row === 0 && col === 0) return matrix[0][0];
  if (row < 0 || col < 0) return Infinity;

  // If the result for this cell has already been calculated, return it
  if (dp[row][col] !== -1) return dp[row][col];

  // Calculate the sum of the current cell and the minimum of the two possible paths
  let up =
    matrix[row][col] + MinimumPathSumInGridUtil(row - 1, col, matrix, dp);
  let left =
    matrix[row][col] + MinimumPathSumInGridUtil(row, col - 1, matrix, dp);

  return (dp[row][col] = Math.min(up, left));
}

function MinimumPathSumInGrid(row, col, matrix) {
  let dp = Array.from(Array(row), () => Array(col).fill(-1));

  // Start the recursive calculation from the bottom-right cell
  return MinimumPathSumInGridUtil(row - 1, col - 1, matrix, dp);
}

// Define the matrix as a 2D array
const matrix = [
  [5, 9, 6],
  [11, 5, 2],
];

// Get the dimensions of the matrix
const row = matrix.length;
const col = matrix[0].length;

// Time Complexity: O(N*M)

// Reason: At max, there will be N*M calls of recursion.

// Space Complexity: O((M-1)+(N-1)) + O(N*M)

// Reason: We are using a recursion stack space: O((M-1)+(N-1)), here (M-1)+(N-1) is the path length and an external DP Array of size ‘N*M’.
let result = MinimumPathSumInGrid(row, col, matrix);

console.log(result);

console.log("MinimumPathSumInGridTabApproach");

function MinimumPathSumInGridTabApproachUtil(row, col, matrix, dp) {
  // Loop through each cell in the matrix
  for (let i = 0; i <= row; i++) {
    for (let j = 0; j <= col; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = matrix[i][j];
      } else {
        // Calculate the sum of the current cell and the minimum of the two possible paths (from above and from the left)
        let up = matrix[i][j];
        if (i > 0) up += dp[i - 1][j];
        else up += Infinity; // Set to a large value for the top row

        let left = matrix[i][j];
        if (j > 0) left += dp[i][j - 1];
        else left += Infinity; // Set to a large value for the leftmost column

        dp[i][j] = Math.min(up, left);
      }
    }
  }

  return dp[row][col];
}

function MinimumPathSumInGridTabApproach(row, col, matrix) {
  let dp = Array.from({ length: row }, () => Array(col).fill(-1));

  return MinimumPathSumInGridTabApproachUtil(row - 1, col - 1, matrix, dp);
}

let rsult = MinimumPathSumInGridTabApproach(row, col, matrix);

console.log(rsult);

console.log("This is the space optimization");

function MinimumPathSumInGridSpaceOptimization(row, col, matrix) {
  // Create an array 'prev' to store the minimum sum for the previous row
  let prev = Array(col).fill(0);

  // Loop through each row in the matrix
  for (let i = 0; i < row; i++) {
    // Create an array 'temp' to store the minimum sum for the current row
    let temp = Array(col).fill(0);

    // Loop through each cell in the current row
    for (let j = 0; j < col; j++) {
      if (i === 0 && j === 0) {
        temp[j] = matrix[i][j];
      } else {
        let up = matrix[i][j];
        if (i > 0) up += prev[j];
        else up += Infinity;

        let left = matrix[i][j];
        if (j > 0) left += temp[j - 1];
        else left += Infinity;

        temp[j] = Math.min(up, left);
      }
    }
    // Update 'prev' with 'temp' for the next row
    prev = temp;
  }
  // The minimum sum path will be in the last element of 'prev' array
  return prev[col - 1];
}

let res = MinimumPathSumInGridSpaceOptimization(row, col, matrix);

console.log(res);

var inputString = "__I_am__going__to__school__";

let man = inputString.split("__");

console.log(man);

let join = inputString.split("__").filter((string) => string !== "").join("_")
console.log(join);
