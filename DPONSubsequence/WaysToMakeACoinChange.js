// We are given an array Arr with N distinct coins and a target. We have an infinite supply of each coin denomination. We need to find the number of ways we sum up the coin values to give us the target.

// Each coin can be used any number of times.

function countWaysToMakeChangeUtil(arr, ind, T, dp) {
  // Base case: If we have reached the first coin in the array
  if (ind === 0) {
    // Check if 'T' is divisible by the coin value
    return T % arr[0] === 0 ? 1 : 0;
  }

  // If the result for this combination of 'ind' and 'T' has already been calculated, return it
  if (dp[ind][T] !== -1) return dp[ind][T];

  // Initialize variables to store results
  let notTaken = countWaysToMakeChangeUtil(arr, ind - 1, T, dp);

  let taken = 0;
  if (arr[ind] <= T)
    taken = countWaysToMakeChangeUtil(arr, ind, T - arr[ind], dp);

  // Store and return the result
  return (dp[ind][T] = notTaken + taken);
}

// Define a function to count the total number of ways to make change for 'T'
function countWaysToMakeChange(arr, n, T) {
  // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
  const dp = Array.from({ length: n }, () => Array(T + 1).fill(-1));

  // Call the recursive utility function to calculate the result
  return countWaysToMakeChangeUtil(arr, n - 1, T, dp);
}

// Main function
function main() {
  const arr = [1, 2, 3];
  const target = 4;
  const n = arr.length;

  // Call the countWaysToMakeChange function and print the result
  console.log(
    "The total number of ways is " + countWaysToMakeChange(arr, n, target)
  );
}

// Call the main function to start the program
main();

function countWaysToMakeChange(arr, n, T) {
    // Create a 2D array 'dp' to store dynamic programming results, initialized with 0
    const dp = Array.from({ length: n }, () => Array(T + 1).fill(0));
    
    // Initializing the base condition for the first coin in the array
    for (let i = 0; i <= T; i++) {
        if (i % arr[0] === 0)
            dp[0][i] = 1;
        // Else condition is automatically fulfilled,
        // as dp array is initialized to zero
    }
    
    // Populating the dp array using nested loops
    for (let ind = 1; ind < n; ind++) {
        for (let target = 0; target <= T; target++) {
            const notTaken = dp[ind - 1][target];
            
            let taken = 0;
            if (arr[ind] <= target)
                taken = dp[ind][target - arr[ind]];
                
            dp[ind][target] = notTaken + taken;
        }
    }
    
    // The result is stored in the bottom-right cell of the dp array
    return dp[n - 1][T];
}

// Main function
// Time Complexity: O(N*T)

// Reason: There are two nested loops

// Space Complexity: O(N*T)

// Reason: We are using an external array of size ‘N*T’. Stack Space is eliminated.
function main() {
    const arr = [1, 2, 3];
    const target = 4;
    const n = arr.length;

    // Call the countWaysToMakeChange function and print the result
    console.log("The total number of ways is " + countWaysToMakeChange(arr, n, target));
}

// Call the main function to start the program
main();




function countWaysToMakeChange(arr, n, T) {
    // Initialize an array 'prev' to store dynamic programming results, initialized with 0
    let prev = new Array(T + 1).fill(0);
    
    // Initializing the base condition for the first coin in the array
    for (let i = 0; i <= T; i++) {
        if (i % arr[0] === 0)
            prev[i] = 1;
        // Else condition is automatically fulfilled,
        // as 'prev' array is initialized to zero
    }
    
    // Populating the 'cur' array using nested loops
    for (let ind = 1; ind < n; ind++) {
        // Initialize an array 'cur' for the current iteration
        let cur = new Array(T + 1).fill(0);
        for (let target = 0; target <= T; target++) {
            const notTaken = prev[target];
            
            let taken = 0;
            if (arr[ind] <= target)
                taken = cur[target - arr[ind]];
                
            cur[target] = notTaken + taken;
        }
        // Update 'prev' to be the same as 'cur' for the next iteration
        prev = [...cur];
    }
    
    // The result is stored in the last element of the 'prev' array
    return prev[T];
}

// Main function
//  
function main() {
    const arr = [1, 2, 3];
    const target = 4;
    const n = arr.length;

    // Call the countWaysToMakeChange function and print the result
    console.log("The total number of ways is " + countWaysToMakeChange(arr, n, target));
}

// Call the main function to start the program
main();
