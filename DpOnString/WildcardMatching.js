// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).

// Example 1:

// Input: s = "aa", p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
// Example 2:

// Input: s = "aa", p = "*"
// Output: true
// Explanation: '*' matches any sequence.
// Example 3:

// Input: s = "cb", p = "?a"
// Output: false
// Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.

// Constraints:

// 0 <= s.length, p.length <= 2000
// s contains only lowercase English letters.
// p contains only lowercase English letters, '?' or '*'.

function isAllStars(S1, i) {
  for (let k = 1; k <= i; k++) {
    //S1 is a string and will be mindful of its 0 index
    if (S1[k - 1] !== "*") {
      return false;
    }
  }

  return true;
}

function wildcardMatchingUtil(string1, string2, i, j, dp) {
  // Base Conditions
  if (i === 0 && j === 0) {
    return true;
  }

  if (i === 0 && j > 0) {
    return false;
  }

  if (j === 0 && i > 0) {
    return isAllStars(string1, i);
  }

  // Check if the result for the current indices is already calculated

  if (dp[i][j] !== -1) {
    return dp[i][j];
  }
  if (string1[i - 1] === string2[j - 1] || string1[i - 1] === "?") {
    return (dp[i][j] = wildcardMatchingUtil(
      string1,
      string2,
      i - 1,
      j - 1,
      dp
    ));
  } else {
    if (string1[i - 1] === "*") {
      return (dp[i][j] =
        wildcardMatchingUtil(string1, string2, i - 1, j, dp) ||
        wildcardMatchingUtil(string1, string2, i, j - 1, dp));
    } else {
      return false;
    }
  }
}

function wildcardMatching(string1, string2) {
  let n = string1.length;
  let m = string2.length;

  // Create a 2D array to store dynamic programming values
  let dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(-1));
  return wildcardMatchingUtil(string1, string2, n, m, dp);
}

// Time Complexity: O(N*M)

// Reason: There are N*M states therefore at max ‘N*M’ new problems will be solved.

// Space Complexity: O(N*M) + O(N+M)

// Reason: We are using a recursion stack space(O(N+M)) and a 2D array ( O(N*M)).
function main() {
  let string1 = "ab*cd";
  let string2 = "abdefcd";
  // Check if S1 matches S2 using wildcard matching

  if (wildcardMatching(string1, string2)) {
    console.log("String String1 and String2 do match");
  } else {
    console.log("String String1 and String2 do  not match");
  }
}

main();

console.log("Tabulation Appraoch");

function wildcardMatchingTab(string1, string2) {
  const n = string1.length;
  const m = string2.length;

  // Create a 2D array to store dynamic programming values
  const dp = new Array(n + 1)
    .fill(null)
    .map(() => new Array(m + 1).fill(false));

  dp[0][0] = true;

  for (j = 1; j <= m; j++) {
    dp[0][j] = false;
  }

  for (i = 1; i <= n; i++) {
    dp[i][0] = isAllStars(string1, i);
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (string1[i - 1] === string2[j - 1] || string1[i - 1] === "?") {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        if (string1[i - 1] === "*") {
          dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
        } else {
          dp[i][j] = false;
        }
      }
    }
  }
  return dp[n][m];
}
// Main function
function Sheriff() {
  const S1 = "ab*cd";
  const S2 = "abdefcd";

  // Check if S1 matches S2 using wildcard matching
  if (wildcardMatchingTab(S1, S2)) {
    console.log("String S1 and S2 do match from Tab,  TRUE");
  } else {
    console.log("String S1 and S2 do not match from Tab");
  }
}

// Call the main function to start the program
// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M’. Stack Space is eliminated.
Sheriff();
