// We are given a target sum of ‘X’ and ‘N’ distinct numbers denoting the coin denominations.
// We need to tell the minimum number of coins required to reach the target sum.
// We can pick a coin denomination for any number of times we want.

function MinimumCoinsUtils(index, coins, target, dp) {
  // Base case: If the index is 0, check if T is divisible by arr[0]
  if (index === 0) {
    if (target % coins[0] === 0) {
      return target / coins[0];
    } else {
      return Infinity;
      //  Return Infinity here because if you return 0, your mini will taken as 0
    }
  }

  // Use Infinity to represent an impossible case
  if (target === 0 && index !== 0) {
    return Infinity;
  }

  // If the result for this combination of 'ind' and 'T' has already been calculated, return it
  if (dp[index][target] !== -1) return dp[index][target];

  // Initialize variables to store results
  let nottake = 0 + MinimumCoinsUtils(index - 1, coins, target, dp);
  let take = Infinity;

  // If the current element is less than or equal to 'T', consider taking it
  if (coins[index] <= target) {
    take = 1 + MinimumCoinsUtils(index, coins, target - coins[index], dp);
  }

  // If it's impossible to reach the target, return -1
  if (dp[index][target] === Infinity) return -1;

  // Store the minimum result and return it
  return (dp[index][target] = Math.min(take, nottake));
}

function MinimumCoins(coins, target) {
  let n = coins.length;

  // Create a 2D array to store dynamic programming results, initialized with -1
  let dp = Array.from({ length: n }, () => Array(target + 1).fill(-1));
  //console.log(dp);

  // Helper function for dynamic programming
  return MinimumCoinsUtils(n - 1, coins, target, dp);
}

const arr = [1, 2, 3];
const T = 7;

// Time Complexity: O(N*T)

// Reason: There are N*T states therefore at max ‘N*T’ new problems will be solved.

// Space Complexity: O(N*T) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*T)).
let result = MinimumCoins(arr, T);

// Call the minimumElements function and print the result
console.log(
  "The minimum number of elements required to form the target sum is " + result
);

function MinimumCoinsTabUtils(index, coins, target, dp) {
  for (let i = 0; i <= target; i++) {
    if (i % coins[0] === 0) {
      dp[0][i] = i / coins[0];
    } else {
      dp[0][i] = Infinity;
    }

    if (i === 0 && index !== 0) {
      dp[index][i] = Infinity;
    }
  }

  for (let i = 1; i <= index; i++) {
    for (k = 0; k <= target; k++) {
      let nottake = 0 + dp[i - 1][k];
      let take = Infinity;

      if (coins[i] <= k) {
        take = 1 + dp[i][k - coins[i]];
      }

      dp[i][k] = Math.min(take, nottake);
    }
  }
  let result = dp[index][target];
  if (result === Infinity) return -1;
  return result;
}

function MinimumCoinsTab(coins, target) {
  let n = coins.length;

  let dp = Array.from({ length: n }, () => Array(target + 1).fill(-1));
  //console.log(dp);

  return MinimumCoinsTabUtils(n - 1, coins, target, dp);
}

// Time Complexity: O(N*T)

// Reason: There are two nested loops

// Space Complexity: O(N*T)

// Reason: We are using an external array of size ‘N*T’. Stack Space is eliminated.
let res = MinimumCoinsTab(arr, T);

// Call the minimumElements function and print the result
console.log(
  "The minimum number of elements required to form the target sum is with Tabu " +
    res
);

function MinimumCoinsSpaceOtpimize(index, coins, target) {
  let previous = Array(target + 1).fill(-1);
  let current = Array(target + 1).fill(-1);

  for (let i = 0; i <= target; i++) {
    if (i % coins[0] === 0) {
      previous[i] = i / coins[0];
    } else {
      previous[i] = Infinity;
    }

    if (i === 0 && index !== 0) {
      previous[i] = Infinity;
    }
  }

  for (let i = 1; i <= index; i++) {
    for (k = 0; k <= target; k++) {
      let nottake = 0 + previous[k];
      let take = Infinity;

      if (coins[i] <= k) {
        take = 1 + current[k - coins[i]];
      }

      current[k] = Math.min(take, nottake);
    }

    previous = current;
  }
  let result = previous[target];
  if (result === Infinity) return -1;
  return result;
}

let n = arr.length;

// Time Complexity: O(N*T)

// Reason: There are two nested loops.

// Space Complexity: O(T)

// Reason: We are using two external arrays of size ‘T+1’.
let rsult = MinimumCoinsSpaceOtpimize(n, arr, T);

// Call the minimumElements function and print the result
console.log(
  "The minimum number of elements required to form the target sum is with Space " +
    rsult
);
