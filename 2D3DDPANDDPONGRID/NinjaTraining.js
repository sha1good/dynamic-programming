// Problem Statement: A Ninja has an ‘N’ Day training schedule. He has to perform one of these three activities (Running, Fighting Practice, or Learning New Moves) each day. There are merit points associated with performing an activity each day. The same activity can’t be performed on two consecutive days. We need to find the maximum merit points the ninja can attain in N Days.

// We are given a 2D Array POINTS of size ‘N*3’ which tells us the merit point of specific activity on that particular day. Our task is to calculate the maximum number of merit points that the ninja can earn.

function generatePoints(day, lastTask, points, dp) {
  // If the result is already calculated, return it from 'dp'

  if (dp[day][lastTask] !== -1) return dp[day][lastTask];

  // Base case: When 'day' is 0, calculate the maximum points for the last day i.e 3 ,3
  if (day === 0) {
    let maxi = 0;

    //loop through the task
    for (let task = 0; task <= 2; task++) {
      // Calculate the maximum points for the first day by choosing  a task
      // different from the last one
      if (task !== lastTask) {
        maxi = Math.max(maxi, points[0][task]);
      }
    }
    return maxi;
  }

  let maxi = 0;

  // Iterate through the activities for the current day
  for (let task = 0; task <= 2; task++) {
    if (task !== lastTask) {
      // Calculate the points for the current task and add it to the
      // maximum points obtained so far (recursively calculated)
      let point = points[day][task] + generatePoints(day - 1, task, points, dp);
      maxi = Math.max(maxi, point);
    }
  }
  // Store the result in dp array and return it
  return (dp[day][lastTask] = maxi);
}

function NinjaTraining(n, points) {
  // Create a 2D array 'dp' with dimensions (n x 4) and initialize it with -1
  //let dp = Array.from({length: n}, ()=> Array(3).fill(-1))
  let dp = new Array(n); // this is the row
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(4).fill(-1);
  }

  // Define the recursive function 'f' with parameters 'day', 'last', 'points', and 'dp'

  return generatePoints(n - 1, 3, points, dp);
}

// Define the 'points' array with the ninja training data

let points = [
  [10, 40, 70],
  [20, 50, 80],
  [30, 60, 90],
];

// Get the number of days
let n = points.length;

// Complexity Analysis
// Time Complexity: O(N*4*3)

// Reason: There are N*4 states and for every state, we are running a for loop iterating three times.

// Space Complexity: O(N) + O(N*4)

// Reason: We are using a recursion stack space(O(N)) and a 2D array (again O(N*4)). Therefore total space complexity will be O(N) + O(N) ≈ O(N)
console.log(NinjaTraining(n, points));

function ninjaTraining(n, points) {
  // Create a 2D array 'dp' with dimensions (n x 4) and initialize it with 0
  let dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(3).fill(0);
  }

  // Initialize the base cases for the first day
  dp[0][0] = Math.max(points[0][1], points[0][2]);
  dp[0][1] = Math.max(points[0][0], points[0][2]);
  dp[0][2] = Math.max(points[0][0], points[0][1]);
 // dp[0][3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));

  // Loop through each day and calculate the maximum points
  for (let day = 1; day < n; day++) {
    for (let last = 0; last < 3; last++) {
      dp[day][last] = 0;
      for (let task = 0; task <= 2; task++) {
        if (task !== last) {
          // Calculate the points for the current activity and update 'dp'
          let activity = points[day][task] + dp[day - 1][task];
          dp[day][last] = Math.max(dp[day][last], activity);
        }
      }
    }
  }

  // The maximum points are stored in dp[n-1][3]
  return dp[n - 1][2];
}

// Define the 'points' array with the ninja training data
let pointss = [
  [10, 40, 70],
  [20, 50, 80],
  [30, 60, 90],
];

// Get the number of days
let m = points.length;

// Call the 'ninjaTraining' function and print the result
// Complexity Analysis
// Time Complexity: O(N*4*3)

// Reason: There are three nested loops

// Space Complexity: O(N*4)

// Reason: We are using an external array of size ‘N*4’’.
console.log(ninjaTraining(m, pointss));
