function longestIncreasingSubsequence(array) {
  let n = array.length;

  // Create an empty array 'temp' to store the increasing subsequence
  let temp = [array[0]];

  // Initialize the length of the longest increasing subsequence
  let length = 1;
  // Iterate through the input array starting from the second element
  for (let i = 1; i < n; i++) {
    // If arr[i] is greater than the last element of 'temp', it extends the subsequence
    if (array[i] > temp[temp.length - 1]) {
      temp.push(array[i]);
      length++;
    } else {
      // If not, we find the index where arr[i] can replace an element in 'temp' aray
      let index = temp.findIndex((element) => element >= array[i]);
      temp[index] = array[i];
    }
  }

  //return the lenght
  return length;
}

//NOTE THIS TEMP ARRAY IS NOT A LIS
// The length of the longest increasing subsequence is 4

// Time Complexity: O(N*logN)

// Reason: We iterate over the array of size N and in every iteration,
// we perform a binary search which takes logN time.

// Space Complexity: O(N)

// Reason: We are using an extra array of size N to store the temp variable.
function main() {
  const array = [10, 9, 2, 5, 3, 7, 101, 18];

  let result = longestIncreasingSubsequence(array);

  console.log("The length of the longest increasing subsequence is", result);
}

main();
