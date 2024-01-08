// A thief wants to rob a store. He is carrying a bag of capacity W.
// The store has ‘n’ items of infinite supply. Its weight is given by the ‘wt’ array and its value by the ‘val’ array.
// He can either include an item in its knapsack or exclude it but can’t partially have it as a fraction.
// We need to find the maximum value of items that the thief can steal.
// He can take a single item any number of times he wants and put it in his knapsack.

function UnboundedKnapsackUtils(index, weight, value, bagWeight, dp) {
  // Base case: If we have reached the first item in the array
  if (index === 0) {
    if (weight[0] <= bagWeight) {
      // Calculate the maximum value for this item
      return Math.floor(bagWeight / weight[0]) * value[0];
    } else {
      return 0;
    }
  }

  // If the result for this combination of 'ind' and 'W' has already been calculated, return it
  if (dp[index][bagWeight] !== -1) return dp[index][bagWeight];
  // Initialize variables to store results
  let notTaken =
    0 + UnboundedKnapsackUtils(index - 1, weight, value, bagWeight, dp);
  let taken = -Infinity;

  if (weight[index] <= bagWeight) {
    taken =
      value[index] +
      UnboundedKnapsackUtils(
        index,
        weight,
        value,
        bagWeight - weight[index],
        dp
      );
  }

  // Store and return the result
  return (dp[index][bagWeight] = Math.max(taken, notTaken));
}

function UnboundedKnapsack(n, weight, value, bagWeight) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
  let dp = Array.from({ length: n }, () => Array(bagWeight + 1).fill(-1));
  // Define a recursive utility function to calculate the maximum value
  return UnboundedKnapsackUtils(n - 1, weight, value, bagWeight, dp);
}

const weight = [2, 4, 6];
const value = [5, 11, 13];
const bagWeight = 10;
const n = weight.length;

// Time Complexity: O(N*W)

// Reason: There are N*W states therefore at max ‘N*W’ new problems will be solved.

// Space Complexity: O(N*W) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*W)).
let result = UnboundedKnapsack(n, weight, value, bagWeight);

console.log(result);

console.log("=============== Tabulation  Approach =======================");

function UnboundedKnapsackTabulationApproachUtil(
  index,
  weight,
  value,
  bagWeight,
  dp
) {
  for (let bag = 0; bag <= bagWeight; bag++) {
    dp[0][bag] = Math.floor(bag / weight[0]) * value[0];
  }

  for (let i = 1; i <= index; i++) {
    for (let k = 0; k <= bagWeight; k++) {
      let notTaken = 0 + dp[i - 1][k];
      let taken = -Infinity;
      if (weight[i] <= k) {
        taken = value[i] + dp[i][k - weight[i]];
      }
      dp[i][k] = Math.max(notTaken, taken);
    }
  }
  return dp[index][bagWeight];
}

function UnboundedKnapsackTabulationApproach(n, weight, value, bagWeight) {
  let dp = Array.from(Array(n), () => Array(bagWeight + 1).fill(0));
  return UnboundedKnapsackTabulationApproachUtil(
    n - 1,
    weight,
    value,
    bagWeight,
    dp
  );
}

// Time Complexity: O(N*W)

// Reason: There are two nested loops

// Space Complexity: O(N*W)

// Reason: We are using an external array of size ‘N*W’. Stack Space is eliminated.
let res = UnboundedKnapsackTabulationApproach(n, weight, value, bagWeight);

console.log(res);

console.log(
  "=============== Space Optimzation Approach ======================="
);

function UnboundedKnapsackSpaceOptimzationApproachUtil(
  index,
  weight,
  value,
  bagWeight
) {
  let previous = Array(bagWeight + 1).fill(-1);
  let current = Array(bagWeight + 1).fill(-1);

  for (let bag = 0; bag <= bagWeight; bag++) {
    previous[bag] = Math.floor(bag / weight[0]) * value[0];
  }
  for (let i = 1; i <= index; i++) {
    for (let k = 0; k <= bagWeight; k++) {
      let notTaken = 0 + previous[k];
      let taken = -Infinity;
      if (weight[i] <= k) {
        taken = value[i] + current[k - weight[i]];
      }
      current[k] = Math.max(notTaken, taken);
    }

    previous = current;
  }
  return previous[bagWeight];
}

function UnboundedKnapsackSpaceOptimzationApproach(
  n,
  weight,
  value,
  bagWeight
) {
  return UnboundedKnapsackSpaceOptimzationApproachUtil(
    n - 1,
    weight,
    value,
    bagWeight
  );
}

// Time Complexity: O(N*W)

// Reason: There are two nested loops

// Space Complexity: O(W)

// Reason: We are using an external array of size ‘W’. .
let rsult = UnboundedKnapsackSpaceOptimzationApproach(
  n,
  weight,
  value,
  bagWeight
);

console.log(rsult);
