// Problem statement
// You are given an array 'arr' containing 'n' non-negative integers.

// Your task is to partition this array into two subsets such that the absolute difference between subset sums is minimum.

// You just need to find the minimum absolute difference considering any valid division of the array elements.

// Note:

// 1. Each array element should belong to exactly one of the subsets.

// 2. Subsets need not always be contiguous.
// For example, for the array : [1, 2, 3], some of the possible divisions are
//    a) {1,2} and {3}
//    b) {1,3} and {2}.

// 3. Subset-sum is the sum of all the elements in that subset.
// Example:
// Input: 'n' = 5, 'arr' = [3, 1, 5, 2, 8].

// Ouput: 1

// Explanation: We can partition the given array into {3, 1, 5} and {2, 8}.
// This will give us the minimum possible absolute difference i.e. (10 - 9 = 1).

function minSubsetSumDifferenceUtils(index, target, array, dp) {
  //Base cases
  if (index === 0) return array[0] === target;

  if (target === 0) return true;  // f(3,4) when target ===0, This shows that there exist subset element in the array that can form  my target
  if (dp[index][target] !== -1) return dp[index][target];
  let take =
    array[index] <= target
      ? array[index] +
        minSubsetSumDifferenceUtils(index - 1, target - array[index], array, dp)
      : false;

  let nottake = 0 + minSubsetSumDifferenceUtils(index - 1, target, array, dp);

  dp[index][target] = take || nottake;

  return dp[index][target];
}

function minSubsetSumDifference(array, n) {
  let totalSum = 0;
  let minimum = Infinity;
  for (let i = 0; i < n; i++) {
    totalSum += array[i];
  }

  let target = totalSum;
  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
  //let res =;

  for (let s1 = 0; s1 <= target / 2; s1++) {
    if (minSubsetSumDifferenceUtils(n - 1, s1, array, dp)) {
      let s2 = target - s1;
      minimum = Math.min(minimum, Math.abs(s2 - s1));
    }
  }
  return minimum;
}

const array = [1, 2, 3, 4];
const n = array.length;

// Complexity Analysis
// Time Complexity: O(N*totSum) +O(N) +O(N)

// Reason: There are two nested loops that account for O(N*totSum), at starting we are running a for loop to calculate totSum and at last a for loop to traverse the last row.

// Space Complexity: O(N*totSum) + O(N)

// Reason: We are using an external array of size ‘N * totSum’ and a stack space of O(N).
let result = minSubsetSumDifference(array, n);

console.log("The minimum absolute difference is:   ", +result);

console.log("Tabulation approach");

function minSubsetSumDifferenceTabUtil(index, target, array, dp) {
  if (array[0] <= target) {
    dp[0][target] = true;
  }

  for (let i = 0; i < index; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i < index; i++) {
    for (let k = 1; k <= target; k++) {
      let take = array[i] <= k ? array[i] + dp[i - 1][k - array[i]] : 0;
      let nottake = 0 + dp[i - 1][k];

      dp[i][k] = take || nottake;
    }
  }

  return dp[index - 1][target];
}

// minSubsetSumDifference with Tabulation approach

function minSubsetSumDifferenceTab(array, n) {
  let totalSum = 0;
  let min = Infinity;
  for (let i = 0; i < n; i++) {
    totalSum += array[i];
  }

  let target = totalSum;
  let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));

  for (let s1 = 0; s1 <= target / 2; s1++) {
    const diff = Math.abs(s1 - (target - s1));
    if (minSubsetSumDifferenceTabUtil(n, s1, array, dp)) {
      min = Math.min(min, diff);
    }
  }

  return min;
}


// Time Complexity: O(N*totSum) +O(N) +O(N)

// Reason: There are two nested loops that account for O(N*totSum), at starting we are running a for loop to calculate totSum, and at last a for loop to traverse the last row.

// Space Complexity: O(N*totSum)

// Reason: We are using an external array of size ‘N * totSum’. Stack Space is eliminated.
let res = minSubsetSumDifferenceTab(array, n);

console.log(res);

function minSubsetSumDifference(arr, n) {
    let totSum = 0;
  
    // Calculate the total sum of elements in the array
    for (let i = 0; i < n; i++) {
      totSum += arr[i];
    }
  
    // Initialize the previous array for dynamic programming
    const prev = new Array(totSum + 1).fill(false);
    prev[0] = true;
  
    // Initialize the first column of the dp array
    if (arr[0] <= totSum) {
      prev[arr[0]] = true;
    }
  
    // Fill the dp array using bottom-up dynamic programming
    for (let ind = 1; ind < n; ind++) {
      const cur = new Array(totSum + 1).fill(false);
      cur[0] = true;
      for (let target = 1; target <= totSum; target++) {
        const notTaken = prev[target];
  
        let taken = false;
        if (arr[ind] <= target) {
          taken = prev[target - arr[ind]];
        }
  
        cur[target] = notTaken || taken;
      }
      // Update 'prev' array with 'cur' for the next iteration
      for (let i = 0; i < prev.length; i++) {
        prev[i] = cur[i];
      }
    }
  
    let mini = 1e9;
    for (let i = 0; i <= totSum; i++) {
      if (prev[i] === true) {
        const diff = Math.abs(i - (totSum - i));
        mini = Math.min(mini, diff);
      }
    }
    return mini;
  }
  
  // Main function
  function main() {
    const arr = [1, 2, 3, 4];
    const n = arr.length;
  
    console.log("The minimum absolute difference is: " + minSubsetSumDifference(arr, n));
  }
  
  // Run the main function
  main();
