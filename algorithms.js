"use strict";
//пример сортировки с возвратом индекса числа

function findSmallest(arr) {
    let smallest = arr[0];
    let smallestIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        //если первый элемент меньше последующих то функция вернет изначально заданный индекс, который равен 0, если найдется число меньшее начального то вернется его индекс.
        if (arr[i] < smallest) {
            smallest = arr[i];
            smallestIndex = i;
        }
    }
    return smallestIndex;
}

function selectionSort(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        //здесь используем функцию, которая уже нашла минимальное число и вернрула его индекс и заполняем новый массив, индексом данного числа.
        let smallest = findSmallest(arr);
        newArr.push(smallest);
    }
    return newArr;
}

console.log(selectionSort([15, 4, 6, 2, 1, 10]));

//пример бинарного поиска
let arr = [];

for (let i = 1; i <= 1000000000; i++) {
    arr.push(i);
}

function guessNumber(arr, item) {
    //задаем границы поиска
    let min = 0;
    let max = arr.length - 1;
    
    while (min <= max) {
        let mid = (min + max) / 2;
        //получаем корректное значение индекса искомого элемента item
        if (mid / 2 < 1) {
            mid = Math.ceil(mid);
        } else {
            mid = Math.floor(mid);
        }
        let guess = arr[mid];
        //сравниваем средний элемент с нашим item, если равен то ок
        if (guess == item) {
            return mid;
        }
        //если загаданный элемент больше среднего значения то идем от конца массива
        if (guess > item) {
            max = mid - 1;
        } 
        //если загаданный элемент меньше среднего значения то идем от начала массива
        else {
            min = mid + 1;
        }
    }
    //если искомое значение item отсутствует в массиве, возвращаем null
    return null;
}

console.log(guessNumber(arr, 17));