// A thief wants to rob a store. He is carrying a bag of capacity W.
// The store has ‘n’ items. Its weight is given by the ‘wt’ array and its value by the ‘val’ array.
// He can either include an item in its knapsack or exclude it but can’t partially have it as a fraction.
// We need to find the maximum value of items that the thief can steal.

function KnapsackUtil(index, weight, value, bagWeight, dp) {
  // Base case: If there are no items (ind is 0), return the value of the first item if it can be included, else return 0
  if (index === 0) {
    if (weight[0] <= bagWeight) {
      return value[0];
    } else {
      return 0;
    }
  }

  // If the result is already computed, return it
  if (dp[index][bagWeight] !== -1) return dp[index][bagWeight];

  // Calculate the maximum value by either not taking the current item or taking it
  let notTaken = 0 + KnapsackUtil(index - 1, weight, value, bagWeight, dp);
  //Check if you can take
  let taken = Number.MIN_SAFE_INTEGER;
  taken =
    weight[index] <= bagWeight
      ? value[index] +
        KnapsackUtil(index - 1, weight, value, bagWeight - weight[index], dp)
      : 0;

  // Store the result in the dp table and return it
  return (dp[index][bagWeight] = Math.max(taken, notTaken));
}

function Knapsack(index, weight, value, bagWeight) {
  // Create a 2D array for dynamic programming
  let dp = Array.from(Array(index), () => Array(bagWeight + 1).fill(-1));
  console.log(dp);

  return KnapsackUtil(index - 1, weight, value, bagWeight, dp);
}

const wt = [1, 2, 4, 5];
const val = [5, 4, 8, 6];
const W = 5;
const n = wt.length;

// Time Complexity: O(N*W)

// Reason: There are N*W states therefore at max ‘N*W’ new problems will be solved.

// Space Complexity: O(N*W) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*W)).
let result = Knapsack(n, wt, val, W);

console.log(result);

function KnapsackUtilTab(index, weight, value, bagWeight, dp) {
  // Base Condition: Fill the first row of 'dp' for the first item
//   for (let i = weight[0]; i <= bagWeight; i++) {
//     dp[0][i] = value[0];
//   }
   
      //OR

      for (let i = bagWeight; i >= 0; i--) {
        dp[0][i] = value[0];
      }

  // Fill the 'dp' array using bottom-up dynamic programming
  for (let i = 1; i <= index; i++) {
    for (let k = 0; k <= bagWeight; k++) {
      let taken = Number.MIN_SAFE_INTEGER;
      let notTaken = 0 + dp[i - 1][k];
      if (weight[i] <= k) {
        taken = value[i] + dp[i - 1][k - weight[i]];
      }
      dp[i][k] = Math.max(notTaken, taken);
    }
  }

  return dp[index][bagWeight];
}

function KnapsackTab(index, weight, value, bagWeight) {
  // Create a 2D array for dynamic programming
  let dp = Array.from(Array(index), () => Array(bagWeight + 1).fill(-1));
  console.log(dp);

  return KnapsackUtilTab(index - 1, weight, value, bagWeight, dp);
}

// Time Complexity: O(N*W)

// Reason: There are two nested loops

// Space Complexity: O(N*W)

// Reason: We are using an external array of size ‘N*W’. Stack Space is eliminated.
let res = KnapsackTab(n, wt, val, W);

console.log(res);

//Space Optimiztion
function KnapsackSpaceOptimization(index, weight, value, bagWeight) {
  // Create a 2D array for dynamic programming
  let previous = Array(bagWeight + 1).fill(-1);

  let current = Array(bagWeight + 1).fill(-1);

  // Base Condition: Fill the first row of 'dp' for the first item
//   for (let i = weight[0]; i <= bagWeight; i++) {
//     previous[i] = value[0];
//   }
 
          // OR
  for (let i = bagWeight; i >= 0; i--) {
    previous[i] = value[0];
  }

  // Fill the 'dp' array using bottom-up dynamic programming
  for (let i = 1; i <= index; i++) {
    for (let k = 0; k <= bagWeight; k++) {
      let taken = Number.MIN_SAFE_INTEGER;
      let notTaken = 0 + previous[k];
      if (weight[i] <= k) {
        taken = value[i] + previous[k - weight[i]];
      }
      current[k] = Math.max(notTaken, taken);
    }
    previous[i] = current[i];
  }

  return previous[bagWeight];
}

// Time Complexity: O(N*W)

// Reason: There are two nested loops

// Space Complexity: O(W)

// Reason: Reason: We are using an external array of size ‘W+1’ to store only one row.
let rsult = KnapsackSpaceOptimization(n, wt, val, W);

console.log(res);
