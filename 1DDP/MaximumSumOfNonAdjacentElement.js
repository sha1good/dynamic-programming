// Problem Statement:

// Given an array of ‘N’  positive integers, we need to return the maximum sum of the subsequence such that no two elements of the subsequence are adjacent elements in the array.

// Note: A subsequence of an array is a list with elements of the array where some elements are deleted ( or not deleted at all) and the elements should be in the same order in the subsequence as in the array.

function solveUtil(index, array, dp) {
  if (index < 0) return 0;
  if (index === 0) return array[index];
  if (dp[index] !== -1) return dp[index];
  // Calculate the maximum value by either picking or not picking the current element
  const pick = array[index] + solveUtil(index - 2, array, dp);
  const notPick = 0 + solveUtil(index - 1, array, dp);
  dp[index] = Math.max(pick, notPick);
  return dp[index];
}
function MaximumSumOfNonAdjacentlementMemoApproach(array) {
  let n = array.length;
  // Initialize a DP array with -1
  let dp = Array(n).fill(-1);
  // Call the solveUtil function with the last index
  return solveUtil(n - 1, array, dp);
}

let array = [2, 1, 4, 9];

//Time Complexity: O(N)

// Reason: The overlapping subproblems will return the answer in constant time O(1).
// Therefore the total number of new subproblems we solve is ‘n’. Hence total time complexity is O(N).

// Space Complexity: O(N)

// Reason: We are using a recursion stack space(O(N)) and an array (again O(N)).
// Therefore total space complexity will be O(N) + O(N) ≈ O(N)
let solution = MaximumSumOfNonAdjacentlementMemoApproach(array);

console.log(solution);

console.log("==========================================");

function maxiTabulationUtil(index, array, dp) {
  // Initialize the first element of dp with the first element of the array

  dp[0] = array[0];

  // Loop through the array to fill the dp array
  for (let i = 1; i <= index; i++) {
    let pick = array[i];
    if (i > 1) {
      pick += dp[i - 2];
    }
    // Calculate the maximum value when not picking the current element
    let notPick = 0 + array[i - 1];
    // Store the maximum of pick and nonPick in dp
    dp[i] = Math.max(pick, notPick);
  }
  return dp[index];
}
function MaximumSumOfNonAdjacentlementTabulationApproach(array) {
  let n = array.length;
  let dp = Array(n).fill(-1);
  return maxiTabulationUtil(n - 1, array, dp);
}

// Time Complexity: O(N)

// Reason: We are running a simple iterative loop

// Space Complexity: O(N)

// Reason: We are using an external array of size ‘n+1’.
console.log(MaximumSumOfNonAdjacentlementTabulationApproach(array));

function MaximumSumOfNonAdjacentlementOptimalSolution(array) {
  let n = array.length;
  let previous2 = 0;
  let previous1 = array[0];

  for (let i = 1; i < n; i++) {
    let pick = array[i] + previous2;
    let notPick = 0 + previous1;

    let currentI = Math.max(pick, notPick);
    previous2 = previous1;
    previous1 = currentI;
  }

  return previous1;
}

let result = MaximumSumOfNonAdjacentlementOptimalSolution(array);

console.log(result);
