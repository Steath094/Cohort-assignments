/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let number = 0;
    let regex = /^[aeiouAEIOU]$/;
    str.split('').forEach(char => {
      if (regex.test(char)) {
        number++;
      }
    });
    return number;
}

module.exports = countVowels;