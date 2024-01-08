// Define a recursive utility function to explore the maze and count paths

function UniquePath2WithMazeObstaclesUtil(row, col, maze, dp) {
  // If the current cell is an obstacle  and it is a valid cell, return 0 paths
  if (row >= 0 && col >= 0 && maze[row][col] === -1) return 0;
  // If the current cell is  out of bounds
  if (row < 0 || col < 0) return 0;

  // If we've reached the top-left cell, return 1 path
  if (row === 0 && col === 0) return 1;

  // If the result for this cell has already been calculated, return it
  if (dp[row][col] !== -1) return dp[row][col];

  // Recursively explore paths moving up and left
  let up = UniquePath2WithMazeObstaclesUtil(row - 1, col, maze, dp);
  let left = UniquePath2WithMazeObstaclesUtil(row, col - 1, maze, dp);

  // Store the result for this cell in the memoization table and return it
  dp[row][col] = up + left;

  return dp[row][col];
}

function UniquePath2WithMazeObstacles(row, col, maze) {
  let dp = Array.from(Array(row), () => Array(col).fill(-1));

  return UniquePath2WithMazeObstaclesUtil(row - 1, col - 1, maze, dp);
}

// Define the maze as a 2D array
const maze = [
  [0, 0, 0],
  [0, -1, 0],
  [0, 0, 0],
];

let row = maze.length;
let col = maze[0].length;

// Complexity Analysis
// Time Complexity: O(N*M)

// Reason: At max, there will be N*M calls of recursion.

// Space Complexity: O((M-1)+(N-1)) + O(N*M)

// Reason: We are using a recursion stack space:O((M-1)+(N-1)), here (M-1)+(N-1) is the path length and an external DP Array of size ‘N*M’.
let result = UniquePath2WithMazeObstacles(row, col, maze);

console.log(result);

console.log("Printing the tabulation Approach");

function UniquePath2WithMazeObstaclesTabUtil(row, col, maze, dp) {
  // Loop through each cell in the maze
  for (let i = 0; i <= row; i++) {
    for (let j = 0; j <= col; j++) {
      if (i > 0 && j > 0 && maze[i][j] === -1) {
        dp[i][j] = 0;
        continue;
      }

      if (i === 0 && j === 0) {
        dp[i][j] = 1;
        continue;
      }
      let up = 0,
        left = 0;

      if (i > 0) up = dp[i - 1][j];
      if (j > 0) left = dp[i][j - 1];

      dp[i][j] = up + left;
    }
  }

  return dp[row][col];
}

function UniquePath2WithMazeObstaclesTab(row, col, maze) {
  let dp = Array.from({ length: row }, () => Array(col).fill(-1));
  return UniquePath2WithMazeObstaclesTabUtil(row - 1, col - 1, maze, dp);
}

// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M’’.
let rsult = UniquePath2WithMazeObstaclesTab(row, col, maze);

console.log(rsult);

console.log("Space Optimization");

function UniquePath2WithMazeObstacleSpaceOptimization(row, col, maze) {
  // Create an array 'prev' to store the counts for the previous row
  let prev = Array(col).fill(0);

  // Loop through each row in the maze
  for (let i = 0; i < row; i++) {
    // Create an array 'temp' to store the counts for the current row
    let temp = Array(col).fill(0);

    // Loop through each cell in the current row
    for (let j = 0; j < col; j++) {
      // Base conditions

      if (i > 0 && j > 0 && maze[i][j] === -1) {
        temp[j] = 0;
        continue;
      }

      if (i === 0 && j === 0) {
        temp[j] = 1;
        continue;
      }

      // Initialize variables to store counts from above and left cells
      let up = 0;
      let left = 0;
      // If we are not at the top row, get the count from the cell above ('prev')
      if (i > 0) up = prev[j];
      // If we are not at the leftmost column, get the count from the cell to the left ('temp')
      if (j > 0) left = temp[j - 1];

      // Calculate the total count for the current cell and store it in 'temp'
      temp[j] = up + left;
    }
    // Update 'prev' with 'temp' for the next iteration
    prev = temp;
  }
  // Return the count of paths to the bottom-right cell (last element in 'prev' array)
  return prev[row - 1];
}

// Complexity Analysis
// Time Complexity: O(M*N)

// Reason: There are two nested loops

// Space Complexity: O(N)

// Reason: We are using an external array of size ‘N’ to store only one row.
let res = UniquePath2WithMazeObstacleSpaceOptimization(row, col, maze);

console.log(res);
