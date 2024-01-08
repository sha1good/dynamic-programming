// Main function

function findNumberOfLIS(arr) {
  const n = arr.length;

  // Initialize two arrays to store the length and count of LIS ending at each index
  const dp = new Array(n).fill(1); // dp[i] stores the length of the LIS ending at index i
  const ct = new Array(n).fill(1); // ct[i] stores the count of LIS ending at index i

  let maxi = 1; // Initialize the maximum LIS length

  for (let currentIndex = 0; currentIndex < n; currentIndex++) {
    for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
      if (
        arr[prevIndex] < arr[currentIndex] &&
        1 + dp[prevIndex] > dp[currentIndex]
      ) {
        dp[currentIndex] = 1 + dp[prevIndex];
        ct[currentIndex] = ct[prevIndex]; // Inherit count from the previous index
      } else if (
        arr[prevIndex] < arr[currentIndex] &&
        1 + dp[prevIndex] === dp[currentIndex]
      ) {
        ct[currentIndex] += ct[prevIndex]; // Increase count if there are multiple LIS with the same length
      }
    }
    maxi = Math.max(maxi, dp[currentIndex]); // Update the maximum LIS length
  }

  let numberOfLIS = 0;
  for (let i = 0; i < n; i++) {
    if (dp[i] === maxi) {
      numberOfLIS += ct[i]; // Sum counts of LIS with the maximum length
    }
  }

  return numberOfLIS;
}

function main() {
  const arr = [1, 5, 4, 3, 2, 6, 7, 2];

  const result = findNumberOfLIS(arr);
  console.log("The count of Longest Increasing Subsequences (LIS) is:", result);
}

// Call the main function
main();

function findNumberOfLISOla(arr) {
  const n = arr.length;

  // Initialize two arrays to store the length and count of LIS ending at each index
  const dp = new Array(n).fill(1); // dp[i] stores the length of the LIS ending at index i
  const ct = new Array(n).fill(1); // ct[i] stores the count of LIS ending at index i

  let maxi = 1; // Initialize the maximum LIS length

  for (let currentIndex = 0; currentIndex < n; currentIndex++) {
    for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
      if (
        arr[prevIndex] < arr[currentIndex] &&
        1 + dp[prevIndex] > dp[currentIndex]
      ) {
        dp[currentIndex] = 1 + dp[prevIndex];
        ct[currentIndex] = ct[prevIndex]; // Inherit count from the previous index
      } else if (
        arr[prevIndex] < arr[currentIndex] &&
        1 + dp[prevIndex] === dp[currentIndex]
      ) {
        ct[currentIndex] += ct[prevIndex]; // Increase count if there are multiple LIS with the same length
      }
    }
    maxi = Math.max(maxi, dp[currentIndex]); // Update the maximum LIS length
  }
  const numberOfLIS = ct.reduce(
    (previousValue, currentValue, currentIndex) =>
      dp[currentIndex] === maxi ? previousValue + currentValue : previousValue,
    0
  );
  return numberOfLIS;
}
// another solution
function ola() {
  const arr = [1, 5, 4, 3, 2, 6, 7, 2];
  const result = findNumberOfLISOla(arr);
  console.log(
    "The count of Longest Increasing Subsequences (LIS) from Ola:",
    result
  );
}

// Call the main function
ola();
