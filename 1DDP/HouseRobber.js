// A thief needs to rob money in a street. The houses in the street are arranged in a circular manner. Therefore the first and the last house are adjacent to each other. The security system in the street is such that if adjacent houses are robbed, the police will get notified.

// Given an array of integers “Arr” which represents money at each house, we need to return the maximum amount of money that the thief can rob without alerting the police.

function MaximumSumOfNonAdjacentlementOptimalSolution(array) {
  let n = array.length;
  let previous2 = 0;
  let previous1 = array[0];

  for (let i = 1; i < n; i++) {
    let pick = array[i] + previous2;
    let notPick = 0 + previous1;

    let currentI = Math.max(pick, notPick);
    previous2 = previous1;
    previous1 = currentI;
  }

  return previous1;
}

function HouseRobber(array) {
  let temp1 = [],
    temp2 = [];

  for (let i = 0; i < array.length; i++) {
    //Not considering the first element of the array since it is adjacent to the last one
    if (i !== 0) temp1.push(array[i]);
    //Not considering the last element of the array since it is adjacent to the first one since
    // if got robbed, the police will be notified
    if (i !== array.length - 1) temp2.push(array[i]);
  }

  return Math.max(
    MaximumSumOfNonAdjacentlementOptimalSolution(temp1),
    MaximumSumOfNonAdjacentlementOptimalSolution(temp2)
  );
}

let array = [1, 5, 1, 2, 6];

// Time Complexity: O(N )

// Reason: We are running a simple iterative loop, two times. Therefore total time complexity will be O(N) + O(N) ≈ O(N)

// Space Complexity: O(1)

// Reason: We are not using extra space.
let result = HouseRobber(array);

console.log(result);
