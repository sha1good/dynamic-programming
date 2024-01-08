// We are given two strings S1 and S2,
// we want to know how many distinct subsequences of S2 are present in S1.

// Given two strings s and t, return the number of distinct subsequences of s which equals t.

// The test cases are generated so that the answer fits on a 32-bit signed integer.

// Example 1:

// Input: s = "rabbbit", t = "rabbit"
// Output: 3
// Explanation:
// As shown below, there are 3 ways you can generate "rabbit" from s.
// rabbbit
// rabbbit
// rabbbit
// Example 2:

// Input: s = "babgbag", t = "bag"
// Output: 5
// Explanation:
// As shown below, there are 5 ways you can generate "bag" from s.
// babgbag
// babgbag
// babgbag
// babgbag
// babgbag

//Approaches
// if(S1[i]==S2[j]), call f(i-1,j-1) and f(i-1,j).
// if(S1[i]!=S2[j]), call f(i-1,j).
// Step 3:  Return the sum of choices

// As we have to return the total count, we will return the sum of f(i-1,j-1) and f(i-1,j) in case 1 and simply return f(i-1,j) in case 2.

// Base Cases:

// We are reducing i and j in our recursive relation, there can be two possibilities, either i becomes -1 or j becomes -1.

// if j<0, it means we have matched all characters of S2 with characters of S1, so we return 1.
// if i<0, it means we have checked all characters of S1 but we are not able to match all characters of S2, therefore we return 0.

// S1[i] == S2[j], now as the characters at i and j match, we would want to check the possibility of the remaining characters of S2 in S1
// therefore we reduce the length of both the strings by 1 and call the function recursively.

// Now, if we only make the above single recursive call,
// we are rejecting the opportunities to find more than one subsequences
// because it can happen that the jth character may match with more characters in S1[0…i-1],
// for example where there are more occurrences of ‘g’ in S1 from which also an answer needs to be explored.

function DistinctSubsequencesUtil(
  s1,
  s2,
  stringOneLength,
  stringTwoLength,
  dp
) {
  // If s2 has been completely matched, return 1 (found a valid subsequence)
  if (stringTwoLength === 0) {
    return 1;
  }

  // If s1 has been completely traversed but s2 hasn't, return 0 e.g  case of b and bag
  if (stringOneLength === 0) {
    return 0;
  }

  // If the result for this state has already been calculated, return it
  if (dp[stringOneLength][stringTwoLength] !== -1)
    return dp[stringOneLength][stringTwoLength];

  if (s1[stringOneLength - 1] === s2[stringTwoLength - 1]) {
    // If the characters match, consider two options: either leave one character in s1 and s2
    // or leave one character in s1 and continue matching s2
    return (dp[stringOneLength][stringTwoLength] =
      DistinctSubsequencesUtil(
        s1,
        s2,
        stringOneLength - 1,
        stringTwoLength - 1,
        dp
      ) +
      DistinctSubsequencesUtil(
        s1,
        s2,
        stringOneLength - 1,
        stringTwoLength,
        dp
      ));
  }

  // If characters don't match, just leave one character in s1 and continue matching s2
  return (dp[stringOneLength][stringTwoLength] = DistinctSubsequencesUtil(
    s1,
    s2,
    stringOneLength - 1,
    stringTwoLength,
    dp
  ));
}

function DistinctSubsequences(s1, s2, stringOneLength, stringTwoLength) {
  let dp = new Array(stringOneLength + 1)
    .fill(null)
    .map(() => new Array(stringTwoLength + 1).fill(-1));

  return DistinctSubsequencesUtil(s1, s2, stringOneLength, stringTwoLength, dp);
}

let s1 = "babgbag";
let s2 = "bag";

let stringOneLength = s1.length;
let stringTwoLength = s2.length;

// Time Complexity: O(N*M)

// Reason: There are N*M states therefore at max ‘N*M’ new problems will be solved.

// Space Complexity: O(N*M) + O(N+M)

// Reason: We are using a recursion stack space(O(N+M)) and a 2D array ( O(N*M)).
let result = DistinctSubsequences(s1, s2, stringOneLength, stringTwoLength);
console.log(result);

console.log("Tabulation Appraaoch");

// In the recursive logic, we set the base case too if(i<0 ) and if(j<0) but we can’t set the dp array’s index to -1. Therefore a hack for this issue is to shift every index by 1 towards the right.

// First we initialize the dp array of size [n+1][m+1] as zero.
// Next, we set the base condition (keep in mind 1-based indexing), we set the first column’s value as 1 and the first row as 1.
// Similarly, we will implement the recursive code by keeping in mind the shifting of indexes, therefore S1[i] will be converted to S1[i-1]. Same for S2.
// At last, we will print dp[N][M] as our answer.

function DistinctSubsequencesTabUtil(
  s1,
  s2,
  stringOneLength,
  stringTwoLength,
  dp
) {
  // Initialize the first column with 1 because there is exactly one way to form an empty subsequence
  for (let i = 0; i <= stringOneLength; i++) {
    dp[i][0] = 1;
  }

  // Initialize the first row with 0 because there is no way to form a non-empty subsequence from an empty string
  for (let j = 1; j <= stringTwoLength; j++) {
    dp[0][j] = 0;
  }

  // Fill the dp array using dynamic programming
  for (let i = 1; i <= stringOneLength; i++) {
    for (let j = 1; j <= stringTwoLength; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[stringOneLength][stringTwoLength];
}
function DistinctSubsequencesTab(s1, s2, stringOneLength, stringTwoLength) {
  let dp = Array.from(Array(stringOneLength + 1), () =>
    Array(stringTwoLength + 1).fill(0)
  );

  return DistinctSubsequencesTabUtil(
    s1,
    s2,
    stringOneLength,
    stringTwoLength,
    dp
  );
}

// Time Complexity: O(N*M)

// Reason: There are N*M states therefore at max ‘N*M’ new problems will be solved.

// Space Complexity: O(N*M)

// Reason: We are using a 2D array ( O(N*M)).
let res = DistinctSubsequencesTab(s1, s2, stringOneLength, stringTwoLength);
console.log(result);

//Space  Optimzation

console.log("Space Optimzation");

function DistinctSubsequencesSpaceOptimzation(
  s1,
  s2,
  stringOneLength,
  stringTwoLength
) {
  // Create  two array to store dynamic programming values
  let previous = new Array(stringTwoLength + 1).fill(0);
  let current = new Array(stringTwoLength + 1).fill(0);

  // Initialize the first column with 1 because there is exactly one way to form an empty subsequence
  previous[0] = current[0] = 1;

  // Initialize the first row with 0 because there is no way to form a non-empty subsequence from an empty string
  // for (let j = 1; j <= stringTwoLength; j++) {
  //   dp[0][j] = 0;
  // }   // I commented  this out because all the rows haa been assigned 0 values already using the prev

  // Fill the dp array using dynamic programming
  for (let i = 1; i <= stringOneLength; i++) {
    for (let j = 1; j <= stringTwoLength; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        current[j] = previous[j - 1] + previous[j];
      } else {
        current[j] = previous[j];
      }
    }
    // The result is stored in the last element of the prev array
    previous.splice(0, stringTwoLength + 1, ...current); // or this previous = current; ///
  }

  return previous[stringTwoLength];
}

// Time Complexity: O(N*M)

// Reason: There are two nested loops.

// Space Complexity: O(M)

// Reason: We are using an external array of size ‘M+1’ to store only one row.
let rsult = DistinctSubsequencesSpaceOptimzation(
  s1,
  s2,
  stringOneLength,
  stringTwoLength
);
console.log(rsult);
