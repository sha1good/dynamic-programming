// A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:

// 't' that evaluates to true.
// 'f' that evaluates to false.
// '!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
// '&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
// '|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
// Given a string expression that represents a boolean expression, return the evaluation of that expression.

// It is guaranteed that the given expression is valid and follows the given rules.

// Example 1:

// Input: expression = "&(|(f))"
// Output: false
// Explanation:
// First, evaluate |(f) --> f. The expression is now "&(f)".
// Then, evaluate &(f) --> f. The expression is now "f".
// Finally, return false.
// Example 2:

// Input: expression = "|(f,f,f,t)"
// Output: true
// Explanation: The evaluation of (false OR false OR false OR true) is true.
// Example 3:

// Input: expression = "!(&(f,t))"
// Output: true
// Explanation:
// First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
// Then, evaluate !(f) --> NOT false --> true. We return true.

// Constraints:

// 1 <= expression.length <= 2 * 104
// expression[i] is one following characters: '(', ')', '&', '|', '!', 't', 'f', and ','.

const mod = 1000000007;
function countWaysToEvaluateExpressionUtil(i, j, isTrue, expression) {
  // Base case 1: If i > j, there are no ways to evaluate the expression.
  if (i > j) return 0;

  // Base case 2: If i and j are the same, check if it evaluates to the desired result.
  if (i === j) {
    // This version uses the unary + operator to convert the boolean result of the expression expression[i]
    //  === "T" or expression[i] === "F" to a numeric value (1 for true, 0 for false).
    return isTrue === 1 ? +(expression[i] === "T") : +(expression[i] === "F");
  }

  let ways = 0;

  // Iterate through operators at odd indices in the expression
  for (let operatorIndex = i + 1; operatorIndex <= j - 1; operatorIndex += 2) {
    // Calculate the number of ways to evaluate the left and right subexpressions
    let leftT = countWaysToEvaluateExpressionUtil(
      i,
      operatorIndex - 1,
      1,
      expression
    );
    let leftF = countWaysToEvaluateExpressionUtil(
      i,
      operatorIndex - 1,
      0,
      expression
    );
    let rightT = countWaysToEvaluateExpressionUtil(
      operatorIndex + 1,
      j,
      1,
      expression
    );
    let rightF = countWaysToEvaluateExpressionUtil(
      operatorIndex + 1,
      j,
      0,
      expression
    );

    if (expression[operatorIndex] === "&") {
      if (isTrue) ways = ((ways + leftT * rightT) % mod) % mod;
      else
        ways =
          (ways +
            ((leftT * rightF) % mod) +
            ((leftF * rightT) % mod) +
            ((leftF * rightF) % mod)) %
          mod;
    } else if (expression[operatorIndex] === "|") {
      if (isTrue)
        ways =
          (ways +
            ((leftT * rightF) % mod) +
            ((leftF * rightT) % mod) +
            ((leftT * rightT) % mod)) %
          mod;
      else ways = ((ways + leftF * rightF) % mod) % mod;
    } else {
      if (isTrue)
        ways =
          (ways + ((leftT * rightF) % mod) + ((leftF * rightT) % mod)) % mod;
      else
        ways =
          (ways + ((leftF * rightF) % mod) + ((leftT * rightT) % mod)) % mod;
    }
  }
  return ways;
}

function countWaysToEvaluateExpression(expression) {
  // Define constants for the modulo operation

  // Get the length of the expression
  const n = expression.length;

  // Call the recursive function with initial values
  return countWaysToEvaluateExpressionUtil(0, n - 1, 1, expression);
}

// Define the input expression
const exp = "F|T^F";
// Call the function to count the number of ways to evaluate the expression
const ways = countWaysToEvaluateExpression(exp);
// Print the result
//Time Complexity: Exponential
console.log("The total number of ways:", ways);

