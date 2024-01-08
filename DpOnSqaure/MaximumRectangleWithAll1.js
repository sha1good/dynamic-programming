// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

// Example 1:

// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 6
// Explanation: The maximal rectangle is shown in the above picture.
// Example 2:

// Input: matrix = [["0"]]
// Output: 0
// Example 3:

// Input: matrix = [["1"]]
// Output: 1

// Constraints:

// rows == matrix.length
// cols == matrix[i].length
// 1 <= row, cols <= 200
// matrix[i][j] is '0' or '1'.

function largestRectangleArea(height) {
  let stack = [];
  let maxArea = 0;
  let n = height.length;

  for (let i = 0; i <= n; i++) {
    while (
      stack.length !== 0 &&
      (i === n || height[stack[stack.length - 1]] >= height[i])
    ) {
      const newHeight = height[stack.pop()];
      //The last element that in the stack st[st.length - 1] or array[array.length - 1]
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, width * newHeight);
    }
    stack.push(i);
  }

  return maxArea;
}

//  function largestRectangleArea(heights) {
//     const n = heights.length;
//     const st = [];
//     const leftSmall = new Array(n);
//     const rightSmall = new Array(n);

//     for (let i = 0; i < n; i++) {
//       while (st.length !== 0 && heights[st[st.length - 1]] >= heights[i]) {
//         st.pop();
//       }
//       leftSmall[i] = st.length === 0 ? 0 : st[st.length - 1] + 1;
//       st.push(i);
//     }

//     // Clear the stack to be re-used
//     st.length = 0;

//     for (let i = n - 1; i >= 0; i--) {
//       while (st.length !== 0 && heights[st[st.length - 1]] >= heights[i]) {
//         st.pop();
//       }

//       //This is the last element that in the stack st[st.length - 1]
//       rightSmall[i] = st.length === 0 ? n - 1 : st[st.length - 1] - 1;
//       st.push(i);
//     }

//     let maxA = 0;
//     for (let i = 0; i < n; i++) {
//       maxA = Math.max(maxA, heights[i] * (rightSmall[i] - leftSmall[i] + 1));
//     }

//     return maxA;
//   }

function maximalAreaOfSubMatrixOfAll1(matrix, row, cols) {
  let maxArea = 0;
  let height = Array(cols).fill(0);
  // Just loop through the row
  for (i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 1) height[j]++;
      else height[j] = 0;
    }
    let area = largestRectangleArea(height);
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}

function main() {
  let matrix = [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0],
  ];

  let row = 4;
  let cols = 5;

  let results = maximalAreaOfSubMatrixOfAll1(matrix, row, cols);
  console.log("The maximum are is: ", results);
}

// Time Complexity: O(N * (M+M)), where N = total no. of rows and M = total no. of columns.
// Reason: O(N) for running a loop to check all rows. Now, inside that loop, O(M) is for
// visiting all the columns, and another O(M) is for the function we are using.
// The function takes linear time complexity. Here, the size of the height array is M, so it will take O(M).

// Space Complexity: O(M), where M = total no. of columns.
// Reason: We are using a height array and a stack of size M.
main();
