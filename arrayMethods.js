"use strict";

//метод filter

const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

const shortNames = names.filter(function(name) {
    return name.length < 5;
});

console.log(shortNames);

//метод map первый аргумент call back функции это значение массива, второй аргумент это индекс элемента

const answers = ['IvAn', 'AnnA', 'Hello'];

const normalizedAnswers = answers.map(answers =>answers.toLowerCase());

console.log(normalizedAnswers);

//метод every (все элементы из массива подходят к условию и вернет true или false) 
//метод some (хотябы один элемент из массива подходит к условию и вернет true или false)

const smth = [4, 'qwq', 'sfreferf'];
console.log(smth.some(isNumber => typeof(isNumber) === 'number'));
console.log(smth.every(isNumber => typeof(isNumber) === 'number'));

//метод reduce схлопывает или собирает массив в единое целое

//хотим получить сумму всех элементов
const arr = [4, 5, 1, 3, 2, 6];

/*1 шаг(начало работы reduce) sum = 0, currentItem = 4
  2 шаг sum = 4, currentItem = 5
  3 шаг sum = 9, currentItem = 1
  4 шаг sum = 10, currentItem = 3
  5 шаг sum = 13, currentItem = 2
  6 шаг sum = 15, currentItem = 6 
  7 шаг (завершение работы reduce) sum = 21, currentItem = 0 или null*/
const sumResult = arr.reduce((sum, currentItem) => sum + currentItem);
console.log(sumResult);

//третий аргумент в методе reduce, который задает начальное значение
const arr1 = [4, 5, 1, 3, 2, 6];

/*1 шаг(начало работы reduce) sum = 3, currentItem = 4
  2 шаг sum = 7, currentItem = 5
  3 шаг sum = 12, currentItem = 1
  4 шаг sum = 13, currentItem = 3
  5 шаг sum = 16, currentItem = 2
  6 шаг sum = 18, currentItem = 6 
  7 шаг (завершение работы reduce) sum = 24, currentItem = 0 или null*/
const sumResult1 = arr1.reduce((sum, currentItem) => sum + currentItem, 3);
console.log(sumResult1);


//хотим собрать одну строку, где слова разделены запятой
const str = ['apple', 'pear', 'plum'];
const strResult = str.reduce((line, currentStr) => `${line}, ${currentStr}`);
console.log(strResult);


//практический пример с объектом в которой смешанная структура людей и животных, задача вытащить имена людей из объекта

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

//преобразует объект в массив с массивами
const newArr = Object.entries(obj)
        .filter(item => item[1] === "persone")
        //map по первому элементу вложенного массива пересобрал в новый массив с именами людей, без вложенности массивов
        .map(names => names[0]);

console.log(newArr);

//Object.fromEntries() преобразует массив массивов обратно в объект