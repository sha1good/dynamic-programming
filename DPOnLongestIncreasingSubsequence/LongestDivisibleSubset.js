// Given a set of distinct positive integers nums,
// return the largest subset answer such that every
// pair (answer[i], answer[j]) of elements in this subset satisfies:

// answer[i] % answer[j] == 0, or
// answer[j] % answer[i] == 0
// If there are multiple solutions, return any of them.

// Example 1:

// Input: nums = [1,2,3]
// Output: [1,2]
// Explanation: [1,3] is also accepted.
// Example 2:

// Input: nums = [1,2,4,8]
// Output: [1,2,4,8]

// Constraints:

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 2 * 109
// All the integers in nums are unique.

function divisibleSet(array) {
  let n = array.length;

  // Sort the input array in ascending order
  array.sort((a, b) => a - b);
  // Initialize two arrays for dynamic programming: dp and hash
  let dp = new Array(n).fill(1);
  let hash = new Array(n).fill(1);

  let maxi = 0;
  let lastIndex = -1;

  // Iterate through the elements of the input array
  for (let currentIndex = 0; currentIndex < n; currentIndex++) {
    hash[currentIndex] = currentIndex; // Initialize hash with the current index
    for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
      if (
        array[currentIndex] % array[prevIndex] === 0 &&
        1 + dp[prevIndex] > dp[currentIndex]
      ) {
        dp[currentIndex] = 1 + dp[prevIndex];
        hash[currentIndex] = prevIndex;
      }
    }

    if (dp[currentIndex] > maxi) {
      maxi = dp[currentIndex];
      lastIndex = currentIndex;
    }
  }

  let temp = [];
  temp.push(array[lastIndex]);

  while (hash[lastIndex] !== lastIndex) {
    lastIndex = hash[lastIndex];
    temp.push(array[lastIndex]);
  }

  // then reverse the array
  temp.reverse();

  return temp;
}

// Main function
// The longest divisible subset elements are: 1 4 8 16

// Time Complexity: O(N*N) + O(N)

// Reason: There are two nested loops and  the external While loop

// Space Complexity: O(N)

// Reason: We are only using two rows of size n.
function main() {
  const arr = [1, 16, 7, 8, 4];

  const ans = divisibleSet(arr);
  console.log("The longest divisible subset elements are:", ans.join(" "));
}

main();