function countWaysToEvaluateExpressionMemoUtil(i, j, isTrue, expression, dp) {
  // Base case 1: If i > j, there are no ways to evaluate the expression.
  if (i > j) return 0;

  // Base case 2: If i and j are the same, check if it evaluates to the desired result.
  if (i === j) {
    // This version uses the unary + operator to convert the boolean result of the expression expression[i]
    //  === "T" or expression[i] === "F" to a numeric value (1 for true, 0 for false).
    return isTrue === 1 ? +(expression[i] === "T") : +(expression[i] === "F");
  }

  if (dp[i][j][isTrue] !== -1) return dp[i][j][isTrue];
  let ways = 0;

  // Iterate through operators at odd indices in the expression
  for (let operatorIndex = i + 1; operatorIndex <= j - 1; operatorIndex += 2) {
    // Calculate the number of ways to evaluate the left and right subexpressions
    let leftT = countWaysToEvaluateExpressionMemoUtil(
      i,
      operatorIndex - 1,
      1,
      expression,
      dp
    );
    let leftF = countWaysToEvaluateExpressionMemoUtil(
      i,
      operatorIndex - 1,
      0,
      expression,
      dp
    );
    let rightT = countWaysToEvaluateExpressionMemoUtil(
      operatorIndex + 1,
      j,
      1,
      expression,
      dp
    );
    let rightF = countWaysToEvaluateExpressionMemoUtil(
      operatorIndex + 1,
      j,
      0,
      expression,
      dp
    );

    if (expression[operatorIndex] === "&") {
      if (isTrue) ways = ((ways + leftT * rightT) % mod) % mod;
      else
        ways =
          (ways +
            ((leftT * rightF) % mod) +
            ((leftF * rightT) % mod) +
            ((leftF * rightF) % mod)) %
          mod;
    } else if (expression[operatorIndex] === "|") {
      if (isTrue)
        ways =
          (ways +
            ((leftT * rightF) % mod) +
            ((leftF * rightT) % mod) +
            ((leftT * rightT) % mod)) %
          mod;
      else ways = ((ways + leftF * rightF) % mod) % mod;
    } else {
      if (isTrue)
        ways =
          (ways + ((leftT * rightF) % mod) + ((leftF * rightT) % mod)) % mod;
      else
        ways =
          (ways + ((leftF * rightF) % mod) + ((leftT * rightT) % mod)) % mod;
    }
  }
  return (dp[i][j][isTrue] = ways);
}

function countWaysToEvaluateExpressionMemo(expression) {
  // Define constants for the modulo operation

  // Get the length of the expression
  const n = expression.length;

  //Create 3d Array
  let dp = Array.from(Array(n + 1), () =>
    Array.from(Array(n + 1), () => Array(2).fill(-1))
  );
  // Call the recursive function with initial values

  return countWaysToEvaluateExpressionMemoUtil(0, n - 1, 1, expression, dp);
}

// Define the input expression
const express = "F|T^F";
// Call the function to count the number of ways to evaluate the expression
// Time Complexity: O(N*N*2 * N) ~ O(N3) There are a total of 2*N2 no. of states. And for each state, we are running a partitioning loop roughly for N times.

// Space Complexity: O(2*N2) + Auxiliary stack space of O(N), 2*N2 for the dp array we are using.
const results = countWaysToEvaluateExpressionMemo(express);
// Print the result
console.log("The total number of ways:", results);

function evaluateExpression(exp) {
  const mod = 1000000007;
  const n = exp.length;

  // Create a 3D memoization table initialized with 0
  const dp = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(null).map(() => [0, 0]));

  // Loop through the expression in reverse order
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      // Base case 1: Skip invalid cases where i > j
      if (i > j) {
        continue;
      }

      for (let isTrue = 0; isTrue < 2; isTrue++) {
        // Base case 2: If i and j are the same, calculate the result
        if (i === j) {
          dp[i][j][isTrue] =
            isTrue === 1 ? (exp[i] === "T" ? 1 : 0) : exp[i] === "F" ? 1 : 0;
          continue;
        }

        // Recurrence logic:
        let ways = 0;
        for (let ind = i + 1; ind < j; ind += 2) {
          const lT = dp[i][ind - 1][1];
          const lF = dp[i][ind - 1][0];
          const rT = dp[ind + 1][j][1];
          const rF = dp[ind + 1][j][0];

          if (exp[ind] === "&") {
            if (isTrue) {
              ways = (ways + ((lT * rT) % mod)) % mod;
            } else {
              ways =
                (ways +
                  ((lF * rT) % mod) +
                  ((lT * rF) % mod) +
                  ((lF * rF) % mod)) %
                mod;
            }
          } else if (exp[ind] === "|") {
            if (isTrue) {
              ways =
                (ways +
                  ((lF * rT) % mod) +
                  ((lT * rF) % mod) +
                  ((lT * rT) % mod)) %
                mod;
            } else {
              ways = (ways + ((lF * rF) % mod)) % mod;
            }
          } else {
            if (isTrue) {
              ways = (ways + ((lF * rT) % mod) + ((lT * rF) % mod)) % mod;
            } else {
              ways = (ways + ((lF * rF) % mod) + ((lT * rT) % mod)) % mod;
            }
          }
        }
        dp[i][j][isTrue] = ways;
      }
    }
  }

  // The result for the entire expression is stored in dp[0][n - 1][1]
  return dp[0][n - 1][1];
}

// Main function
// Call the function to count the number of ways to evaluate the expression
// Time Complexity: O(N*N*2 * N) ~ O(N3) There are a total of 2*N2 no. of states. And for each state, we are running a partitioning loop roughly for N times.

// Space Complexity: O(2*N2).
function main() {
  const exp = "F|T^F";
  const ways = evaluateExpression(exp);
  console.log("The total number of ways:", ways);
}

// Execute the main function
main();
