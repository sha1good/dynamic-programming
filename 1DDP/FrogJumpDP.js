// Given a number of stairs and a frog, the frog wants to climb from the 0th stair to the (N-1)th stair.
// At a time the frog can climb either one or two steps.
// A height[N] array is also given. Whenever the frog jumps from a stair i to stair j,
// the energy consumed in the jump is abs(height[i]- height[j]), where abs() means the absolute difference.
//We need to return the minimum energy that can be used by the frog to jump from stair 0 to stair N-1.

function FrogJumpMemoization(n, height, dp) {
  if (n === 0) return 0;
  let jumpTwo = Infinity;

  if (dp[n] !== -1) return dp[n];
  let jumpOne =
    FrogJumpMemoization(n - 1, height, dp) +
    Math.abs(height[n] - height[n - 1]);

  if (n > 1)
    jumpTwo =
      FrogJumpMemoization(n - 2, height, dp) +
      Math.abs(height[n] - height[n - 2]);

  return (dp[n] = Math.min(jumpOne, jumpTwo));
}

let height = [30, 10, 60, 10, 60, 50];
let n = height.length;
//console.log(n);

let dp = Array(n).fill(-1);

// Time Complexity: O(N)

// Reason: The overlapping subproblems will return the answer in constant time O(1). Therefore the total number of new subproblems we solve is ‘n’. Hence total time complexity is O(N).

// Space Complexity: O(N)

// Reason: We are using a recursion stack space(O(N)) and an array (again O(N)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
let result = FrogJumpMemoization(n - 1, height, dp); //f(5)

console.log(result);

function FrogJumpTabulationAppraoch(n) {
  let dp = Array(n + 1).fill(-1);
  dp[0] = 0;
  let right = Infinity;

  for (let i = 1; i <= n; i++) {
    let left = (dp[i] =
      FrogJumpTabulationAppraoch(i - 1) + Math.abs(height[i] - height[i - 1]));
    if (i > 1)
      right = dp[i - 2] =
        FrogJumpTabulationAppraoch(i - 2) + Math.abs(height[i] - height[i - 2]);

    dp[i] = Math.min(left, right);
  }

  return dp[n];
}

// Time Complexity: O(N)

// Reason: We are running a simple iterative loop

// Space Complexity: O(N)

// Reason: We are using an external array of size ‘n - 1’.
let res = FrogJumpTabulationAppraoch(n - 1); //I am passing n= n - 1 because ,height.length === 6 already

console.log(res);

function FrogJumpSpaceOptimizationApproach(n) {
  let previous2 = 0;
  let previous1 = 0;
  let right = Infinity;

  for (let i = 1; i <= n; i++) {
    let left = previous1 + Math.abs(height[i] - height[i - 1]);

    if (i > 1) right = previous2 + Math.abs(height[i] - height[i - 2]);

    let currentI = Math.min(left, right);

    previous2 = previous1;
    previous1 = currentI;
  }

  return previous1;
}

// Time Complexity: O(N)
// Reason: We are running a simple iterative loop
// Space Complexity: O(1)
// Reason: We are not using any extra space.
let rsult = FrogJumpSpaceOptimizationApproach(n - 1);

console.log(rsult);
