// A palindromic string is a string that is equal to its reverse.
// For example:
// “Nitin” is a palindromic string.

// Now the question states to find the length of the longest palindromic subsequence of a string.
// It is that palindromic subsequence of the given string with the greatest length. We need to print the length of the
// longest palindromic subsequence.

// Function to find the length of the Longest Palindromic Subsequence of a string

function lcs(s1, s2) {
  // Get the lengths of the input strings
  const n = s1.length;
  const m = s2.length;

  // Create a 2D array to store the dynamic programming values
  const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(-1));

  // Initialize the first row and first column with 0
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 0;
  }
  for (let i = 0; i <= m; i++) {
    dp[0][i] = 0;
  }

  // Fill the dp array using dynamic programming
  for (let ind1 = 1; ind1 <= n; ind1++) {
    for (let ind2 = 1; ind2 <= m; ind2++) {
      if (s1[ind1 - 1] === s2[ind2 - 1]) {
        dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
      } else {
        dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
      }
    }
  }

  // Return the length of the LCS
  return dp[n][m];
}

function longestPalindromeSubsequence(s) {
  // Create a copy of the input string and reverse it
  //const t = s.split('').reverse().join('');
  let t = "";

  for (let i = s.length - 1; i >= 0; i--) {
    t += s[i];
  }

  // Find the LCS between the original and reversed strings
  return lcs(s, t);
}

// Main function
function main() {
  const s = "bbabcbcab";

  // Call the longestPalindromeSubsequence function and print the result
  console.log(
    "The Length of Longest Palindromic Subsequence is " +
      longestPalindromeSubsequence(s)
  );
}

// Call the main function to start the program
// Time Complexity: O(N*N)

// Reason: There are two nested loops

// Space Complexity: O(N*N)

// Reason: We are using an external array of size ‘(N*N)’. Stack Space is eliminated.
main();
