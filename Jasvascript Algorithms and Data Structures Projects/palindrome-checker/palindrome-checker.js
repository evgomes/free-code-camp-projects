/**
 * Verifies if a given string is a palindrome (spelled the same way both forward and backward).
 * 
 * It ignores punctuation, case and spacing.
 * @param {String} str 
 */
function palindrome(str) {
    /*
    const normalizedString = str.replace(/[\W_]/g, '');
    const inverseString = normalizedString.split('').reverse().join('');
    return inverseString.toLowerCase() === normalizedString.toLowerCase();
    */

    // Most eficient implementation, comparing only two letters per time.
    const regex = /[\W_]/;
    let front = 0;
    let back = str.length - 1;
  
    while(back > front) {
      if(str[back].match(regex)) {
        back--;
        continue;
      }
  
      if(str[front].match(regex)) {
        front++;
        continue;
      }
      
      if(str[front].toLowerCase() !== str[back].toLowerCase()) {
        return false;
      }
  
      front++;
      back--;
    }
  
    return true;
  }
  
  
  
  console.log(palindrome("eye"));
  console.log(palindrome("_eye"));
  console.log(palindrome("storm"));
  console.log(palindrome("2A3*3a2"));