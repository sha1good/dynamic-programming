// Approach:

// The algorithm steps are as follows:

// First, we need to create a dp array of the same size as the matrix.
// Then, we will copy the values of the first row and first column of the matrix as it is to the dp array.
// Then, we will start iterating over the rest of the cells and we will observe two cases:
// If the cell (i, j) contains 0, we will set the value 0 to the cell dp[i][j].
// If the cell (i, j) contains 1, we will first find the minimum value among the adjacent three cells i.e. min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]). And with that minimum value, we will add 1 and set it to the cell dp[i][j]. The formula will look like the following:
// dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) +1
// After filling all the cells in this way, we will just add all the values of the dp array to get the total sum. And this total sum will be the final answer.

// Question: Given an n * m matrix of ones and zeros, return how many square submatrices have all ones.

function countSquares(row, cols, array) {
  // Create a 2D array

  let dp = Array.from({ length: row }, () => Array(cols).fill(0));
  //Fill the row first by copying the first row of the original question or original array
  for (let j = 0; j < cols; j++) dp[0][j] = parseInt(array[0][j]);
  //Fill the col first by copying the first col of the original question or original array
  for (let i = 0; i < row; i++) dp[i][0] = parseInt(array[i][0]);

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < cols; j++) {
      if (array[i][j] === "0") dp[i][j] = 0;
      else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], Math.min(dp[i - 1][j - 1], dp[i][j - 1]));
      }
    }
  }

  let sum = 0;

  for (i = 0; i < row; i++) {
    for (j = 0; j < cols; j++) {
      sum += dp[i][j];
    }
  }

  return sum;
}

function main() {
  //   let array = [
  //     [0, 1, 1, 1],
  //     [1, 1, 1, 1],
  //     [0, 1, 1, 1],
  //   ];

  //   let row = 3;
  //   let cols = 4;

  matrix = [
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ];

  let rows = matrix.length;
  let columns = matrix[0].length;
  let squares = countSquares(rows, columns, matrix);
  console.log("The number of squares: ", squares);
}

main();
