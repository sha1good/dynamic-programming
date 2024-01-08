// A substring of a string is a subsequence in which all the characters are consecutive. Given two strings, we need to find the longest common substring.

// We need to print the length of the longest common substring.

// FOR SUBSTRING, THE  STRING HAS TO BE CONSECUTIVE

//The approach
// In the no-matching condition in the case of subsequence we were
// basically skipping one element from the str1 in the first recursion call and one element from the str2 in the second recursion call (since subsequence can be or cannot be continous),
// but in the case of substring we cannot skip an element to form a substring (as it must be continous).
// So that's why we returned 0 straight away.

function LongestCommonSubstringTabUtil(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo,
  dp
) {
  // Initialize a variable 'ans' to store the length of the longest common substring
  let ans = 0;

  // Initialize the base conditions for empty substrings
  for (let j = 0; j <= stringTwoIndex; j++) dp[0][j] = 0;
  for (let i = 0; i <= stringOneIndex; i++) dp[i][0] = 0;

  for (let i = 1; i <= stringOneIndex; i++) {
    for (j = 1; j <= stringTwoIndex; j++) {
      //Remember you are considering -1 index here
      // If the characters match, update 'dp' and 'ans'
      if (stringOne[i - 1] === stringTwo[j - 1]) {
        // this would be 1-1 = 0. So compare c and a
        dp[i][j] = 1 + dp[i - 1][j - 1];
        ans = Math.max(ans, dp[i][j]);
      } else {
        // If characters don't match, set 'dp' to 0 for the current position
        dp[i][j] = 0;
      }
    }
  }
  // 'ans' now contains the length of the longest common substring
  return ans; // this one is lenght dp[stringOneIndex][stringTwoIndex];
}

const s1 = "abcjklp";
const s2 = "acjkp";
let stringOneIndex = s1.length;
let stringTwoIndex = s2.length;

// Call the lcs function and print the result
function LongestCommonSubstringTab(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with 0
  //  1 2 3 4
  //  0 1 2 3  => so just consider this row in your code
  // -1 0 1 2    OR  same for this (acd)
  //  * c e d
  let dp = Array.from({ length: stringOneIndex + 1 }, () =>
    Array(stringTwoIndex + 1).fill(0)
  );
  return LongestCommonSubstringTabUtil(
    stringOneIndex,
    stringTwoIndex,
    stringOne,
    stringTwo,
    dp
  );
}

// Complexity Analysis
// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M)’. Stack Space is eliminated.
console.log(
  "The Length of Longest Common Substring is " +
    LongestCommonSubstringTab(stringOneIndex, stringTwoIndex, s1, s2)
);

function lcs(s1, s2) {
  const n = s1.length;
  const m = s2.length;

  // Initialize arrays 'prev' and 'cur' to store dynamic programming results, both initialized with 0
  let prev = new Array(m + 1).fill(0);
  let cur = new Array(m + 1).fill(0);

  // Initialize a variable 'ans' to store the length of the longest common substring
  let ans = 0;

  // Use nested loops to iterate through the characters of both strings
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      // If the characters match, update 'cur' and 'ans'
      if (s1[i - 1] === s2[j - 1]) {
        const val = 1 + prev[j - 1];
        cur[j] = val;
        ans = Math.max(ans, val);
      } else {
        // If characters don't match, set 'cur' to 0 for the current position
        cur[j] = 0;
      }
    }
    // Update 'prev' with the values of 'cur' for the next iteration
    prev.splice(0, m + 1, ...cur); // Or //prev = [...cur];
  }

  // 'ans' now contains the length of the longest common substring
  return ans;
}

// Main function
function main() {
  const s1 = "abcjklp";
  const s2 = "acjkp";

  // Call the lcs function and print the result
  console.log("The Length of Longest Common Substring is " + lcs(s1, s2));
}

// Call the main function to start the program
// Time Complexity: O(N*M)

// Reason: There are two nested loops.

// Space Complexity: O(M)

// Reason: We are using an external array of size ‘M+1’ to store only two rows.
main();
