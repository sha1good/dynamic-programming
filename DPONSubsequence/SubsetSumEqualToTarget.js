function SubsetSumEqualToTargetUtil(index, target, array, dp) {
  if (target === 0) return true;
  if (index === 0) return target === array[0];
  if (dp[index][target] !== -1) return dp[index][target];
  let take = false;
  let nottake = false;

  if (array[index] <= target) {
    take =
      array[index] +
      SubsetSumEqualToTargetUtil(index - 1, target - array[index], array, dp);
  }
  nottake = 0 + SubsetSumEqualToTargetUtil(index - 1, target, array, dp);
  dp[index][target] = take || nottake;
  return dp[index][target];
}

function SubsetSumEqualToTarget(array, target) {
  let n = array.length;

  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
  //console.log(dp);
  return SubsetSumEqualToTargetUtil(n - 1, target, array, dp);
}

let array = [2, 3, 1, 1];
let target = 4;

// Time Complexity: O(N*K)
// Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved.

// Space Complexity: O(N*K) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
let result = SubsetSumEqualToTarget(array, target);

if (result) {
  console.log("The target is found in the array");
} else {
  console.log("The target is NOT found in the array");
}

function SubsetSumEqualToTargetTabApproachUtil(index, target, array, dp) {
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
      dp[i][k] = nottake || take;
    }
  }

  return dp[index - 1][target];
}

function SubsetSumEqualToTargetTabApproach(array, target) {
  let n = array.length;

  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
  return SubsetSumEqualToTargetTabApproachUtil(n, target, array, dp);
}

// Time Complexity: O(N*K)

// Reason: There are two nested loops

// Space Complexity: O(N*K)

// Reason: We are using an external array of size ‘N*K’. Stack Space is eliminated.
let rsult = SubsetSumEqualToTargetTabApproach(array, target);

if (rsult) {
  console.log("The target is found in the array tab");
} else {
  console.log("The target is NOT found in the array Tab");
}

function SubsetSumEqualToTargetTabApproachSpaceOptim(array, target) {
  // Initialize a boolean array 'prev' to store the previous row of the DP table
  let previous = Array(target + 1).fill(-1);
  let current = Array(target + 1).fill(-1);

  // Base case: If the target is 0, an empty subset is always a valid solution
  previous[0] = true;

  // Initialize the first row based on the value of the first element in 'arr'
  current[0] = true;

  for (let i = 1; i < array.length; i++) {
    for (let k = 1; k <= target; k++) {
      let nottake = 0 + previous[k];
      let take = array[i] <= k ? array[i] + previous[k - array[i]] : false;
      current[k] = nottake || take;
    }
  }

  return previous[target];
}
// Time Complexity: O(N*K)

// Reason: There are three nested loops

// Space Complexity: O(K)

// Reason: We are using an external array of size ‘K+1’ to store only one row.
let res = SubsetSumEqualToTargetTabApproachSpaceOptim(array, target);

if (res) {
  console.log("The target is found in the array Space Optimized");
} else {
  console.log("The target is NOT found in the array Space Optimized");
}
