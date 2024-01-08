// Given an integer array arr, partition the array into (contiguous) subarrays of length at most k.
//After partitioning, each subarray has their values changed to become the maximum value of that subarray.

// Return the largest sum of the given array after partitioning.
//Test cases are generated so that the answer fits in a 32-bit integer.

// Example 1:

// Input: arr = [1,15,7,9,2,5,10], k = 3
// Output: 84
// Explanation: arr becomes [15,15,15,9,10,10,10]
// Example 2:

// Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
// Output: 83
// Example 3:

// Input: arr = [1], k = 1
// Output: 1

// Constraints:

// 1 <= arr.length <= 500
// 0 <= arr[i] <= 109
// 1 <= k <= arr.length

// Function maxSumAfterPartitioningUtil to recursively calculate the maximum sum
function maxSumAfterPartitioningUtil(index, k, n, array) {
  // Base case: If ind reaches the end of the array, return 0
  if (index === n) return 0;

  let maxi = Number.MIN_SAFE_INTEGER;
  let maxAns = -Infinity;
  let lenght = 0;
  // Loop through the array from index 'index' up to 'index + k' or 'n', whichever is smaller
  for (let j = index; j < Math.min(index + k, n); j++) {
    lenght++;
    console.log(j);
    maxi = Math.max(maxi, array[j]);

    // Calculate the sum for the current partition and recursive call
    let maxSum =
      lenght * maxi + maxSumAfterPartitioningUtil(j + 1, k, n, array);
    maxAns = Math.max(maxAns, maxSum);
  }

  return maxAns;
}

function maxSumAfterPartitioning(array, k) {
  let n = array.length;
  return maxSumAfterPartitioningUtil(0, k, n, array);
}

// Main function
function main() {
  const num = [1, 15, 7, 9, 2, 5, 10];
  const k = 3;
  const maxSum = maxSumAfterPartitioning(num, k);
  console.log("The maximum sum is:", maxSum);
}

// Call the main function
main();
