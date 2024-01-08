// We are given an array ‘ARR’ with N positive integers. We need to find if we can partition the array into two subsets such that the sum of elements of each subset is equal to the other.

// If we can partition, return true else return false.

function PartitionEqualSubsetSumUtils(index, target, array, dp) {
  if (target === 0) {
    return true;
  }

  if (index === 0) return array[0] === target;
  if (dp[index][target] !== -1) return dp[index][target];
  let take =
    array[index] <= target
      ? array[index] +
        PartitionEqualSubsetSumUtils(
          index - 1,
          target - array[index],
          array,
          dp
        )
      : false;
  let nottake = 0 + PartitionEqualSubsetSumUtils(index - 1, target, array, dp);

  dp[index][target] = take || nottake;
  return dp[index][target];
}

function PartitionEqualSubsetSum(array, n) {
  let totalSum = 0;

  // Calculate the total sum of elements in the array
  for (let i = 0; i < n; i++) {
    totalSum += array[i];
  }
  // If the total sum is odd, it cannot be partitioned into two equal subsets
  if (totalSum % 2 === 1) return false;
  else {
    let target = totalSum / 2;
    // Create a 2D boolean array to store results of subproblems (dynamic programming)
    let dp = Array.from(Array(n), () => Array(target + 1).fill(-1));
    return PartitionEqualSubsetSumUtils(n - 1, target, array, dp);
  }
}

const array = [2, 3, 3, 3, 4, 5];
const n = array.length;

// Time Complexity: O(N*K)
// Reason: There are N*K states therefore at max ‘N*K’ new problems will be solved.

// Space Complexity: O(N*K) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*K)).
let result = PartitionEqualSubsetSum(array, n);

if (result) {
  console.log("The Array can be partitioned into two equal subsets");
} else {
  console.log("The Array CANNOT  be partitioned into tow subsets");
}

function canPartition(n, arr) {
  let totSum = 0;

  // Calculate the total sum of elements in the array
  for (let i = 0; i < n; i++) {
    totSum += arr[i];
  }

  // If the total sum is odd, it cannot be partitioned into two equal subsets
  if (totSum % 2 === 1) return false;
  else {
    const k = totSum / 2;

    // Create a 2D boolean array to store results of subproblems (dynamic programming)
    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
      dp[i] = new Array(k + 1).fill(false);
    }

    // Initialize the first column of the dp array
    for (let i = 0; i < n; i++) {
      dp[i][0] = true;
    }

    // Initialize the first column of the dp array
    if (arr[0] <= k) {
      dp[0][arr[0]] = true;
    }

    // Fill the dp array using bottom-up dynamic programming
    for (let ind = 1; ind < n; ind++) {
      for (let target = 1; target <= k; target++) {
        const notTaken = dp[ind - 1][target];

        let taken = false;
        if (arr[ind] <= target) {
          taken = dp[ind - 1][target - arr[ind]];
        }

        dp[ind][target] = notTaken || taken;
      }
    }

    // The final cell dp[n-1][k] contains the result
    return dp[n - 1][k];
  }
}

// Main function

function main() {
  const arr = [2, 3, 3, 3, 4, 5];
  const n = arr.length;

  if (canPartition(n, arr)) {
    console.log("The Array can be partitioned into two equal subsets");
  } else {
    console.log("The Array cannot be partitioned into two equal subsets");
  }
}

// Run the main function
//  Complexity Analysis
// Time Complexity: O(N*K) +O(N)

// Reason: There are two nested loops that account for O(N*K) and at starting we are running a for loop to calculate totSum.

// Space Complexity: O(N*K)

// Reason: We are using an external array of size ‘N*K’. Stack Space is eliminated.
main();

function canPartition(n, arr) {
  let totSum = 0;

  // Calculate the total sum of elements in the array
  for (let i = 0; i < n; i++) {
    totSum += arr[i];
  }

  // If the total sum is odd, it cannot be partitioned into two equal subsets
  if (totSum % 2 === 1) return false;
  else {
    const k = totSum / 2;

    // Initialize the previous row (array) for dynamic programming
    let prev = new Array(k + 1).fill(false);
    prev[0] = true;

    // Initialize the first column of the dp array
    if (arr[0] <= k) {
      prev[arr[0]] = true;
    }

    // Fill the dp array using bottom-up dynamic programming
    for (let ind = 1; ind < n; ind++) {
      let cur = new Array(k + 1).fill(false);
      cur[0] = true;
      for (let target = 1; target <= k; target++) {
        const notTaken = prev[target];

        let taken = false;
        if (arr[ind] <= target) {
          taken = prev[target - arr[ind]];
        }

        cur[target] = notTaken || taken;
      }
      // Update the previous row (array) for the next iteration
      prev = cur;
    }

    // The final element of the 'prev' array (prev[k]) contains the result
    return prev[k];
  }
}

// Main function
function main() {
  const arr = [2, 3, 3, 3, 4, 5];
  const n = arr.length;

  if (canPartition(n, arr)) {
    console.log("The Array can be partitioned into two equal subsets");
  } else {
    console.log("The Array cannot be partitioned into two equal subsets");
  }
}

// Run the main function
//  Complexity Analysis
// Time Complexity: O(N*K) +O(N)

// Reason: There are two nested loops that account for O(N*K) and at starting we are running a for loop to calculate totSum.

// Space Complexity: O(K)

// Reason: We are using an external array of size ‘K+1’ to store only one row.
main();
