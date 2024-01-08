// Buy and Sell Stock – III | (DP – 37)
// Problem Link: Best Time to Buy and Sell Stock III

// We are given an array Arr[] of length n.
// It represents the price of a stock on ‘n’ days. The following guidelines need to be followed:

// We can buy and sell the stock any number of times.
// In order to sell the stock, we need to first buy it on the same or any previous day.
// We can’t buy a stock again after buying it once. In other words, we first buy a stock and then sell it.
//  After selling we can buy and sell again. But we can’t sell before buying and can’t buy before selling any previously bought stock.
// We can do at most 2 transactions.

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

function BuyAndSellStockUtilTab(n, buy, noOfTransactionPermitted, prices, dp) {
  //   Base cases, you really do not need to write this base cases though
  //   When cap ==0,  both the index and buy can be anything
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

  return dp[0][1][2];
}
function BuyAndSellStockTab(n, prices) {
  //Create a 3D array
  let dp = new Array(n + 1).fill(null).map(() =>
    Array(2)
      .fill(null)
      .map(() => Array(3).fill(0))
  );
  return BuyAndSellStockUtilTab(n, 1, 2, prices, dp);
}


// Time Complexity: O(N*2*3) 

// Reason: There are three nested loops that account for O(N*2*3) complexity.

// Space Complexity: O(N*2*3)

// Reason: We are using an external array of size ‘N*2*3’. Stack Space is eliminated.
function Sheriff() {
  const prices = [3, 3, 5, 0, 0, 3, 1, 4];
  const n = prices.length;

  // Calculate the maximum profit
  const maxProfitValue = BuyAndSellStockTab(n, prices);

  console.log("The maximum profit that can be generated is", maxProfitValue);
}

Sheriff();
