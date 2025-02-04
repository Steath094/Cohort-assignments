/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve) => {
      setTimeout(resolve, t * 1000); // Convert seconds to milliseconds
    });
  }
  
  function wait2(t) {
    return new Promise((resolve) => {
      setTimeout(resolve, t * 1000);
    });
  }
  
  function wait3(t) {
    return new Promise((resolve) => {
      setTimeout(resolve, t * 1000);
    });
  }

async function calculateTime(t1, t2, t3) {
    const startTime = new Date().getTime();
    
    return wait1(t1)
        .then(() => wait2(t2))  // Executes only after `t1` is done
        .then(() => wait3(t3))  // Executes only after `t2` is done
        .then(() => {
            const endTime = new Date().getTime();
            return endTime - startTime; // Return total elapsed time
        });
}

module.exports = calculateTime;
