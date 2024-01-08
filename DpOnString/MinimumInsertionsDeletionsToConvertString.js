// Problem Statement: Minimum Insertions/Deletions to Convert String A to String B

// We are given two strings, str1 and str2. We are allowed the following operations:

// Delete any number of characters from string str1.
// Insert any number of characters in string str1.
// We need to tell the minimum operations required to convert str1 to str2.

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

  return dp[n][m];
}

function MinimumInsertionsDeletionsToConvertString(stringOne, stringTwo) {
  let n = stringOne.length;
  let m = stringTwo.length;

  return n + m - 2 * lcs(stringOne, stringTwo);
}

const str1 = "abcd";
const str2 = "anc";

// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size (N*M). Stack Space is eliminated.
let result = MinimumInsertionsDeletionsToConvertString(str1, str2);

console.log(result);

function lcs(s1, s2) {
  // Get the lengths of the input strings
  const n = s1.length;
  const m = s2.length;

  // Create two arrays, prev and cur, to store dynamic programming values
  let prev = new Array(m + 1).fill(0);
  let cur = new Array(m + 1).fill(0);

  // Base case is covered as we have initialized prev and cur to 0.

  // Fill the cur array using dynamic programming
  for (let ind1 = 1; ind1 <= n; ind1++) {
    for (let ind2 = 1; ind2 <= m; ind2++) {
      if (s1[ind1 - 1] === s2[ind2 - 1]) {
        cur[ind2] = 1 + prev[ind2 - 1];
      } else {
        cur[ind2] = Math.max(prev[ind2], cur[ind2 - 1]);
      }
    }
    // Update prev array with the values from cur for the next iteration
    prev = [...cur];
  }

  return prev[m];
}

// Function to find the minimum operations required to convert one string to another
function canYouMake(str1, str2) {
  const n = str1.length;
  const m = str2.length;

  // Calculate the length of the LCS
  const k = lcs(str1, str2);

  // The minimum operations required is equal to (n - k) + (m - k)
  return n - k + (m - k);
}

// Main function
// Time Complexity: O(N*M)

// Reason: There are two nested loops.

// Space Complexity: O(M)

// Reason: We are using an external array of size ‘M+1’ to store only two rows.
function main() {
  const str1 = "abcd";
  const str2 = "anc";

  // Call the canYouMake function and print the result
  console.log(
    "The Minimum operations required to convert str1 to str2: " +
      canYouMake(str1, str2)
  );
}

// Call the main function to start the program
main();
