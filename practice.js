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
            for(let i = 1; i < arr.length - 1; i++) {
                subStr += 0;
            }
            str = `${num}${subStr}`;
            str.substring(0, num.length - 1);
        } else if (ind > 0 && num != 0) {
            subStr += ` + ${num}`;
            for (let i = ind; i < arr.length - ind; i++) {
                subStr += 0;
            }
            str += subStr;
        }
    });

    return str;

}

console.log(expandedForm(1200));