// // Problem Statement:  Introduction To Dynamic Programming

// // In this article, we will be going to understand the concept of dynamic programming.

// // Dynamic Programming can be described as storing answers to various sub-problems to be used later whenever required to solve the main problem.

// // The two common dynamic programming approaches are:

// // Memoization: Known as the “top-down” dynamic programming, usually the problem is solved in the direction of the main problem to the base cases.
// // Tabulation: Known as the “bottom-up ” dynamic programming, usually the problem is solved in the direction of solving the base cases to the main problem
// // Note: The base case does not always mean smaller input. It depends upon the implementation of the algorithm.

// Steps to memoize a recursive solution:

// Any recursive solution to a problem can be memoized using these three steps:

// Create a dp[n+1] array initialized to -1.
// Whenever we want to find the answer of a particular value (say n), we first check whether the answer is already calculated using the dp array(i.e dp[n]!= -1 ).
//If yes, simply return the value from the dp array.
// If not, then we are finding the answer for the given value for the first time,
//we will use the recursive relation as usual but before returning from the function, we will set dp[n] to the solution we get.

function dpFunction(n, dpArray) {
  if (n <= 1) return n;

  //Check if we already stored / memoized the value of the previous dpArray computation
  if (dpArray[n] != -1) return dpArray[n];
  // if it is not, we will compute it for the first time and store it in dpArray
  return (dpArray[n] = dpFunction(n - 1, dpArray) + dpFunction(n - 2, dpArray));
}

let n = 5;

let dpArray = new Array(n + 1).fill(-1);

//Time Complexity: O(N)
// Reason: The overlapping subproblems will return the answer in constant time O(1). Therefore the total number of new subproblems we solve is ‘n’. Hence total time complexity is O(N).
// Space Complexity: O(N)
// Reason: We are using a recursion stack space(O(N)) and an array (again O(N)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
let result = dpFunction(n, dpArray);

console.log(result);

//Tabulation : Bottom Up : We are going from Base Case to the required Solution
// Step 1: dp(n + 1), initialized the array
//Step 2: Declare the Base case dp[0] = 1, dp[1] = 1
//Step 3: dp[i] =  dp[ i-1] + dp[i -2]

function dpFunctionTabulation(m) {
  let dpArrayTabulation = Array(m + 1).fill(-1);
  dpArrayTabulation[0] = 0;
  dpArrayTabulation[1] = 1;

  for (let i = 2; i <= m; i++) {
    dpArrayTabulation[i] = dpArrayTabulation[i - 1] + dpArrayTabulation[i - 2];
  }

  return dpArrayTabulation[m];
}

//Time  Complexity is O(n)
//Space Complexity is O(n) cos we have been able to remove the stack space used during memoization
let m = 5;
let result1 = dpFunctionTabulation(m);

console.log(result1);

// Part 3: Space Optimization

// If we closely look at the relation,

// dp[i] =  dp[i-1] + dp[i-2]

// we see that for any i, we do need only the last two values in the array. So is there a need to maintain a whole array for it?

// The answer is ‘No’. Let us call dp[i-1] as prev and dp[i-2] as prev2. Now understand the following illustration.

// Each iteration’s cur_i and prev becomes the next iteration’s prev and prev2 respectively.
// Therefore after calculating cur_i, if we update prev and prev2 according to the next step, we will always get the answer.
// After the iterative loop has ended we can simply return prev as our answer.

function dpFunctionTabulationSpaceOptimizing(m) {
  let previous2 = 0;
  let previous1 = 1;

  for (let i = 2; i <= m; i++) {
    let currentI = previous1 + previous2;
    previous2 = previous1;
    previous1 = currentI;
  }
  return previous1;
}

let k = 5;

// Time Complexity: O(N)
// Reason: We are running a simple iterative loop
// Space Complexity: O(1)
// Reason: We are not using any extra space

let res = dpFunctionTabulationSpaceOptimizing(m);
console.log(res);
