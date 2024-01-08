// You are given an array of words where each word consists of lowercase English letters.

// wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.

// For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
// A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

// Return the length of the longest possible word chain with words chosen from the given list of words.

// Example 1:

// Input: words = ["a","b","ba","bca","bda","bdca"]
// Output: 4
// Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
// Example 2:

// Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
// Output: 5
// Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
// Example 3:

// Input: words = ["abcd","dbqca"]
// Output: 1
// Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
// ["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.

// Constraints:

// 1 <= words.length <= 1000
// 1 <= words[i].length <= 16
// words[i] only consists of lowercase English letters.

function checkIfPossible(word1, word2) {
  if (word1.length !== word2.length + 1) return false;
  let first = 0;
  let second = 0;

  while (first < word1.length) {
    if (second < word2.length && word1[first] === word2[second]) {
      first++;
      second++;
    } else {
      first++;
    }
  }

  return first === word1.length && second === word2.length;
}

// function comp(s1, s2) {
//   return s1.length < s2.length;
// }

function longestStringChain(words) {
  let n = words.length;
  words.sort((string1, string2) => string1.length - string2.length);
  console.log(words);
  let dp = new Array(n).fill(1);
  let maxi = 1;

  for (let currentIndex = 0; currentIndex < n; currentIndex++) {
    for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
      if (
        checkIfPossible(words[currentIndex], words[prevIndex]) &&
        1 + dp[prevIndex] > dp[currentIndex]
      ) {
        dp[currentIndex] = 1 + dp[prevIndex];
      }
    }

    if (dp[currentIndex] > maxi) {
      maxi = dp[currentIndex];
    }
  }
  return maxi;
}

// Main function
function main() {
  const words = ["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"]; //["a", "b", "ba", "bca", "bda", "bdca"];

  const result = longestStringChain(words);
  console.log("The length of the longest string chain is:", result);
}

// Call the main function
main();
