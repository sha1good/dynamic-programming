// Count Partitions with Given Difference (DP – 18)
// Problem Statement:  Count Partitions with Given Difference

// This article will be divided into two parts:

// First, we will discuss an extra edge case of the problem discussed in Count Subsets with Sum K, and then,
// we will discuss the problem for this article: Partitions with Given Difference.

let mod = 1e9 + 7;
function CountPartitionEqualSubsetSumEqualGivenDifferenceUtils(
  index,
  target,
  array,
  dp
) {
  if (target === 0) {
    return 1;
  }

  if (index === 0) {
    if (target === 0 && array[0] === 0) return 2;
    if (target === 0 || target === array[0]) return 1;
    return 0;
  }
  if (dp[index][target] !== -1) return dp[index][target];
  let take =
    array[index] <= target
      ? CountPartitionEqualSubsetSumEqualGivenDifferenceUtils(
          index - 1,
          target - array[index],
          array,
          dp
        )
      : 0;
  let nottake = CountPartitionEqualSubsetSumEqualGivenDifferenceUtils(
    index - 1,
    target,
    array,
    dp
  );

  return (dp[index][target] = (take + nottake) % mod);
}

function CountPartitionEqualSubsetSumEqualGivenDifference(
  array,
  n,
  difference
) {
  let totalSum = 0;

  // Calculate the total sum of elements in the array
  for (let i = 0; i < n; i++) {
    totalSum += array[i];
  }
  //Checking Edge Cases if the totalSum - difference is -1 or is odd
  if (totalSum - difference < 0) return 0;
  if ((totalSum - difference) % 2 === 1) return 0;
  let target = (totalSum - difference) / 2;

  // Create a 2D boolean array to store results of subproblems (dynamic programming)
  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
  //console.log(dp);
  return CountPartitionEqualSubsetSumEqualGivenDifferenceUtils(
    n - 1,
    target,
    array,
    dp
  );
}

let array = [5, 2, 6, 4];
let difference = 3;

let n = array.length;

let result = CountPartitionEqualSubsetSumEqualGivenDifference(
  array,
  n,
  difference
);
// Time Complexity: O(N*K)

// Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved.

// Space Complexity: O(N*K) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
console.log(result);

console.log("Tabulation Approach");

function CountPartitionEqualSubsetSumEqualGivenDifferenceTabUtils(
  index,
  target,
  array,
  dp
) {
  if (array[0] === 0) dp[0][0] = 2; // 2 cases -pick and not pick
  else dp[0][0] = 1; // 1 case - not pick
  if (array[0] != 0 && array[0] <= target) dp[0][array[0]] = 1; // 1 case -pick

  for (let i = 1; i <= index; i++) {
    for (let tar = 0; tar <= target; tar++) {
      let notTaken = dp[i - 1][tar];

      let taken = 0;
      if (array[i] <= tar) taken = dp[i - 1][tar - array[i]];

      dp[i][tar] = (notTaken + taken) % mod;
    }
  }
  return dp[index][target];
}

function CountPartitionEqualSubsetSumEqualGivenDifferenceTabApproach(
  array,
  n,
  difference
) {
  let totalSum = 0;

  // Calculate the total sum of elements in the array
  for (let i = 0; i < n; i++) {
    totalSum += array[i];
  }
  //Checking Edge Cases if the totalSum - difference is -1 or is odd
  if (totalSum - difference < 0) return 0;
  if ((totalSum - difference) % 2 === 1) return 0;
  let target = (totalSum - difference) / 2;

  // Create a 2D boolean array to store results of subproblems (dynamic programming)
  let dp = Array.from(Array(n), () => Array(target + 1).fill(0));
  //console.log(dp);
  return CountPartitionEqualSubsetSumEqualGivenDifferenceTabUtils(
    n - 1,
    target,
    array,
    dp
  );
}

// The number of subsets found are 1

// Time Complexity: O(N*K)

// Reason: There are two nested loops

// Space Complexity: O(N*K)

// Reason: We are using an external array of size ‘N*K’. Stack Space is eliminated.
let res = CountPartitionEqualSubsetSumEqualGivenDifferenceTabApproach(
  array,
  n,
  difference
);

console.log(res);

console.log(" Optimal solution  with space optimization");

function findWays(num, tar) {
  const n = num.length;
  let prev = new Array(tar + 1).fill(0);

  if (num[0] === 0) prev[0] = 2; // 2 cases - pick and not pick
  else prev[0] = 1; // 1 case - not pick

  if (num[0] !== 0 && num[0] <= tar) prev[num[0]] = 1; // 1 case - pick

  for (let ind = 1; ind < n; ind++) {
    let cur = new Array(tar + 1).fill(0);
    for (let target = 0; target <= tar; target++) {
      const notTaken = prev[target];

      let taken = 0;
      if (num[ind] <= target) taken = prev[target - num[ind]];

      cur[target] = (notTaken + taken) % mod;
    }
    prev = cur;
  }
  return prev[tar];
}

function countPartitions(n, d, arr) {
  let totSum = 0;
  for (let i = 0; i < n; i++) {
    totSum += arr[i];
  }

  // Checking for edge cases
  if (totSum - d < 0 || (totSum - d) % 2 === 1) return 0;

  return findWays(arr, (totSum - d) / 2);
}

console.log("The number of subsets found are " + countPartitions(n, difference, array));
