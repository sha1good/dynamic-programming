// Buy and Sell Stock – IV | (DP – 38)
// Problem Link: Best Time to Buy and Sell Stock IV

// We are given an array Arr[] of length n. It represents the price of a stock on ‘n’ days. The following guidelines need to be followed:

// We can buy and sell the stock any number of times.
// In order to sell the stock, we need to first buy it on the same or any previous day.
// We can’t buy a stock again after buying it once. In other words, we first buy a stock and then sell it. After selling we can buy and sell again. But we can’t sell before buying and can’t buy before selling any previously bought stock.
// We can do at-most K transactions.

// You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

// Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:

// Input: k = 2, prices = [2,4,1]
// Output: 2
// Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
// Example 2:

// Input: k = 2, prices = [3,2,6,5,0,3]
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

// Constraints:

// 1 <= k <= 100
// 1 <= prices.length <= 1000

function BuyAndSellStockUtil(
  index,
  buy,
  noOfTransactionPermitted,
  n,
  prices,
  dp
) {
  if (index === n || noOfTransactionPermitted === 0) {
    return 0;
  }

  if (dp[index][buy][noOfTransactionPermitted] !== -1)
    return dp[index][buy][noOfTransactionPermitted];

  let profit;

  if (buy) {
    profit = Math.max(
      -prices[index] +
        BuyAndSellStockUtil(
          index + 1,
          0,
          noOfTransactionPermitted,
          n,
          prices,
          dp
        ),
      0 +
        BuyAndSellStockUtil(
          index + 1,
          1,
          noOfTransactionPermitted,
          n,
          prices,
          dp
        )
    );
  } else {
    profit = Math.max(
      prices[index] +
        BuyAndSellStockUtil(
          index + 1,
          1,
          noOfTransactionPermitted - 1,
          n,
          prices,
          dp
        ),
      0 +
        BuyAndSellStockUtil(
          index + 1,
          0,
          noOfTransactionPermitted,
          n,
          prices,
          dp
        )
    );
  }

  return profit;
}

function BuyAndSellStock(n, prices) {
  // Creating a 3D array to store dynamic programming values

  let dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 2 }, () => Array(3).fill(-1))
  );

  //   let dp = new Array(n + 1)
  //     .fill(null)
  //     .map(() => new Array(2).fill(null).map(() => Array(3).fill(-1)));
  return BuyAndSellStockUtil(0, 1, 2, n, prices, dp);
}

// Main function
// Time Complexity: O(N*2*3)
// Reason: There are N*2*3 states therefore at max ‘N*2*3’ new problems will be solved.
// Space Complexity: O(N*2*3) + O(N)
// Reason: We are using a recursion stack space(O(N)) and a 3D array ( O(N*2*3)).
function main() {
  const prices = [3, 3, 5, 0, 0, 3, 1, 4];
  const n = prices.length;

  // Calculate the maximum profit
  const maxProfitValue = BuyAndSellStock(n, prices);

  console.log("The maximum profit that can be generated is", maxProfitValue);
}

// Call the main function to start the program
main();

console.log("Below is the tabulation Approach");

function BuyAndSellStockTabWithKTab(
  n,
  buy,
  noOfTransactionPermitted,
  prices,
  dp
) {
  //   Base cases, you really do not need to write this base cases though
  //   When noOfTransactionPermitted ==0,  both the index and buy can be anything
  for (let k = 0; k <= n - 1; k++) {
    for (let i = 0; i <= buy; i++) {
      dp[k][i][0] = 0;
    }
  }

  //Do the same thing for when index == 0, cap  and buy can be anything
  for (let i = 0; i <= buy; i++) {
    for (let cap = 0; cap <= noOfTransactionPermitted; cap++) {
      dp[n][i][cap] = 0;
    }
  }

  // Loop through the array to calculate the maximum profit
  for (let index = n - 1; index >= 0; index--) {
    for (let k = 0; k <= buy; k++) {
      for (let cap = 1; cap <= noOfTransactionPermitted; cap++) {
        let profit;

        if (k === 1) {
          profit = Math.max(
            -prices[index] + dp[index + 1][0][cap],
            0 + dp[index + 1][1][cap]
          );
        } else {
          profit = Math.max(
            prices[index] + dp[index + 1][1][cap - 1],
            0 + dp[index + 1][0][cap]
          );
        }

        dp[index][k][cap] = profit;
      }
    }
  }

  return dp[0][1][noOfTransactionPermitted];
}
function BuyAndSellStockTabWithK(n, prices, noOfTransactionPermitted) {
  //Create a 3D array
  let dp = new Array(n + 1).fill(null).map(() =>
    Array(2)
      .fill(null)
      .map(() => Array(noOfTransactionPermitted + 1).fill(0))
  );
  return BuyAndSellStockTabWithKTab(n, 1, noOfTransactionPermitted, prices, dp);
}

// Complexity Analysis
// Time Complexity: O(N*2*K)

// Reason: There are three nested loops that account for O(N*2*K) complexity

// Space Complexity: O(K)

// Reason: We are using two external arrays of size ‘2*K’.
function Sheriff() {
  const prices = [3, 3, 5, 0, 0, 3, 1, 4];
  const n = prices.length;
  let noOfTransactionPermitted = 2;
  // Calculate the maximum profit
  const maxProfitValue = BuyAndSellStockTabWithK(
    n,
    prices,
    noOfTransactionPermitted
  );

  console.log("The maximum profit that can be generated is", maxProfitValue);
}

Sheriff();
