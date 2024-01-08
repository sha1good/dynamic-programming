// Print Longest Common Subsequence

// In the previous article Longest Common Subsequence, we learned to print the length of the longest common subsequence of two strings. In this article, we will learn to print the actual string of the longest common subsequence.

// Prereq: Longest Common Subsequence

function PrintLongestCommonSubsequenceUtil(
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
  if (stringOne[stringOneIndex - 1] === stringTwo[stringTwoIndex - 1]) {
    return (dp[stringOneIndex][stringTwoIndex] =
      1 +
      PrintLongestCommonSubsequenceUtil(
        stringOneIndex - 1,
        stringTwoIndex - 1,
        stringOne,
        stringTwo,
        dp
      ));
  }

  // If the characters don't match, consider two options: moving one index in either string
  return (dp[stringOneIndex][stringTwoIndex] = Math.max(
    PrintLongestCommonSubsequenceUtil(
      stringOneIndex - 1,
      stringTwoIndex,
      stringOne,
      stringTwo,
      dp
    ),
    PrintLongestCommonSubsequenceUtil(
      stringOneIndex,
      stringTwoIndex - 1,
      stringOne,
      stringTwo,
      dp
    )
  ));
}

function PrintLongestCommonSubsequence(
  stringOneIndex,
  stringTwoIndex,
  stringOne,
  stringTwo
) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
  let dp = Array.from(Array(stringOneIndex + 1), () =>
    Array(stringTwoIndex + 1).fill(-1)
  );

  return PrintLongestCommonSubsequenceUtil(
    stringOneIndex,
    stringTwoIndex,
    stringOne,
    stringTwo,
    dp
  );
}

// let stringOne = "acd";
// let stringTwo = "ced";

// let stringOneIndex = stringOne.length;
// let stringTwoIndex = stringTwo.length;

let string1 = "abcde";
let string2 = "bdgek";

let stringOneLength = string1.length;

let stringTwoLength = string2.length;

let result = PrintLongestCommonSubsequence(
  stringOneLength,
  stringTwoLength,
  string1,
  string2
);

let stringIndex = result - 1;

function bringMeTheString(
  stringIndex,
  string1,
  string2,
  stringOneLength,
  stringTwoLength
) {
  let string = "";

  //   for (let k = 0; k <= stringIndex; k++) {
  //     string += "$"; // dummy string
  //   }

  while (stringOneLength > 0 && stringTwoLength > 0) {
    if (string1[stringOneLength - 1] === string2[stringTwoLength - 1]) {
      string += string1[stringOneLength - 1];
      stringIndex--;
      stringOneLength--;
      stringTwoLength--;
    } else if (string1[stringOneLength - 1] > string2[stringTwoLength - 1]) {
      stringOneLength--;
    } else {
      stringTwoLength--;
    }
  }
  //let reversedString =  Array.from(string).reverse().join("");
  let reversedString = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  console.log(reversedString);
  return reversedString;
}

// Time Complexity: O(N*M) + O(n)

// Reason: There are N*M states therefore at max ‘N*M’ new problems will be solved and using while loop

// Space Complexity: O(N*M) + O(N+M)

// Reason: We are using an auxiliary recursion stack space(O(N+M)) (see the recursive tree,
//     in the worst case, we will go till N+M calls at a time) and a 2D array ( O(N*M)).
let res = bringMeTheString(
  stringIndex,
  string1,
  string2,
  stringOneLength,
  stringTwoLength
);
//console.log(res);

console.log("Generating the optimal Solution");

//Below  is the Approach

// As S1[2] != S2[1], we will move to the top cell (↑) as its value is greater than the left cell (←). Now i become 2 and j remains 1.
// As S1[1] == S2[0], we will add this character to str string and we will move to the top-left cell (↖) i becomes 1 and j becomes 1 and j becomes 0.
// As j is zero, we have hit the exit condition so we will break out of the loop and str contains the longest common subsequence.

function PrintLongestCommonSubsequenceTabUtil(
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
    } else if (string1[stringOneLength - 1] > string2[stringTwoLength - 1]) {
      stringOneLength--;
    } else {
      stringTwoLength--;
    }
  }

  let reversedString = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString;
}
function PrintLongestCommonSubsequenceTab(
  stringOneLength,
  stringTwoLength,
  string1,
  string2
) {
  let dp = Array.from({ length: stringOneLength + 1 }, () =>
    Array(stringTwoLength + 1).fill(-1)
  );

  return PrintLongestCommonSubsequenceTabUtil(
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
let rsultString = PrintLongestCommonSubsequenceTab(
  stringOneLength,
  stringTwoLength,
  string1,
  string2
);

console.log(rsultString);
