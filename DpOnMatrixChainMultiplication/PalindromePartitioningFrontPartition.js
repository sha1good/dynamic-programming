// Given a string s, partition s such that every
// substring
//  of the partition is a
// palindrome
// .

// Return the minimum cuts needed for a palindrome partitioning of s.

// Example 1:

// Input: s = "aab"
// Output: 1
// Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
// Example 2:

// Input: s = "a"
// Output: 0
// Example 3:

// Input: s = "ab"
// Output: 1

function isPalindrome(i, j, tempstring) {
  while (i < j) {
    if (tempstring[i] !== tempstring[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}
function palindromePartitioningUtil(i, n, string) {
  // Base case: If i reaches the end of the string, return 0
  if (i === n) return 0;

  let minCost = Infinity;
  // Check all possible substrings starting from index i
  for (let j = i; j < n; j++) {
    if (isPalindrome(i, j, string)) {
      let cost = 1 + palindromePartitioningUtil(j + 1, n, string);
      minCost = Math.min(minCost, cost);
    }
  }
  return minCost;
}

function palindromePartitioning(str) {
  let n = str.length;

  return palindromePartitioningUtil(0, n, str) - 1;
}

// Main function
//Time Complexity: Exponential
function main() {
  const str = "BABABCBADCEDE";
  const partitions = palindromePartitioning(str);
  console.log("The minimum number of partitions:", partitions);
}

// Call the main function
main();

function isPalindrome(i, j, tempstring) {
  while (i < j) {
    if (tempstring[i] !== tempstring[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}
function palindromePartitioningMemoUtil(i, n, string, dp) {
  // Base case: If i reaches the end of the string, return 0
  if (i === n) return 0;
  if (dp[i] !== -1) return dp[i];
  let minCost = Infinity;
  // Check all possible substrings starting from index i
  for (let j = i; j < n; j++) {
    if (isPalindrome(i, j, string)) {
      let cost = 1 + palindromePartitioningMemoUtil(j + 1, n, string, dp);
      minCost = Math.min(minCost, cost);
    }
  }
  return (dp[i] = minCost);
}

function palindromePartitioningMemo(str) {
  let n = str.length;

  let dp = new Array(n).fill(-1);
  return palindromePartitioningMemoUtil(0, n, str, dp) - 1;
}

// Main function
// Time Complexity: O(N2)
// Reason: There are a total of N states and inside each state, a loop of size N(apparently) is running.

// Space Complexity: O(N) + Auxiliary stack space O(N)
// Reason: The first O(N) is for the dp array of size N.
function Ola() {
  const str = "BABABCBADCEDE";
  const partitions = palindromePartitioningMemo(str);
  console.log("The minimum number of partitions for Memo:", partitions);
}

// Call the main function
Ola();

function isPalindrome(i, j, tempstring) {
  while (i < j) {
    if (tempstring[i] !== tempstring[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}
function palindromePartitioningTabUtil(n, string, dp) {
  // Base case: If i reaches the end of the string, return 0
  dp[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    let minCost = Infinity;
    // Check all possible substrings starting from index i
    for (let j = i; j < n; j++) {
      if (isPalindrome(i, j, string)) {
        let cost = 1 + dp[j + 1];
        minCost = Math.min(minCost, cost);
      }
    }
    dp[i] = minCost;
  }
  return dp[0];
}

function palindromePartitioningTab(str) {
  let n = str.length;

  let dp = new Array(n).fill(0);
  return palindromePartitioningTabUtil(n, str, dp) - 1;
}

// Main function
// Time Complexity: O(N2)
// Reason: There are a total of N states and inside each state a loop of size N(apparently) is running.

// Space Complexity: O(N)
// Reason: O(N) is for the dp array we have used.
function Sheriff() {
  const str = "BABABCBADCEDE";
  const partitions = palindromePartitioningTab(str);
  console.log("The minimum number of partitions for Tab:", partitions);
}

// Call the main function
Sheriff();
