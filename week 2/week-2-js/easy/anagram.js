/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if(str1.length!=str2.length) return false;
  // str1= str1.toLowerCase();
  // str2= str2.toLowerCase();
  // let charArr = []
  // for (let i = 0; i < str1.length; i++) {
  //   charArr.push(str1.charAt(i));
  // }
  // for (let i = 0; i < str2.length; i++) {
  //   if (charArr.indexOf(str2.charAt(i))==-1) {
  //     return false
  //   }else{
  //     charArr.splice(charArr.indexOf(str2.charAt(i)),1);
      
  //   }
  // }
  // return charArr.length==0;

  function sortString(str){
    return str.toLowerCase().split('').sort().join('');
  }
  return sortString(str1)==sortString(str2);
}
module.exports = isAnagram;
