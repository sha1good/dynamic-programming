// How to write 1-D Recurrence relation / Climbing Stairs
// In this article, we will learn to write 1-D Recurrence relations using the problem “Climbing Stairs”

// Problem Statement: Given a number of stairs.
//Starting from the 0th stair we need to climb to the “Nth” stair.
//At a time we can climb either one or two steps.
//We need to return the total number of distinct ways to reach from 0th to Nth stair.

//Solution :
// How to Identify a DP problem?

// When we see a problem, it is very important to identify it as a dynamic programming problem. Generally (but not limited to) if the problem statement asks for the following:

// Count the total number of ways
// Given multiple ways of doing a task, which way will give the minimum or the maximum output.
// We can try to apply recursion. Once we get the recursive solution, we can go ahead to convert it to a dynamic programming one.

// Steps To Solve The Problem After Identification

// Once the problem has been identified, the following three steps comes handy in solving the problem:

// Try to represent the problem in terms of indexes.
// Try all possible choices/ways at every index according to the problem statement.
// If the question states
// Count all the ways – return sum of all choices/ways.
// Find maximum/minimum- return the choice/way with maximum/minimum output.

function ClimingStairs(n) {
  let dp = Array(n + 1).fill(-1);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

let n = 3;

// Time Complexity: O(N)

// Reason: We are running a simple iterative loop

// Space Complexity: O(N)

// Reason: We are using an external array of size ‘n+1’.
let result = ClimingStairs(n);

console.log(result);

function ClimingStairsOptimization(m) {
  let previousStep2 = 1;
  let previousStep1 = 1;

  for (let i = 2; i <= m; i++) {
    let currentStep = previousStep1 + previousStep2;
    previousStep2 = previousStep1;
    previousStep1 = currentStep;
  }

  return previousStep1;
}

let m = 3;

// Time Complexity: O(N)

// Reason: We are running a simple iterative loop

// Space Complexity: O(1)

// Reason: We are not using any extra space.
let res = ClimingStairsOptimization(m);

console.log(res);
