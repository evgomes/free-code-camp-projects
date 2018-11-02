'use strict';

/**
 * Verifies if a telephone number matches one of the valid patterns for USA numbers:
 * 
 * 555-555-5555
 * (555)555-5555
 * (555) 555-5555
 * 555 555 5555
 * 5555555555
 * 1 555 555 5555
 * @param {string} str telephone number.
 * @returns {boolean} indication whether the telephone is valid.
 */
function telephoneCheck(str) {
    const regex = /^(1\s?){0,1}(\(\d{3}\)|\d{3})[\s\-]{0,1}\d{3}[\s\-]?\d{4}$/;
    return regex.test(str);
}

console.log(telephoneCheck("5555555555"));
console.log(telephoneCheck("1 555-555-5555"))
console.log(telephoneCheck("1 555)555-5555"))