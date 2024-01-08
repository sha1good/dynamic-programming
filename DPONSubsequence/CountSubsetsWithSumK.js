//We are given an array ‘ARR’ with N positive integers and an integer K. We need to find the number of subsets whose sum is equal to K.

function CountSubsetsWithSumKUtil(index, array, target, dp) {
  if (target === 0) return 1;
  if (index === 0) return array[0] === target ? 1 : 0;

  if (dp[index][target] !== -1) return dp[index][target];

  let take = 0;
  if (array[index] <= target) {
    take = CountSubsetsWithSumKUtil(
      index - 1,
      array,
      target - array[index],
      dp
    );
  }

  let nottake = CountSubsetsWithSumKUtil(index - 1, array, target, dp);

  return (dp[index][target] = take + nottake);
}

function CountSubsetsWithSumK(numArray, n, target) {
  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
  console.log(dp);

  return CountSubsetsWithSumKUtil(n - 1, numArray, target, dp);
}

let array = [1, 2, 2, 3];
let n = array.length;

let target = 3;

// Complexity Analysis
// Time Complexity: O(N*K)

// Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved.

// Space Complexity: O(N*K) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
console.log(
  "The total count of the result is: " + CountSubsetsWithSumK(array, n, target)
);

function CountSubsetSumEqualToTargetTabApproachUtil(index, target, array, dp) {
  // Initialize the first row based on the value of the first element in 'arr'

  if (array[0] <= target) {
    dp[0][target] = true;
  }

  // Base case: If the target is 0, an empty subset is always a valid solution
  for (let i = 0; i < array.length; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i < index; i++) {
    for (let k = 1; k <= target; k++) {
      let nottake = 0 + dp[i - i][k];
      let take = array[i] <= k ? array[i] + dp[i - 1][k - array[i]] : false;
      dp[i][k] = nottake + take;
    }
  }

  return dp[index - 1][target];
}

function CountSubsetSumEqualToTargetTabApproach(array, target) {
  let n = array.length;

  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
  return CountSubsetSumEqualToTargetTabApproachUtil(n, target, array, dp);
}

// Complexity Analysis
// Time Complexity: O(N*K)

// Reason: There are two nested loops

// Space Complexity: O(N*K)

// Reason: We are using an external array of size ‘N*K’. Stack Space is eliminated.
console.log(
  "The total count of the result is: " +
    CountSubsetSumEqualToTargetTabApproach(array, n, target)
);

function CountSubsetSumEqualToTargetTabApproachSpaceOptim(array, target) {
  // Initialize a boolean array 'prev' to store the previous row of the DP table
  let previous = Array(target + 1).fill(-1);
  let current = Array(target + 1).fill(-1);

  // Base case: If the target is 0, an empty subset is always a valid solution
  previous[0] = 1;

  // Initialize the first row based on the value of the first element in 'arr'
  current[0] = 1;

  for (let i = 1; i < array.length; i++) {
    for (let k = 1; k <= target; k++) {
      let nottake = 0 + previous[k];
      let take = array[i] <= k ? array[i] + previous[k - array[i]] : false;
      current[k] = nottake + take;
    }
    previous[i] = current[i];
  }

  return previous[target];
}
// Time Complexity: O(N*K)

// Reason: There are three nested loops

// Space Complexity: O(K)

// Reason: We are using an external array of size ‘K+1’ to store only one row.
// Time Complexity: O(N*K)

// Reason: There are two nested loops

// Space Complexity: O(K)

// Reason: We are using an external array of size ‘K+1’ to store only one row.
let res = CountSubsetSumEqualToTargetTabApproachSpaceOptim(array, target);
console.log("The total count of the result is: " + res);
