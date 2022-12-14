"use strict";
//рекурсионный перебор массива и получение максимального значения
function max(list) {
    let subMax = 0;
  
    if (list.length === 2) {
      return list[0] > list[1] ? list[0] : list[1];
    }
  
    subMax = max(list.slice(1));
    return list[0] > subMax ? list[0] : subMax;
  }

  console.log(max([2, 6, 10, 5, 3]));


//рекурсионный перебор массива получение его длины
function countKeys(obj) {
    let counter = 0;
    if (obj.length == 0 || obj == []) {
        return 0;
    } else {
        counter = 1 + countKeys(obj.slice(1));
    }
    return counter;
}

console.log(countKeys([1, 2 ,3, 0]));

//рекурсивный перебор массива и сложение всех его элементов
function summ(arr) {
    let counter = 0;
    if (arr.length == 0 || arr == []) {
        return 0;
    } else {
        counter = arr[0] + summ(arr.slice(1));

    }
    return counter;
}

console.log(summ([]));

//стэк вызовов 1 - greet(), 2 - greet2(), 3 greet(), 4 - bye(), 5 greet() и функция завершила свою работу.
function greet(name) {
    console.log(`Hello ${name}`);
    greet2(name);
    console.log('greeting ready to say goodbye');
    bye();
}

function greet2(name) {
    console.log(`How are you ${name}?`);
}

function bye() {
    console.log('ok bye');
}

greet('Vladimir');

//пример рекурсии

function counter(num) {
    console.log(num);
    if (num == 0) {
        return;
    } else {
        num = counter(num - 1);
    }
}

console.log(counter(3));


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