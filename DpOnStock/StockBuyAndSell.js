// Best time to buy and sell stock

// We are given an array Arr[] of length n. It represents the price of a stock on ‘n’ days. The following guidelines need to be followed:

// We can buy and sell a stock only once.
// We can buy and sell the stock on any day but to sell the stock, we need to first buy it on the same or any previous day.
// We need to tell the maximum profit one can get by buying and selling this stock.

//Approach
// Approach:
// The algorithm approach can be stated as:

// Initialize a variable ‘maxProfit’ to 0 and declare another variable ‘mini’ which we will use to keep track of the buying price (minimum price from day 0 to day i) for selling the stock.
// Traverse the array from index 1 to n-1. We started at index 1 because buying and selling the stock on the 0th day will give us a profit of 0, which we have initialized our maxProfit as already.
// In each iteration, try to find the curProfit. The selling price will be Arr[i] and ‘mini’ will give us the buying price. We calculate the curProfit. If it is more than the existing profit value (maxProfit), we update the maxProfit value.
// Before going to the next iteration, we check if the current price (Arr[i]) is less than the mini value, and we assign it as the new mini value. In this way, we keep track of the buying price in a single iteration itself.

function StockBuyAndSell(days) {
  let maxProfit = 0;

  let minimum = days[0];

  for (let i = 1; i < days.length; i++) {
    let curProfit = days[i] - minimum;

    maxProfit = Math.max(maxProfit, curProfit);
    minimum = Math.min(minimum, days[i]);
  }
  return maxProfit;
}

function main() {
  let days = [7, 1, 5, 3, 6, 4];

  console.log("The maximum profit you can make is  " + StockBuyAndSell(days));
}

main();
