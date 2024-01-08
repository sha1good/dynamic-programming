// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

// You have the following three operations permitted on a word:

// Insert a character
// Delete a character
// Replace a character

// Example 1:

// Input: word1 = "horse", word2 = "ros"
// Output: 3
// Explanation:
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')
// Example 2:

// Input: word1 = "intention", word2 = "execution"
// Output: 5
// Explanation:
// intention -> inention (remove 't')
// inention -> enention (replace 'i' with 'e')
// enention -> exention (replace 'n' with 'x')
// exention -> exection (replace 'n' with 'c')
// exection -> execution (insert 'u')

// Constraints:

// 0 <= word1.length, word2.length <= 500
// word1 and word2 consist of lowercase English letters.

// Now, i and j represent two characters from strings S1 and S2 respectively.
// There are only two options that make sense: either the characters represented by i and j match or they don’t.

// (i) When the characters match

// if(S1[i]==S2[j]),

// If this is true, now as the characters at i and j match,
// we would not want to do any operations to make them match,
// so we will just decrement both i and j by 1 and recursively find the answer for the remaining string portion. We return 0+f(i-1,j-1).
//  The following figure makes it clear.
// (ii) When the characters don’t match

// if(S1[i] != S2[j]) is true, then we have to do any of three operations to match the characters.
// We have three options, we will analyze each of them one by one.

// Now if we have to match the strings by insertions, what would we do?:

// We would have placed an ‘s’ at index 5 of S1.
// Suppose i now point to s at index 5 of S1 and j points are already pointing to s at index j of S2.
// Now, we hit the condition, where characters do match. (as mentioned in case 1).
// Therefore, we will decrement i and j by 1. They will now point to index 4 and 1 respectively.
// return 1+f(i-1,j) // Insertion of character.
// return 1+f(i,j-1) // Deletion of character.
// return 1+f(i-1,j-1) // Replacement of character.

function editDistanceUtil(n, m, string1, string2, dp) {
  // If the first string is empty, the only option is to insert all characters from the second string
  // We are considering 1 base indexing here
  if (n === 0) {
    return m;
  }

  // If the second string is empty, the only option is to delete all characters from the first string
  // We are considering 1 base indexing here as well
  if (m === 0) {
    return n;
  }

  // Check if the result for the current indices is already calculated
  if (dp[n][m] !== -1) return dp[n][m];

  // If the characters at the current positions are the same, no operation is needed, just reduced both strings
  if (string1[n - 1] === string2[m - 1]) {
    return (dp[n][m] =
      0 + editDistanceUtil(n - 1, m - 1, string1, string2, dp));
  } else {
    // Minimum of three choices:
    // 1. Substitute a character in the first string with a character in the second string
    // 2. Delete a character from the first string
    // 3. Insert a character into the first string
    return (dp[n][m] =
      1 +
      Math.min(
        editDistanceUtil(n - 1, m - 1, string1, string2, dp),
        Math.min(
          editDistanceUtil(n - 1, m, string1, string2, dp),
          editDistanceUtil(n, m - 1, string1, string2, dp)
        )
      ));
  }
}
function editDistance(string1, string2) {
  let n = string1.length;
  let m = string2.length;

  // Create a 2D array to store dynamic programming values
  let dp = Array.from(Array(n + 1), () => Array(m + 1).fill(-1));
  // Call the recursive utility function
  return editDistanceUtil(n, m, string1, string2, dp);
}

// Main function
// Time Complexity: O(N*M)

// Reason: There are N*M states therefore at max ‘N*M’ new problems will be solved.

// Space Complexity: O(N*M) + O(N+M)

// Reason: We are using a recursion stack space(O(N+M)) and a 2D array ( O(N*M)).
function main() {
  const s1 = "horse";
  const s2 = "ros";

  // Call the editDistance function and print the result
  console.log(
    "The minimum number of operations required is: " + editDistance(s1, s2)
  );
}

// Call the main function to start the program
main();

console.log("This is the Tabulation Appraoch");

// In the recursive logic, we set the base case too if(i<0 ) and if(j<0) but we can’t set the dp array’s index to -1. Therefore a hack for this issue is to shift every index by 1 towards the right.

// First we initialise the dp array of size [n+1][m+1] as zero.
// Next, we set the base condition (keep in mind 1-based indexing), we set the first column’s value as i and the first row as j( 1-based indexing).
// Similarly, we will implement the recursive code by keeping in mind the shifting of indexes, therefore S1[i] will be converted to S1[i-1]. Same for S2.
// At last, we will print dp[N][M] as our answer.

function editDistanceTabUtil(n, m, string1, string2, dp) {
  // Initialize the first row and first column
  for (let j = 0; j <= m; j++) {
    dp[0][j] = j;
  }

  for (let i = 0; i <= n; i++) {
    dp[i][0] = i;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (string1[i - 1] === string2[j - 1]) {
        dp[i][j] = 0 + dp[i - 1][j - 1];
      } else {
        // Minimum of three choices:
        // 1. Substitute a character in the first string with a character in the second string
        // 2. Delete a character from the first string
        // 3. Insert a character into the first string
        dp[i][j] =
          1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
      }
    }
  }

  return dp[n][m];
}

function editDistanceTabulation(string1, string2) {
  let n = string1.length;
  let m = string2.length;

  // Create a 2D array to store dynamic programming values
  let dp = Array.from(Array(n + 1), () => Array(m + 1).fill(-1));
  // Call the recursive utility function
  return editDistanceTabUtil(n, m, string1, string2, dp);
}

// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M’. Stack Space is eliminated.
function man() {
  const s1 = "horse";
  const s2 = "ros";

  // Call the editDistance function and print the result
  console.log(
    "The minimum number of operations required for Tabulation: " +
      editDistanceTabulation(s1, s2)
  );
}

// Call the main function to start the program
man();

function editDistanceSpaceOtimization(string1, string2) {
  let n = string1.length;
  let m = string2.length;

  // Create a 2D array to store dynamic programming values
  let previous = Array(m + 1).fill(-1);
  let current = Array(m + 1).fill(-1);
  // Call the recursive utility function
  // Initialize the first row and first column
  for (let j = 0; j <= m; j++) {
    previous[j] = j;
  }

  for (let i = 0; i <= n; i++) {
    current[0] = i;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (string1[i - 1] === string2[j - 1]) {
        current[j] = 0 + previous[j - 1];
      } else {
        // Minimum of three choices:
        // 1. Substitute a character in the first string with a character in the second string
        // 2. Delete a character from the first string
        // 3. Insert a character into the first string
        current[j] =
          1 + Math.min(previous[j - 1], Math.min(previous[j], current[j - 1]));
      }
    }
    previous = [...current];
  }

  return previous[m];
}

function Sheriff() {
  const s1 = "horse";
  const s2 = "ros";

  // Call the editDistance function and print the result
  console.log(
    "The minimum number of operations required for Optimzation: " +
      editDistanceSpaceOtimization(s1, s2)
  );
}

Sheriff();
