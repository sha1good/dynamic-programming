// Problem statement
// Given a chain of matrices A1, A2, A3,.....An,
// you have to figure out the most efficient way to multiply these matrices.
// In other words, determine where to place parentheses to minimize the number of multiplications.

// You will be given an array p[] of size n + 1. Dimension of matrix Ai is p[i - 1]*p[i].
// You need to find minimum number of multiplications needed to multiply the chain.

//Partition Dp is when  a problem can be solved in different patterns
// Rules to solve the problem of partition DP:

// Start with the entire block/array and mark it with i,j. We need to find the value of f(i,j).
// Try all partitions.
// Run the best possible answer of the two partitions
// ( answer that comes after dividing the problem into two subproblems and solving them recursively).

function MatrixChainMultiplicationUtil(i, j, array, dp) {
  //Base case
  if (i === j) {
    return 0;
  }

  if (dp[i][j] !== -1) return dp[i][j];
  let minimum = Infinity;

  for (let k = i; k <= j - 1; k++) {
    let steps =
      array[i - 1] * array[k] * array[j] +
      MatrixChainMultiplicationUtil(i, k, array, dp) +
      MatrixChainMultiplicationUtil(k + 1, j, array, dp);
    minimum = Math.min(minimum, steps);
  }
  return minimum;
}

function MatrixChainMultiplication(n, array) {
  // Declare a 2D matrix
  let dp = new Array(n + 1).fill(null).map(() => Array(n).fill(-1));
  let i = 1;
  let j = n - 1;
  return MatrixChainMultiplicationUtil(i, j, array, dp);
}

function main() {
  let array = [10, 20, 30, 40, 50];
  let n = array.length;

  let result = MatrixChainMultiplication(n, array);

  console.log("The minimum number of operations is, ", result);
}


// The minimum number of operations is 38000

// Time Complexity: O(N*N*N)

// Reason: There are N*N states and we explicitly run a loop inside the function which will run for N times, therefore at max ‘N*N*N’ new problems will be solved.

// Space Complexity: O(N*N) + O(N)

// Reason: We are using an auxiliary recursion stack space(O(N))and a 2D array ( O(N*N)).
main();
