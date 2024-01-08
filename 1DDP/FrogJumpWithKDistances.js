// This is a follow-up question to “Frog Jump” discussed in the previous article.
// In the previous question, the frog was allowed to jump either one or two steps at a time.
// In this question, the frog is allowed to jump up to ‘K’ steps at a time. If K=4, the frog can jump 1,2,3, or 4 steps at every index.

function FrogJumpWithKDistancesMemoApproachUtils(n, height, k, dp) {
  // Base case: If we are at the beginning (index 0), no cost is needed.
  if (n === 0) return 0;
  // If the result for this index has been previously calculated, return it.
  if (dp[n] !== -1) return dp[n];

  let minimumJump = Infinity;

  // Loop to try all possible jumps from '1' to 'k', i.e by maintaining either 1 step at a time or two steps at a time
  for (let i = 1; i <= k; i++) {
    if (n - i >= 0) {
      // Calculate the cost for this jump and update minimumJump with the minimum cost
      const jump =
        FrogJumpWithKDistancesMemoApproachUtils(n - i, height, k, dp) +
        Math.abs(height[n] - height[n - i]);
      minimumJump = Math.min(minimumJump, jump);
    }
  }

  dp[n] = minimumJump;
  return dp[n];
}

function FrogJumpWithKDistancesMemoApproach(n, height, k, dp) {
  return FrogJumpWithKDistancesMemoApproachUtils(n - 1, height, k, dp);
}

const height = [30, 10, 60, 10, 60, 50];

let n = height.length;

const k = 2;

const dp = Array(n).fill(-1); // Initialize a memoization array for the main function
// Time Complexity: O(N *K)

// Reason: The overlapping subproblems will return the answer in constant time. Therefore the total number of new subproblems we solve is ‘n’. At every new subproblem, we are running another loop for K times. Hence total time complexity is O(N * K).

// Space Complexity: O(N)

// Reason: We are using a recursion stack space(O(N)) and an array (again O(N)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
console.log(FrogJumpWithKDistancesMemoApproach(n, height, k, dp)); // Print the result of the FrogJumpWithKDistancesMemoApproach function

// Define the solveUtil function to calculate the minimum steps required
function solveUtil(n, height, k, dp) {
  // Initialize the first element in dp to 0
  dp[0] = 0;

  // Loop through the height array from index 1 to n-1
  for (let i = 1; i <= n - 1; i++) {
    let minimumSteps = Infinity;

    // Loop through the last k elements (backward jumps)
    for (let j = 1; j <= k; j++) {
      // Check if it's possible to jump to the previous element
      if (i - j >= 0) {
        // Calculate the cost of the jump and update mmSteps with the minimum cost
        let jump = dp[i - j] + Math.abs(height[i] - height[i - j]);
        minimumSteps = Math.min(minimumSteps, jump);
      }
    }
    dp[i] = minimumSteps;
  }

  return dp[n - 1];
}

function solve(n, height, k) {
  // Initialize the dp array with -1
  const dp = Array(n).fill(-1);
  return solveUtil(n, height, k, dp);
}

// Main function
function main() {
  // Input height array
  const height = [30, 10, 60, 10, 60, 50];

  // Calculate the length of the height array
  const n = height.length;

  // Set the maximum allowed jumps (k)
  const k = 2;

  // Call the solve function and print the result
  console.log(solve(n, height, k));
}

// Call the main function to start the program
main();
