//We can’t buy a stock on the very next day of selling it. This is the cooldown clause.

function getMaximumProfitCoolDownUtil(index, buy, n, price, dp) {
  // Base case
  if (index >= n) {
    return 0; // There is no more money you can make from  the market
  }

  // Check if the result for the current indices is already calculated

  if (dp[index][buy] !== -1) return dp[index][buy];

  let profit = 0;

  if (buy) {
    profit = Math.max(
      -price[index] + getMaximumProfitCoolDownUtil(index + 1, 0, n, price, dp), //   Not allowed to Buy
      0 + getMaximumProfitCoolDownUtil(index + 1, 1, n, price, dp) // Allow to  buy
    );
  } else {
    profit = Math.max(
      price[index] + getMaximumProfitCoolDownUtil(index + 2, 1, n, price, dp), //Sell
      0 + getMaximumProfitCoolDownUtil(index + 1, 0, n, price, dp)
    ); // Not sell
  }
  return profit;
}

function getMaximumProfitCoolDown(n, price) {
  //I passed 2 here because there are two states of buy. Either I buy it or  I dot buy it
  let dp = Array.from(Array(n + 1), () => Array(2).fill(-1));
  return getMaximumProfitCoolDownUtil(0, 1, n, price, dp);
}

// Time Complexity: O(N*2)

// Reason: There are N*2 states therefore at max ‘N*2’ new problems will be solved and we are running a for loop for ‘N’ times to calculate the total sum

// Space Complexity: O(N*2) + O(N)

// Reason: We are using a recursion stack space(O(N)) and a 2D array ( O(N*2)).
function main() {
  let n = 5;

  let price = [4, 9, 0, 4, 10];

  const maxProfit = getMaximumProfitCoolDown(n, price);
  console.log("The maximum profit that can be generated is", maxProfit);
}

main();

function getMaximumProfitTabUtilCoolDown(n, buy, price, dp) {
  // Base condition
  dp[n][0] = dp[n][1] = 0; //This is because buy can be anything when n === 0

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
          price[index] + dp[index + 2][1], // You can only buy at next two index. That is what cooldown means
          0 + dp[index + 1][0]
        ); // Not sell
      }
      dp[index][k] = profit;
    }
  }

  return dp[0][buy];
}

console.log("The tabulation Appraoch");

function getMaximumProfitTabCoolDown(n, price) {
  // Create a 2D array to store dynamic programming values
  const dp = new Array(n + 2).fill(null).map(() => new Array(2).fill(0));

  return getMaximumProfitTabUtilCoolDown(n, 1, price, dp);
}

// Main function
function Sheriff() {
  const n = 5;
  let price = [4, 9, 0, 4, 10];

  // Calculate the maximum profit
  const maxProfit = getMaximumProfitTabCoolDown(n, price);

  console.log("The maximum profit that can be generated is", maxProfit);
}

// Call the main function to start the program
Sheriff();
