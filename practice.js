"use strict";

function expandedForm(num) {
    if (typeof (num) === 'string' || typeof (num) === 'undefined') {
        return 'wrong data';
    }
    let str = '';
    let subStr = '';
    let numArr = num.toString().split('');

    if (numArr.length < 3) {
        numArr[0] *= 10;
        return `${numArr[0]} + ${numArr[1]}`;
    }

    numArr.forEach(function(num, ind, arr) {
        if (ind == 0) {
            str = num;
            for (let i = 0; i < arr.length - 1; i++) {
                subStr += 0;
            }
            str += subStr;
        } else if (ind > 0 && num != 0) {
            subStr = '';
            for  (let i = ind + 2; i - arr.length - 1; i++) {
                subStr += 0;
            }
            str += ` + ${num}${subStr}`;
        }
    });

    return str;

}

console.log(expandedForm(1023));