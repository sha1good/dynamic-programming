// You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

// Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

// Note:

// You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
// The transaction fee is only charged once for each stock purchase and sale.

// Example 1:

// Input: prices = [1,3,2,8,4,9], fee = 2
// Output: 8
// Explanation: The maximum profit can be achieved by:
// - Buying at prices[0] = 1
// - Selling at prices[3] = 8
// - Buying at prices[4] = 4
// - Selling at prices[5] = 9
// The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
// Example 2:

// Input: prices = [1,3,7,5,10,3], fee = 3
// Output: 6

// Constraints:

// 1 <= prices.length <= 5 * 104
// 1 <= prices[i] < 5 * 104
// 0 <= fee < 5 * 104

    function getMaximumProfitUtilWithFees(index, buy, n, price, dp, fee) {
    // Base case
    if (index === n) {
        return 0; // There is no more money you can make from  the market
    }

    // Check if the result for the current indices is already calculated

    if (dp[index][buy] !== -1) return dp[index][buy];

    let profit = 0;

    if (buy) {
        profit = Math.max(
        -price[index] +
            getMaximumProfitUtilWithFees(index + 1, 0, n, price, dp, fee), //   Not allowed to Buy
        0 + getMaximumProfitUtilWithFees(index + 1, 1, n, price, dp, fee) // Allow to  buy
        );
    } else {
        profit = Math.max(
        price[index] -
            fee +
            getMaximumProfitUtilWithFees(index + 1, 1, n, price, dp, fee), //Sell
        0 + getMaximumProfitUtilWithFees(index + 1, 0, n, price, dp, fee)
        ); // Not sell
    }
    return profit;
    }

    function getMaximumProfitWithFee(n, price, fee) {
    //I passed 2 here because there are two states of buy. Either I buy it or  I dot buy it
    let dp = Array.from(Array(n), () => Array(2).fill(-1));
    return getMaximumProfitUtilWithFees(0, 1, n, price, dp, fee);
    }

// Time Complexity: O(N*2)

// Reason: There are N*2 states therefore at max ‘N*2’ new problems will be solved and we are running a for loop for ‘N’ times to calculate the total sum

// Space Complexity: O(N*2) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*2)).
function main() {
  let n = 6;

  let price = [1, 3, 2, 8, 4, 9];
  let fee = 2;
  const maxProfit = getMaximumProfitWithFee(n, price, fee);
  console.log("The maximum profit that can be generated is", maxProfit);
}

main();

function getMaximumProfitTabWithFeeUtil(n, buy, fee, price, dp) {
  // Base condition
  dp[n][0] = dp[n][1] = 0; // This is because buy can be anything when n === 0

  for (let index = n - 1; index >= 0; index--) {
    for (let k = 0; k <= buy; k++) {
      let profit = 0;

      if (k == 1) {
        console.log(k);
        profit = Math.max(
          -price[index] + dp[index + 1][0], // Buy
          0 + dp[index + 1][1]
        ); // Don't buy
      } else {
        //console.log(k);
        profit = Math.max(
          price[index] - fee + dp[index + 1][1], //Sell
          0 + dp[index + 1][0]
        ); // Not sell
      }
      dp[index][k] = profit;
    }
  }

  return dp[0][buy];
}

console.log("The tabulation Appraoch");

function getMaximumProfitTabWithFee(n, price, fee) {
  // Create a 2D array to store dynamic programming values
  const dp = new Array(n + 1).fill(null).map(() => new Array(2).fill(0));

  return getMaximumProfitTabWithFeeUtil(n, 1, fee, price, dp);
}

// Main function
function Sheriff() {
  const n = 6;
  const price = [1, 3, 2, 8, 4, 9];
  const fee = 2;
  // Calculate the maximum profit
  const maxProfit = getMaximumProfitTabWithFee(n, price, fee);

  console.log("The maximum profit that can be generated is Tab", maxProfit);
}

// Call the main function to start the program
Sheriff();
