// What is the Longest Increasing Subsequence?

// The longest increasing subsequence is described as a subsequence of an array where:

// All elements of the subsequence are in increasing order.
// This subsequence itself is of the longest length possible.

function LongestIncreasingSubsequenceUtil(
  array,
  currentIndex,
  prevIndex,
  n,
  dp
) {
  // Base condition
  if (currentIndex === n) return 0;
  // Note, I am using prevIndex+ 1 here because I am using 1 -base indexing -1+ 1 ===0
  if (dp[currentIndex][prevIndex + 1] !== -1)
    return dp[currentIndex][prevIndex + 1];

  // Initialize variables for "not taking" and "taking" the current element
  let nottaken =
    0 +
    LongestIncreasingSubsequenceUtil(array, currentIndex + 1, prevIndex, n, dp);
  let taken = 0;

  // Check if the current element can be included (if it's greater than the previous element)
  //So, if it is,  prevIndex === currentIndex
  if (prevIndex === -1 || array[currentIndex] > array[prevIndex]) {
    taken =
      1 +
      LongestIncreasingSubsequenceUtil(
        array,
        currentIndex + 1,
        currentIndex,
        n,
        dp
      );
  }
  // Store the result in dp and return the maximum
  dp[currentIndex][prevIndex + 1] = Math.max(taken, nottaken);
  return dp[currentIndex][prevIndex + 1];
}

function LongestIncreasingSubsequence(array) {
  let n = array.length;

  // Create a 2D dp array filled with -1 to store computed results
  let dp = Array.from(Array(n), () => Array(n + 1).fill(-1));
  // Call the recursive function to compute the length of the longest increasing subsequence
  return LongestIncreasingSubsequenceUtil(array, 0, -1, n, dp);
}

// Time Complexity: O(N*N)

// Reason: There are N*N states therefore at max ‘N*N’ new problems will be solved.

// Space Complexity: O(N*N) + O(N)

// Reason: We are using an auxiliary recursion stack space(O(N)) (
// see the recursive tree, in the worst case we will go till N calls at a time) and a 2D array ( O(N*N+1)).
function main() {
  let array = [10, 9, 2, 5, 3, 7, 101, 18];

  let result = LongestIncreasingSubsequence(array);
  console.log("The length of the longest increasing subsequence is", result);
}

main();

function LongestIncreasingSubsequenceOptimalSolution(array) {
    let n = array.length;
    let dp = new Array(n).fill(1);
  
    let maxi = 1;
    for (let currentIndex = 0; currentIndex <= n - 1; currentIndex++) {
      for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
        if (array[prevIndex] < array[currentIndex]) {
          dp[currentIndex] = Math.max(dp[currentIndex], 1 + dp[prevIndex]);
        }
      }
      maxi = Math.max(maxi, dp[currentIndex]);
    }
  
    return maxi;
  }
  
  function Ola() {
    let array = [10, 9, 2];
  
    let result = LongestIncreasingSubsequenceOptimalSolution(array);
    console.log(
      "The length of the longest increasing subsequence Optimzal",
      result
    );
  }
  
  Ola();
