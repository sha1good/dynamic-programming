// Algorithm / Intuition
// Intuition:

// We need to minimize the cost incurred to cut the stick. Whenever we make a cut, we are changing the length of the stick which in turn decides the cost. Therefore the order in which we make the cuts changes the total cost. As discussed in DP-48 whenever the order of solving the problem comes into play, we can think in terms of Partition DP.

// Let us quickly revise the rules to solve a problem on partition dp.

// Start with the entire block/array and mark it with i,j.
// Try all partitions.
// Return the best possible answer of the two partitions (the answer that comes after dividing the problem into two subproblems and solving them recursively).
// Now let us go through these rules and apply them one by one to the MCM problem.

// Marking the array with i,j

// We are given a stick of size N and the CUTS array. Every element of the CUTS array represents the marking at which one cut needs to be made. When we make a cut, we are dividing the stick into two different parts.

// Ideally, we would want to place the i, and j pointers at both ends of the CUTS array and try to solve the problem recursively, which we will eventually do. But we need to modify the given array. We will first discuss the need for a modification and then we will learn about the exact modification required.

function minimumCostUtil(i, j, cuts) {
  if (i > j) return 0;

  let mini = Infinity;

  for (let index = i; index <= j; index++) {
    let cost =
      cuts[j + 1] -
      cuts[i - 1] +
      minimumCostUtil(i, index - 1, cuts) +
      minimumCostUtil(index + 1, j, cuts);
    mini = Math.min(mini, cost);
  }

  return mini;
}

function minimumCost(n, c, cuts) {
  // Modify the cuts array
  cuts.push(n);
  cuts.unshift(0);
  cuts.sort((a, b) => a - b);

  // Create a 2D DP array to store the minimum cost
  let dp = Array.from(new Array(c + 2), () => new Array(c + 2).fill(-1));

  return minimumCostUtil(1, c, cuts, dp);
}

// Main function
function main() {
  const cuts = [3, 5, 1, 4];
  const c = cuts.length;
  const n = 7;

  const result = minimumCost(n, c, cuts);
  console.log("The minimum cost incurred:", result);
}

// Call the main function
//Time Complexity: Exponential, for this recursion
main();

function minimumCostMemoUtil(i, j, cuts, dp) {
  // Base case
  if (i > j) return 0;

  let mini = Infinity;

  if (dp[i][j] !== -1) return dp[i][j];

  for (let index = i; index <= j; index++) {
    let cost =
      cuts[j + 1] -
      cuts[i - 1] +
      minimumCostMemoUtil(i, index - 1, cuts, dp) +
      minimumCostMemoUtil(index + 1, j, cuts, dp);
    mini = Math.min(cost, mini);
  }
  return (dp[i][j] = mini);
}

function minimumCostMemo(n, c, cuts) {
  // Modify the cuts array
  cuts.push(n);
  cuts.unshift(0);
  cuts.sort((a, b) => a - b);
  // Create a 2D DP array to store the minimum cost
  let dp = Array.from(new Array(c + 2), () => new Array(c + 2).fill(-1));

  return minimumCostMemoUtil(1, c, cuts, dp);
}

// Main function
function Ola() {
  const cuts = [3, 5, 1, 4];
  const c = cuts.length;
  const n = 7;

  const result = minimumCostMemo(n, c, cuts);
  console.log("The minimum cost incurred for Memo:", result);
}

// Call the main function
// Time Complexity: O(N*N*N)

// Reason: There are 2 variables i and j, therefore, N*N states and we explicitly run a loop inside the function which will run for N times, therefore at max ‘N*N*N’ new problems will be solved.

// Space Complexity: O(N*N) + O(N)

// Reason: We are using an auxiliary recursion stack space(O(N))and a 2D array ( O(N*N)).
Ola();

function minimumCostTabulationUtil(c, cuts, dp) {
  for (let i = c; i >= 1; i--) {
    for (j = 1; j <= c; j++) {
      // Skip invalid cases where i is greater than j
      if (i > j) continue;
      let mini = Infinity;

      for (let index = i; index <= j; index++) {
        let cost =
          cuts[j + 1] - cuts[i - 1] + dp[i][index - 1] + dp[index + 1][j];
        mini = Math.min(cost, mini);
      }
      dp[i][j] = mini;
    }
  }

  return dp[1][c];
}

function minimumCostTabulation(n, c, cuts) {
  // Modify the cuts array
  cuts.push(n);
  cuts.unshift(0);
  cuts.sort((a, b) => a - b);
  // Create a 2D DP array to store the minimum cost
  let dp = Array.from(new Array(c + 2), () => new Array(c + 2).fill(0));

  return minimumCostTabulationUtil(c, cuts, dp);
}

// Main function
function Tabulation() {
  const cuts = [3, 5, 1, 4];
  const c = cuts.length;
  const n = 7;

  const result = minimumCostTabulation(n, c, cuts);
  console.log("The minimum cost incurred for Tabulation:", result);
}

// Time Complexity: O(N*N*N)

// Reason: There are 2 variables i and j, therefore, N*N states and we explicitly run a loop inside the function which will run for N times, therefore at max ‘N*N*N’ new problems will be solved.

// Space Complexity: O(N*N) 

// Reason: We are using a 2D array ( O(N*N)).
Tabulation();
