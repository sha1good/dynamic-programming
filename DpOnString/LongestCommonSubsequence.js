// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

// For example, "ace" is a subsequence of "abcde".
// A common subsequence of two strings is a subsequence that is common to both strings.

// Example 1:

// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.
// Example 2:

// Input: text1 = "abc", text2 = "abc"
// Output: 3
// Explanation: The longest common subsequence is "abc" and its length is 3.
// Example 3:

// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: There is no such common subsequence, so the result is 0.

function LongestCommonSubsequenceUtil(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo,
  dp
) {
  // Base case: If either string has reached the end, the LCS length is 0
  if (stringOneIndex < 0 || stringTwoIndex < 0) {
    return 0;
  }

  if (dp[stringOneIndex][stringTwoIndex] !== -1) {
    return dp[stringOneIndex][stringTwoIndex];
  }

  // If the characters match, increase the LCS length and move both indices
  if (stringOne[stringOneIndex] === stringTwo[stringTwoIndex]) {
    return (dp[stringOneIndex][stringTwoIndex] =
      1 +
      LongestCommonSubsequenceUtil(
        stringOneIndex - 1,
        stringTwoIndex - 1,
        stringOne,
        stringTwo,
        dp
      ));
  }

  // If the characters don't match, consider two options: moving one index in either string
  return (dp[stringOneIndex][stringTwoIndex] = Math.max(
    LongestCommonSubsequenceUtil(
      stringOneIndex - 1,
      stringTwoIndex,
      stringOne,
      stringTwo,
      dp
    ),
    LongestCommonSubsequenceUtil(
      stringOneIndex,
      stringTwoIndex - 1,
      stringOne,
      stringTwo,
      dp
    )
  ));
}
function LongestCommonSubsequence(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
  let dp = Array.from(Array(stringOneIndex), () =>
    Array(stringTwoIndex).fill(-1)
  );

  return LongestCommonSubsequenceUtil(
    stringOneIndex - 1,
    stringTwoIndex - 1,
    stringOne,
    stringTwo,
    dp
  );
}

let stringOne = "acd";
let stringTwo = "ced";

let stringOneIndex = stringOne.length;
let stringTwoIndex = stringTwo.length;

// Time Complexity: O(N*M)

// Reason: There are N*M states therefore at max ‘N*M’ new problems will be solved.

// Space Complexity: O(N*M) + O(N+M)

// Reason: We are using an auxiliary recursion stack space(O(N+M)) (see the recursive tree,
//     in the worst case, we will go till N+M calls at a time) and a 2D array ( O(N*M)).
let result = LongestCommonSubsequence(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
);

console.log("The Length of Longest Common Subsequence is " + result);

function LongestCommonSubsequenceTabUtil(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo,
  dp
) {
  // Initialize the base conditions for empty substrings
  for (let j = 0; j <= stringTwoIndex; j++) dp[0][j] = 0;
  for (let i = 0; i <= stringOneIndex; i++) dp[i][0] = 0;

  for (let i = 1; i <= stringOneIndex; i++) {
    for (j = 1; j <= stringTwoIndex; j++) {
      //Remember you are considering -1 index here
      if (stringOne[i - 1] === stringTwo[j - 1])
        // this would be 1-1 = 0. So compare c and a
        dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  for (let i = 0; i <= stringOneIndex; i++) {
    for (let j = 0; j <=stringTwoIndex; j++) {
      console.log(dp[i][j] + " ");
    }
    console.log();
  }
  return dp[stringOneIndex][stringTwoIndex];
}

function LongestCommonSubsequenceTab(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
  //  1 2 3 4
  //  0 1 2 3  => so just consider this row in your code
  // -1 0 1 2    OR  same for this (acd)
  //  * c e d
  let dp = Array.from({ length: stringOneIndex + 1 }, () =>
    Array(stringTwoIndex + 1).fill(0)
  );
  return LongestCommonSubsequenceTabUtil(
    stringOneIndex,
    stringTwoIndex,
    stringOne,
    stringTwo,
    dp
  );
}

let res = LongestCommonSubsequenceTab(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
);

// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M)’. Stack Space is eliminated.
console.log("The Length of Longest Common Subsequence Tab " + result);

console.log("Space Optimization");

function LongestCommonSubsequenceSpaceOptimization(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
  //  1 2 3 4
  //  0 1 2 3  => so just consider this row in your code
  // -1 0 1 2    OR  same for this (acd)
  //  * c e d
  let previous = Array(stringTwoIndex + 1).fill(0);
  let current = Array(stringTwoIndex + 1).fill(0);

  for (let j = 0; j <= stringTwoIndex; j++) previous[j] = 0;

  for (let i = 1; i <= stringOneIndex; i++) {
    for (j = 1; j <= stringTwoIndex; j++) {
      //Remember you are considering -1 index here
      if (stringOne[i - 1] === stringTwo[j - 1])
        // this would be 1-1 = 0. So compare c and a
        current[j] = 1 + previous[j - 1];
      else current[j] = Math.max(previous[j], current[j - 1]);
    }
    previous = current;
  }
  return previous[stringTwoIndex];
}

// Time Complexity: O(N*M)

// Reason: There are two nested loops.

// Space Complexity: O(M)

// Reason: We are using an external array of size ‘M+1’ to store only two rows.
let rsult = LongestCommonSubsequenceSpaceOptimization(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
);

console.log("The Length of Longest Common Subsequence Tab " + rsult);
