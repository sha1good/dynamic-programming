// Target Sum (DP – 21)
// Problem Link: Target Sum

// Problem Description:

// We are given an array ‘ARR’ of size ‘N’ and a number ‘Target’.
// Our task is to build an expression from the given array where we can place a ‘+’ or ‘-’ sign in front of an integer.
// We want to place a sign in front of every integer of the array and get our required target.
// We need to count the number of ways in which we can achieve our required target.

const mod = 1e9 + 7;
function countPartitionsUtil(ind, target, arr, dp) {
  // Base cases
  if (ind === 0) {
    if (target === 0 && arr[0] === 0) return 2;
    if (target === 0 || target === arr[0]) return 1;
    return 0;
  }

  // If the result for this combination of 'ind' and 'target' has already been calculated, return it
  if (dp[ind][target] !== -1) return dp[ind][target];

  // Recursive cases
  const notTaken = countPartitionsUtil(ind - 1, target, arr, dp);

  let taken = 0;
  if (arr[ind] <= target)
    taken = countPartitionsUtil(ind - 1, target - arr[ind], arr, dp);

  // Store and return the result
  return (dp[ind][target] = notTaken + taken);
}

// Define a function to find the number of ways to reach the 'target' sum
function targetSum(n, target, arr) {
  // Calculate the total sum of the array elements
  let totSum = 0;
  for (let i = 0; i < arr.length; i++) {
    totSum += arr[i];
  }

  // Checking for edge cases
  if (totSum - target < 0) return 0;
  if ((totSum - target) % 2 === 1) return 0;

  // Calculate the second subset sum
  let s2 = (totSum - target) / 2;

  // Create a 2D array to store dynamic programming results, initialized with -1
  const dp = Array.from({ length: n }, () => Array(s2 + 1).fill(-1));

  // Call the countPartitionsUtil function to calculate the result
  return countPartitionsUtil(n - 1, s2, arr, dp);
}

// Main function
// Time Complexity: O(N*K)

// Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved.

// Space Complexity: O(N*K) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
function main() {
  const arr = [1, 2, 3, 1];
  const target = 3;
  const n = arr.length;

  // Call the targetSum function and print the result
  console.log("The number of ways found is " + targetSum(n, target, arr));
}

// Call the main function to start the program
main();

// Define a function to find the number of ways to achieve the 'tar' target sum
function findWays(num, tar) {
  const n = num.length;

  // Create a 2D array 'dp' to store dynamic programming results, initialized with 0
  const dp = Array.from({ length: n }, () => Array(tar + 1).fill(0));

  if (num[0] === 0) dp[0][0] = 2; // 2 cases - pick and not pick
  else dp[0][0] = 1; // 1 case - not pick

  if (num[0] !== 0 && num[0] <= tar) dp[0][num[0]] = 1; // 1 case - pick

  for (let ind = 1; ind < n; ind++) {
    for (let target = 0; target <= tar; target++) {
      const notTaken = dp[ind - 1][target];

      let taken = 0;
      if (num[ind] <= target) taken = dp[ind - 1][target - num[ind]];

      dp[ind][target] = (notTaken + taken) % mod;
    }
  }

  return dp[n - 1][tar];
}

// Define a function to find the number of ways to achieve the 'target' sum using elements from 'arr'
function targetSum(n, target, arr) {
  let totSum = 0;
  for (let i = 0; i < n; i++) {
    totSum += arr[i];
  }

  // Checking for edge cases
  if (totSum - target < 0 || (totSum - target) % 2 !== 0) return 0;

  // Calculate the second subset sum
  const s2 = (totSum - target) / 2;

  // Call the findWays function to calculate the result
  return findWays(arr, s2);
}

// Main function
// Time Complexity: O(N*K)
// Reason: There are two nested loops
// Space Complexity: O(N*K)
// Reason: We are using an external array of size ‘N*K’. Stack Space is eliminated.

function main() {
  const arr = [1, 2, 3, 1];
  const target = 3;
  const n = arr.length;

  // Call the targetSum function and print the result
  console.log("The number of ways found is " + targetSum(n, target, arr));
}

// Call the main function to start the program
main();

// Define a function to find the number of ways to achieve the 'tar' target sum
function findWays(num, tar) {
  const n = num.length;

  // Initialize an array 'prev' to store dynamic programming results, initialized with 0
  let prev = new Array(tar + 1).fill(0);

  if (num[0] === 0) prev[0] = 2; // 2 cases - pick and not pick
  else prev[0] = 1; // 1 case - not pick

  if (num[0] !== 0 && num[0] <= tar) prev[num[0]] = 1; // 1 case - pick

  for (let ind = 1; ind < n; ind++) {
    // Initialize an array 'cur' for the current iteration
    let cur = new Array(tar + 1).fill(0);
    for (let target = 0; target <= tar; target++) {
      const notTaken = prev[target];

      let taken = 0;
      if (num[ind] <= target) taken = prev[target - num[ind]];

      cur[target] = (notTaken + taken) % mod;
    }
    // Update 'prev' to be the same as 'cur' for the next iteration
    prev = [...cur];
  }

  return prev[tar];
}

// Define a function to find the number of ways to achieve the 'target' sum using elements from 'arr'
function targetSum(n, target, arr) {
  let totSum = 0;
  for (let i = 0; i < n; i++) {
    totSum += arr[i];
  }

  // Checking for edge cases
  if (totSum - target < 0 || (totSum - target) % 2 !== 0) return 0;

  // Calculate the second subset sum
  const s2 = (totSum - target) / 2;

  // Call the findWays function to calculate the result
  return findWays(arr, s2);
}

// Main function
// Time Complexity: O(N*K)
// Reason: There are three nested loops
// Space Complexity: O(K)
// Reason: We are using an external array of size ‘K+1’ to store only one row.

function main() {
  const arr = [1, 2, 3, 1];
  const n = arr.length;
  const target = 3;

  // Call the targetSum function and print the result
  console.log("The number of subsets found is " + targetSum(n, target, arr));
}

// Call the main function to start the program
main();
