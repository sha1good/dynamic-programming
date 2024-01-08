// We are given two strings ‘S1’ and ‘S2’. We need to return their shortest common supersequence.
// A supersequence is defined as the string which contains both the strings S1 and S2 as subsequences.

// Now, let us see what were the conditions that we used while forming the dp array:

// if(S1[i-1] == S2[j-1]), then return 1 + dp[i-1][j-1]
// if(S1[i-1] != S2[j-1]) , then return 0 + max(dp[i-1][j],dp[i][j-1])
// Approach:

// We will start from the right-most cell of the dp array, initially i=n and j=m

// To form the string, we will work in a reverse manner.

// if(S1[i-1] == S2[j-1]), this means the character is an lcs character and needs to be included only once from both the strings, so we add it to the ans string and reduce both i and j by 1. We reduce them simultaneously to make sure the character is counted only once.
// if(S1[i-1] != S2[j-1]), this means that the character is a non-lcs character and then we move the pointer to the top cell or left cell depending on which is greater. This way non-lcs characters will be included separately in the right order.
// The algorithm steps are stated below:

// We start from cell dp[n][m]. Initially i=n and j=m.
// At every cell, we will check if S1[i-1] == S2[j-1], if it is then it means this character is a part of the longest common subsequence. So we will push it to the ans string str. Then we will move to the diagonally top-left(↖)  cell by assigning i to i-1 and j to j-1.
// Else, this character is not a part of the longest common subsequence so we include it in ans string. Originally this cell got its value from its left cell (←) or from its top cell (↑). Whichever cell’s value will be more of the two, we will move to that cell.
// We will continue till i>0 and j>0, failing it we will break from the loop.
// After breaking, either i>0 or j>0 (only one condition will fail to break from the while loop), if(i>0) we push all the characters from S1 to ans string, else if(j>0), we push all the remaining characters from S2.
// At last, we reverse the ‘ans’ string and we get our answer.

function PrintShortestCommonSupersequenceTabUtil(
  stringOneLength,
  stringTwoLength,
  string1,
  string2,
  dp
) {
  //creating the base  cases

  for (let j = 0; j <= stringTwoLength; j++) {
    dp[0][j] = 0;
  }
  for (let i = 0; i <= stringOneLength; i++) {
    dp[i][0] = 0;
  }

  for (let i = 1; i <= stringOneLength; i++) {
    for (let j = 1; j <= stringTwoLength; j++) {
      if (string1[i - 1] === string2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let result = dp[stringOneLength][stringTwoLength];

  let stringIndex = result - 1; //   The result variable printed the length  of the longest subsequence

  let string = "";

  while (stringOneLength > 0 && stringTwoLength > 0) {
    if (string1[stringOneLength - 1] === string2[stringTwoLength - 1]) {
      string += string1[stringOneLength - 1];
      stringIndex--;
      stringOneLength--;
      stringTwoLength--;
    } else if (
      dp[stringOneLength - 1][stringTwoLength] >
      dp[stringOneLength][stringTwoLength - 1]
    ) {
      string += string1[stringOneLength - 1];
      stringOneLength--;
    } else {
      string += string2[stringTwoLength - 1];
      stringTwoLength--;
    }
  }

  //Adding Remaing Characters - Only one of the below two while loops will run
  while (stringOneLength > 0) {
    string += string1[stringOneLength - 1];
    stringOneLength--;
  }

  while (stringOneLength > 0) {
    string += string2[stringTwoLength - 1];
    stringTwoLength--;
  }

  let reversedString = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString;
}
function PrintShortestCommonSupersequenceTab(
  stringOneLength,
  stringTwoLength,
  string1,
  string2
) {
  //let dp = Array.from({ length: stringOneLength + 1 }, () =>
  // Array(stringTwoLength + 1).fill(-1)
  //);
  let dp = new Array(stringOneLength + 1)
    .fill(null)
    .map(() => new Array(stringTwoLength + 1).fill(-1));

  return PrintShortestCommonSupersequenceTabUtil(
    stringOneLength,
    stringTwoLength,
    string1,
    string2,
    dp
  );
}

// Time Complexity: O(N*M)

// Reason: There are two nested loops

// Space Complexity: O(N*M)

// Reason: We are using an external array of size ‘N*M’. Stack Space is eliminated.

let stringOne = "brute";
let stringTwo = "groot";

let stringOneLength = stringOne.length;
let stringTwoLength = stringTwo.length;

// The Longest Common Supersequence is bgruoote
// Time Complexity: O(N*M)
// Reason: There are two nested loops
// Space Complexity: O(N*M)
// Reason: We are using an external array of size (N*M).
let rsultString = PrintShortestCommonSupersequenceTab(
  stringOneLength,
  stringTwoLength,
  stringOne,
  stringTwo
);

console.log(rsultString);
