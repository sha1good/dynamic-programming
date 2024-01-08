// You are given n balloons, indexed from 0 to n - 1.
// Each balloon is painted with a number on it represented by an array nums.
// You are asked to burst all the balloons.

// If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins.
// If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

// Return the maximum coins you can collect by bursting the balloons wisely.

// Example 1:

// Input: nums = [3,1,5,8]
// Output: 167
// Explanation:
// nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
// coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
// Example 2:

// Input: nums = [1,5]
// Output: 10

// Constraints:

// n == nums.length
// 1 <= n <= 300
// 0 <= nums[i] <= 100

function findMaxCoins(a) {
  // Function f implements the recursive calculation
  function f(i, j, a) {
    // Base case: if i > j, return 0
    if (i > j) return 0;

    let maxi = -Infinity;

    // Iterate through all possible balloon indices from i to j
    for (let ind = i; ind <= j; ind++) {
      // Calculate the cost for bursting balloon ind
      let cost =
        a[i - 1] * a[ind] * a[j + 1] + f(i, ind - 1, a) + f(ind + 1, j, a);

      // Update the maximum cost
      maxi = Math.max(maxi, cost);
    }

    return maxi;
  }

  // Add 1 to the beginning and end of the array 'a'
  a.unshift(1);
  a.push(1);

  // Call the recursive function 'f' with initial values
  return f(1, a.length - 2, a);
}

// Define the input values
let a = [3, 1, 5, 8];

// Call the function and print the result
//Time Complexity: Exponential

let ans = findMaxCoins(a);
console.log(ans);

function findMaxCoinsMemo(a) {
  // Function f with memoization
  function f(i, j, a, dp) {
    // Base case: if i > j, return 0
    if (i > j) return 0;

    // If the result for this subproblem is already computed, return it
    if (dp[i][j] !== -1) return dp[i][j];

    let maxi = -Infinity;

    // Iterate through all possible balloon indices from i to j
    for (let ind = i; ind <= j; ind++) {
      // Calculate the cost for bursting balloon ind
      let cost =
        a[i - 1] * a[ind] * a[j + 1] +
        f(i, ind - 1, a, dp) +
        f(ind + 1, j, a, dp);

      // Update the maximum cost
      maxi = Math.max(maxi, cost);
    }

    // Store the result in the memoization table
    dp[i][j] = maxi;
    return maxi;
  }

  // Add 1 to the beginning and end of the array 'a'
  a.unshift(1);
  a.push(1);

  // Create a memoization table 'dp' initialized with -1
  let n = a.length;
  let dp = new Array(n).fill(null).map(() => new Array(n).fill(-1));

  // Call the recursive function 'f' with initial values
  return f(1, n - 2, a, dp);
}

// Define the input values
let arr = [3, 1, 5, 8];

// Call the function and print the result
// Time Complexity: O(N3), There are total N2 no. of states. And for each state, we are running a partitioning loop roughly for N times.

// Space Complexity: O(N2) + Auxiliary stack space of O(N), N2 for the dp array we are using.
let result = findMaxCoinsMemo(arr);
console.log(result);

function findMaxCoinsTab(c, a) {
  // Add 1 to the beginning and end of the array 'a'
  a.unshift(1);
  a.push(1);

  // Get the length of the array 'a'
  let n = a.length;

  // Create a 2D array 'dp' to store dynamic programming results
  let dp = new Array(n + 2);
  for (let i = 0; i < n + 2; i++) {
    dp[i] = new Array(n + 2).fill(0);
  }

  // Loop to fill in the 'dp' array
  for (let i = c; i >= 1; i--) {
    for (let j = 1; j <= c; j++) {
      // Skip invalid cases where i > j
      if (i > j) continue;

      let maxi = -Infinity;

      // Calculate the cost for each possible balloon to burst between i and j
      for (let ind = i; ind <= j; ind++) {
        let cost =
          a[i - 1] * a[ind] * a[j + 1] + dp[i][ind - 1] + dp[ind + 1][j];
        maxi = Math.max(maxi, cost);
      }

      // Store the maximum cost in 'dp'
      dp[i][j] = maxi;
    }
  }

  // The maximum coins are stored in dp[1][n]
  return dp[1][c];
}

// Define the input values
let array = [3, 1, 5, 8];
let c = array.length;

// Call the function and print the result
// Time Complexity: O(N3), There are total N2 no. of states. And for each state, we are running a partitioning loop roughly for N times.

// Space Complexity: O(N2), N2 for the dp array we are using.
let rsult = findMaxCoinsTab(c, array);
console.log(rsult);
