// Let us first understand what a bitonic subsequence means.

// A bitonic subsequence is a subsequence of an array in which the elements can be any of these three:

// First, increase till a point and then decrease.
// Goes on increasing (Longest increasing subsequence)
// Goes on decreasing (Longest decreasing subsequence)

function LongestBitonicSubsequence(array) {
  let n = array.length;
  // Initialize two arrays to store increasing and decreasing subsequences
  const dp1 = new Array(n).fill(1); // dp1[i] stores the length of the longest increasing subsequence ending at index i
  const dp2 = new Array(n).fill(1); // dp2[i] stores the length of the longest decreasing subsequence starting at index i

  let maxi = 1;
  // Compute the longest increasing subsequence from left to right
  for (let currentIndex = 0; currentIndex <= n - 1; currentIndex++) {
    for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
      if (array[prevIndex] < array[currentIndex]) {
        dp1[currentIndex] = Math.max(dp1[currentIndex], 1 + dp1[prevIndex]);
      }
    }
  }

  // Compute the longest decreasing subsequence from right to left
  for (let currentIndex = n - 1; currentIndex >= 0; currentIndex--) {
    for (let prevIndex = n - 1; prevIndex > currentIndex; prevIndex--) {
      if (array[prevIndex] < array[currentIndex]) {
        dp2[currentIndex] = Math.max(dp2[currentIndex], 1 + dp2[prevIndex]);
      }
    }
    maxi = Math.max(maxi, dp1[currentIndex] + dp2[currentIndex] - 1);
  }

  return maxi;
}

function Ola() {
  let array = [1, 11, 2, 10, 4, 5, 2, 1];

  let result = LongestBitonicSubsequence(array);
  console.log(
    "The length of the longest increasing subsequence Optimzal",
    result
  );
}

Ola();
