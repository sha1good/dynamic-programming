function TriangleFixedStartingPointVariableEndingPointUtil(
  row,
  col,
  n,
  triangle,
  dp
) {
  // If we are at the last row, return the value in the triangle of that row index and that column

  if (row === n - 1) return triangle[row][col];

  // If the result is already computed, return it
  if (dp[row][col] !== -1) return dp[row][col];
  // Calculate the minimum path sum by moving down and diagonally
  let down =
    triangle[row][col] +
    TriangleFixedStartingPointVariableEndingPointUtil(
      row + 1,
      col,
      n,
      triangle,
      dp
    );
  let diagonal =
    triangle[row][col] +
    TriangleFixedStartingPointVariableEndingPointUtil(
      row + 1,
      col + 1,
      n,
      triangle,
      dp
    );

  // Store the result in the DP array and return it
  dp[row][col] = Math.min(down, diagonal);

  return dp[row][col];
}

function TriangleFixedStartingPointVariableEndingPoint(n, triangle) {
  // Initialize the DP array with -1 values
  let dp = Array.from(Array(n), () => Array(n).fill(-1));
  //const dp = new Array(n).fill().map(() => new Array(n).fill(-1));

  return TriangleFixedStartingPointVariableEndingPointUtil(
    0,
    0,
    n,
    triangle,
    dp
  );
}

let triangle = [[1], [2, 3], [3, 6, 7], [8, 9, 6, 10]];

let n = triangle.length;

// Complexity Analysis
// Time Complexity: O(N*N)

// Reason: There are two nested loops

// Space Complexity: O(N*N)

// Reason: We are using an external array of size ‘N*N’. The stack space will be eliminated.
let result = TriangleFixedStartingPointVariableEndingPoint(n, triangle);

console.log(result);

console.log("TriangleFixedStartingPointVariableEndingPointTabAppraoch");

function TriangleFixedStartingPointVariableEndingPointTabUtil(n, triangle, dp) {
  // Initialize the bottom row of the DP array with the values from the triangle since the value of col could be j  or j+ 1

  for (let j = 0; j < n; j++) {
    dp[n - 1][j] = triangle[n - 1][j];
  }
  // Start from the second-to-last row and work upwards
  for (let row = n - 2; row >= 0; row--) {
    for (let col = row; col >= 0; col--) {
      // Calculate the minimum path sum by considering the down and diagonal moves
      let down = triangle[row][col] + dp[row + 1][col];
      let diagonal = triangle[row][col] + dp[row + 1][col + 1];

      dp[row][col] = Math.min(down, diagonal);
    }
  }
  // The minimum path sum will be stored in the top-left corner of the DP array
  return dp[0][0];
}

function TriangleFixedStartingPointVariableEndingPointTabAppraoch(n, triangle) {
  let dp = Array.from(Array(n), () => Array(n).fill(-1));

  return TriangleFixedStartingPointVariableEndingPointTabUtil(n, triangle, dp);
}

let rsult = TriangleFixedStartingPointVariableEndingPointTabAppraoch(
  n,
  triangle
);

console.log(rsult);

console.log("Optimization Approach");

function TriangleFixedStartingPointVariableEndingPointOptimal(n, triangle) {
  // Initialize two arrays:  previous and temp arraya
  let prev = Array(n).fill(0);
  let temp = Array(n).fill(0);

  // Initialize the bottom row of the front array with the values from the triangle
  for (let j = 0; j < n; j++) {
    prev[j] = triangle[n - 1][j];
  }

  // Start from the second-to-last row and work upwards
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i; j >= 0; j--) {
      // Calculate the minimum path sum by considering the down and diagonal moves
      let down = prev[j] + triangle[i][j];
      let diagonal = prev[j + 1] + triangle[i][j];

      temp[j] = Math.min(down, diagonal);
    }
    // Update the previous array with the values from the current temp array
    prev = temp.slice(); //  [...temp]
  }
  /// The minimum path sum will be stored in the first element of the previous array
  return prev[0];
}


// Complexity Analysis
// Time Complexity: O(N*N)

// Reason: There are two nested loops

// Space Complexity: O(N)

// Reason: We are using an external array of size ‘N’ to store only one row.
let res = TriangleFixedStartingPointVariableEndingPointOptimal(n, triangle);
console.log(res);
