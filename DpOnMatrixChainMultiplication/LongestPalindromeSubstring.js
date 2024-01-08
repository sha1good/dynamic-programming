function isPalindrome(start, end, string) {
  while (start < end) {
    if (string[start] !== string[end]) {
      return false;
    }
    start++;
    end--;
  }

  return true;
}

function findLongestPalindrome(start, end, string) {
  // if the string at start is the same as the string at end, I will return one of them
  if (start === end) {
    // Single character is a palindrome
    return string[start];
  }

  if (start > end || !isPalindrome(start, end, string)) {
    return "";
  }

  // expand around center
  while (
    start > 0 &&
    end < string.length - 1 &&
    string[start - 1] === string[end + 1]
  ) {
    start--; // by decreasing start
    end++; // by increasing the right index
  }

  return string.substring(start, end + 1);
}

function longestPalindromeSubstring(string) {
  let longestString = "";

  function exploreSubstrings(start) {
    //Define the base case
    if (start === string.length) {
      return;
    }

    for (let end = start; end < string.length; end++) {
      let currentPalindrome = findLongestPalindrome(start, end, string);
      if (currentPalindrome.length > longestString.length) {
        longestString = currentPalindrome;
      }
      exploreSubstrings(start + 1);
    }
  }

  //Start from the 0
  exploreSubstrings(0);

  return longestString;
}

// Example usage:
const inputString = "yabah";
const result = longestPalindromeSubstring(inputString);
console.log("Longest palindromic substring:", result);

function isPalindromeMemo(start, end, string) {
  while (start < end) {
    if (string[start] !== string[end]) {
      return false;
    }
    start++;
    end--;
  }

  return true;
}

function findLongestPalindromeMemo(start, end, string) {
  // if the string at start is the same as the string at end, I will return one of them
  if (start === end) {
    // Single character is a palindrome
    return string[start];
  }

  if (start > end || !isPalindromeMemo(start, end, string)) {
    return "";
  }

  // expand around center
  while (
    start > 0 &&
    end < string.length - 1 &&
    string[start - 1] === string[end + 1]
  ) {
    start--; // by decreasing start
    end++; // by increasing the right index
  }

  return string.substring(start, end + 1);
}

function longestPalindromeSubstringMeno(string) {
  let longestString = "";
  let dp = new Array(string.length).fill(-1);
  function exploreSubstringsMemo(start, dp) {
    //Define the base case
    if (start === string.length) {
      return;
    }
    if (dp[start] !== -1) return dp[start];
    for (let end = start; end < string.length; end++) {
      let currentPalindrome = findLongestPalindromeMemo(start, end, string);
      if (currentPalindrome.length > longestString.length) {
        longestString = currentPalindrome;
      }
      dp[start] = exploreSubstringsMemo(start + 1, dp);
    }
  }

  //Start from the 0
  exploreSubstringsMemo(0, dp);

  return longestString;
}

// Example usage:
const input = "yabah";
const res = longestPalindromeSubstringMeno(input);
console.log("Longest palindromic substring for Memo:", res);
