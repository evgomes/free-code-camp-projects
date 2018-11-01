/**
 * Returns the roman numeral equivalent of a decimal number.
 * @param {Number} num 
 */
function convertToRoman(num) {
    // Reference: https://www.rapidtables.com/convert/number/how-number-to-roman-numerals.html
    const numbers =      [1000, 900,500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanNumbers = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

    let romanized = '';

    for(let i = 0; i < numbers.length; i++) {
        while(numbers[i] <= num) {
            romanized += romanNumbers[i];
            num -= numbers[i];
        }
    }

    return romanized;
}

console.log(convertToRoman(36));