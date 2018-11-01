/**
 * Transforms a string using the caesars chipers algorithm with ROT13 cipher (shifting letters 13 positions to the right).
 * @param {String} str string to shift.
 * @returns {String} shifted string.
 */
function rot13(str) { 
    const alphabetRegex = /[\w]/i;
    const aCharCode = 'A'.charCodeAt(0); // 65
    const zCharCode = 'Z'.charCodeAt(0); // 90

    let result = '';
    let charCodePlusThirteen = 0;

    for(let char of str) {
        if(!alphabetRegex.test(char)) { // If character is not a letter, just concat it 
            result += char;
            continue;
        }

        charCodePlusThirteen = char.charCodeAt(0) + 13;
        
        // If charcode if bigger than 'Z' char code, we need to get the resulting shift
        // after 'Z' and use it to find the char code after 'A'
        if(charCodePlusThirteen > zCharCode) {
            charCodePlusThirteen -= zCharCode;
            charCodePlusThirteen += aCharCode - 1;
            
        }

        result += String.fromCharCode(charCodePlusThirteen);
    }

    return result;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));