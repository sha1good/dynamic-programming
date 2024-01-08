function PrintingLongestIncreasingSubsequenceUtil(
  array,
  currentIndex,
  prevIndex,
  n,
  dp
) {
  // Base condition
  if (currentIndex < 0) return 0;
  // Note, I am using prevIndex+ 1 here because I am using 1 -base indexing -1+ 1 ===0
  if (dp[currentIndex][prevIndex] !== -1) return dp[currentIndex][prevIndex];

  // Initialize variables for "not taking" and "taking" the current element
  let nottaken =
    0 +
    PrintingLongestIncreasingSubsequenceUtil(
      array,
      currentIndex - 1,
      prevIndex,
      n,
      dp
    );
  let taken = 0;

  // Check if the current element can be included (if it's greater than the previous element)
  //So, if it is,  prevIndex === currentIndex
  if (prevIndex === n || array[currentIndex] > array[prevIndex]) {
    taken =
      1 +
      PrintingLongestIncreasingSubsequenceUtil(
        array,
        currentIndex - 1,
        currentIndex,
        n,
        dp
      );
  }
  // Store the result in dp and return the maximum
  dp[currentIndex][prevIndex] = Math.max(taken, nottaken);
  return dp[currentIndex][prevIndex];
}

function PrintingLongestIncreasingSubsequence(array) {
  let n = array.length;

  // Create a 2D dp array filled with -1 to store computed results
  let dp = Array.from(Array(n), () => Array(n + 1).fill(-1));
  console.log(dp);
  // Call the recursive function to compute the length of the longest increasing subsequence
  return PrintingLongestIncreasingSubsequenceUtil(array, n - 1, n, n, dp);
}

// Time Complexity: O(N*N)

// Reason: There are N*N states therefore at max ‘N*N’ new problems will be solved.

// Space Complexity: O(N*N) + O(N)

// Reason: We are using an auxiliary recursion stack space(O(N)) (
// see the recursive tree, in the worst case we will go till N calls at a time) and a 2D array ( O(N*N+1)).
function main() {
  let array = [10, 9, 2, 5, 3, 7, 101, 18];

  let result = PrintingLongestIncreasingSubsequence(array);
  console.log("The length of the longest increasing subsequence is", result);
}

main();

console.log("This the tabualation solution");

function PrintingLongestIncreasingSubsequenceTab(array) {
  let n = array.length;

  // Create a 2D dp array filled with -1 to store computed results
  let dp = Array.from(Array(n + 1), () => Array(n + 1).fill(0));

  console.log(dp);

  for (let prevIndex = n - 1; prevIndex >= 0; prevIndex--) {
    dp[n][prevIndex] = 0;
  }
  // Call the recursive function to compute the length of the longest increasing subsequence
  for (let currentIndex = n - 1; currentIndex >= 0; currentIndex--) {
    for (prevIndex = currentIndex - 1; prevIndex >= -1; prevIndex--) {
      let nottaken = 0 + dp[currentIndex + 1][prevIndex + 1];
      let taken = 0;

      // Check if the current element can be included (if it's greater than the previous element)
      //So, if it is,  prevIndex === currentIndex
      if (prevIndex === -1 || array[currentIndex] > array[prevIndex]) {
        taken = 1 + dp[currentIndex + 1][currentIndex + 1];
      }
      dp[currentIndex][prevIndex + 1] = Math.max(taken, nottaken);
    }
  }
  return dp[0][0];
}

function Sheriff() {
  let array = [10, 9, 2];

  let result = PrintingLongestIncreasingSubsequenceTab(array);
  console.log("The length of the longest increasing subsequence is", result);
}

Sheriff();

function PrintingLongestIncreasingSubsequence(array) {
  let n = array.length;
  let dp = new Array(n).fill(1);
  let hash = new Array(n).fill(1);
  let maxi = 1;
  let lastIndex = -1;

  for (let currentIndex = 0; currentIndex <= n - 1; currentIndex++) {
    hash[currentIndex] = currentIndex;
    //previous Index is starting from -1, so we are using 1 base indexing here
    for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
      if (
        array[prevIndex] < array[currentIndex] &&
        1 + dp[prevIndex] > dp[currentIndex]
      ) {
        dp[currentIndex] = 1 + dp[prevIndex];
        hash[currentIndex] = prevIndex;
      }
    }

    if (dp[currentIndex] > maxi) {
      maxi = dp[currentIndex];
      lastIndex = currentIndex;
      console.log("This is the current index " + lastIndex);
    }
  }

  let temp = [];
  temp.push(array[lastIndex]);

  console.log(temp);
  console.log(hash[lastIndex]);
  while (hash[lastIndex] !== lastIndex) {
    lastIndex = hash[lastIndex];
    temp.push(array[lastIndex]);
  }
  temp.reverse();
  console.log(temp);
  console.log("The subsequence elements are " + temp.join(" "));

  return maxi;
}

function Ola() {
  let array = [5, 4, 11, 1, 16, 8];

  let result = PrintingLongestIncreasingSubsequence(array);
  console.log("The length of the longest increasing subsequence is", result);
}

Ola();
