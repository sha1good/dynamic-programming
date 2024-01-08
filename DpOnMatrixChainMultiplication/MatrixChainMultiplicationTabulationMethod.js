function MatrixChainMultiplicationTabulationMethod(n, array) {
  // Create a DP table to store the minimum number of operations
  let dp = new Array(n + 1).fill(null).map(() => Array(n).fill(-1));
  // Initialize the diagonal elements of the DP table to 0

  for (let i = 0; i < n; i++) {
    dp[i][i] = 0;
  }

  // Loop for the length of the chain
  for (let i = n - 1; i >= 1; i--) {
    for (let j = i + 1; j < n; j++) {
      let minimum = Infinity;

      for (let k = i; k <= j - 1; k++) {
        let steps =
          array[i - 1] * array[k] * array[j] + dp[i][k] + dp[k + 1][j];
        minimum = Math.min(minimum, steps);
      }
      dp[i][j] = minimum;
    }
  }

  return dp[1][n - 1];
}

function main() {
  let array = [10, 20, 30, 40, 50];
  let n = array.length;

  let result = MatrixChainMultiplicationTabulationMethod(n, array);

  console.log("The minimum number of operations is, ", result);
}

main();
