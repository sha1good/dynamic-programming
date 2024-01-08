// We are given an array Arr[] of length n. It represents the price of a stock on ‘n’ days.
// The following guidelines need to be followed:

// We can buy and sell the stock any number of times.
// In order to sell the stock, we need to first buy it on the same or any previous day.
// We can’t buy a stock again after buying it once. In other words, we first buy a stock and then sell it.
// After selling we can buy and sell again.
// But we can’t sell before buying and can’t buy before selling any previously bought stock.

// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

// On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

// Find and return the maximum profit you can achieve.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
// Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Total profit is 4 + 3 = 7.
// Example 2:

// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
// Total profit is 4.
// Example 3:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.

// Constraints:

// 1 <= prices.length <= 3 * 104
// 0 <= prices[i] <= 104

function getMaximumProfitUtil(index, buy, n, price, dp) {
  // Base case
  if (index === n) {
    return 0; // There is no more money you can make from  the market
  }

  // Check if the result for the current indices is already calculated

  if (dp[index][buy] !== -1) return dp[index][buy];

  let profit = 0;

  if (buy) {
    profit = Math.max(
      -price[index] + getMaximumProfitUtil(index + 1, 0, n, price, dp), //   Not allowed to Buy
      0 + getMaximumProfitUtil(index + 1, 1, n, price, dp) // Allow to  buy
    ); 
  } else {
    profit = Math.max(
      price[index] + getMaximumProfitUtil(index + 1, 1, n, price, dp), //Sell
      0 + getMaximumProfitUtil(index + 1, 0, n, price, dp)
    ); // Not sell
  }
  return profit;
}

function getMaximumProfit(n, price) {
  //I passed 2 here because there are two states of buy. Either I buy it or  I dot buy it
  let dp = Array.from(Array(n), () => Array(2).fill(-1));
  return getMaximumProfitUtil(0, 1, n, price, dp);
}

// Time Complexity: O(N*2)

// Reason: There are N*2 states therefore at max ‘N*2’ new problems will be solved and we are running a for loop for ‘N’ times to calculate the total sum

// Space Complexity: O(N*2) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*2)).
function main() {
  let n = 6;

  let price = [7, 1, 5, 3, 6, 4];

  const maxProfit = getMaximumProfit(n, price);
  console.log("The maximum profit that can be generated is", maxProfit);
}

main();

function getMaximumProfitTabUtil(n, buy, price, dp) {
  // Base condition
  dp[n][0] = dp[n][1] = 0; // This is because buy can be anything when n === 0

  for (let index = n - 1; index >= 0; index--) {
    for (let k = 0; k <= buy; k++) {
      let profit = 0;

      if (k) {
        console.log(k);
        profit = Math.max(
          -price[index] + dp[index + 1][0], // Buy
          0 + dp[index + 1][1]
        ); // Don't buy
      } else {
        //console.log(k);
        profit = Math.max(
          price[index] + dp[index + 1][1], //Sell
          0 + dp[index + 1][0]
        ); // Not sell
      }
      dp[index][k] = profit;
    }
  }

  return dp[0][buy];
}

// function getMaximumProfitTabUtil(n, buy, price, dp) {
//   // Base condition
//   dp[n][0] = dp[n][1] = 0; // This is because buy can be anything when n === 0

//   for (let index = n - 1; index >= 0; index--) {
//     for (let k = 0; k <= buy; k++) {
//       let profit = 0;

//       if (k) {
//         // Check if buying
//         profit = Math.max(
//           -price[index] + dp[index + 1][1], // Buy
//           dp[index + 1][0] // Don't buy
//         );
//       } else {
//         // Check if selling
//         profit = Math.max(
//           price[index] + dp[index + 1][0], // Sell
//           dp[index + 1][1] // Not sell
//         );
//       }
//       dp[index][k] = profit;
//     }
//   }

//   return dp[0][buy];
// }

console.log("The tabulation Appraoch");

function getMaximumProfitTab(n, price) {
  // Create a 2D array to store dynamic programming values
  const dp = new Array(n + 1).fill(null).map(() => new Array(2).fill(0));

  return getMaximumProfitTabUtil(n, 1, price, dp);
}

// Main function
function Sheriff() {
  const n = 6;
  const price = [7, 1, 5, 3, 6, 4];

  // Calculate the maximum profit
  const maxProfit = getMaximumProfitTab(n, price);

  console.log("The maximum profit that can be generated is", maxProfit);
}

// Call the main function to start the program
Sheriff();
