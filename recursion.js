'use strict';

function replicate(times, number) {
    return times > 0 ? [number].concat(replicate(times - 1, number)) : [];
}

console.log(replicate(3, 9));

const arr = [1, 42, 112, 32, 21];

function max(arr) {
    if (!arr.length) {
        return -Infinity;
    }

    if (arr.length === 1) {
        return arr[0];
    }

    const [a, b] = [arr[0], max(arr.slice(1))];
    return a < b ? b : a;
}

console.log(max(arr));

let students = {
    js: [{
        name: 'John',
        progress: 100
    }, {
        name: 'Ivan',
        progress: 60
    }],

    html: {
        basic: [{
            name: 'Peter',
            progress: 20
        }, {
            name: 'Ann',
            progress: 18
        }],

        pro: [{
            name: 'Sam',
            progress: 10
        }],

        semi: {
            students: [{
                name: 'Test',
                progress: 100
            }]
        }
    }
};

function getTotalProgressByRecursion(data) {
    if (Array.isArray(data)) {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total += data[i].progress;
        }

        return [total, data.length];
    } else {
        let total = [0, 0];

        for (let subData of Object.values(data)) {
            const subDataArr = getTotalProgressByRecursion(subData);
            total[0] += subDataArr[0];
            total[1] += subDataArr[1];
        }
        return total;
    }
}

const result = getTotalProgressByRecursion(students);

console.log(result[0] / result[1]);

function getTotalProgressByIteration(data) {
    let total = 0;
    let students = 0;

    for (let course of Object.values(data)) {
        if (Array.isArray(course)) {
            students += course.length;

            for (let i = 0; i < course.length; i++) {
                total += course[i].progress;
            }
        } else {
            for (let subCourse of Object.values(course)) {
                students += subCourse.length;
                for (let i = 0; i < subCourse.length; i++) {
                    total += subCourse[i].progress;
                }
            }
        }
    }

    return total / students;
}

console.log(getTotalProgressByIteration(students));

function deepCount(a){
    let count = a.length;
    for (let i = 0; i < a.length; i++) {
        if (Array.isArray(a[i])) {
            count += deepCount(a[i]);
        }
    }
    return count;
}

console.log(deepCount([1, 2, 3, [5, []]]));