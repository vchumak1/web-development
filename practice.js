"use strict";
//первая домашняя работа мо методам массивов
const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];

//проверить наличие свойства id у всех объектов в массиве
const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.every(obj => obj.id || obj.id === 0);
}

console.log(checkFilms(tranformedArray));

//добавить в объекты новое свойство id и со значением индекса массива
function setFilmsIds(arr) {
    return arr.map((film, i) => {
        film.id = i;
        return film;
    });
}

console.log(setFilmsIds(films));

//вывести список фильмов в виде строки через запятую
function showListOfFilms(arr) {
    return arr.map(objName => objName.name)
        .reduce((line, names) => `${line}, ${names}`);
}

console.log(showListOfFilms(films));

//показать объекты с фильмами, рейтинг которых >=8
function showGoodFilms(arr) {
    return arr.filter(item => item.rating >= 8);
}

console.log(showGoodFilms(films));

//вторая домашнаяя работа по методам массивов
const funds = [
    { amount: -1400 },
    { amount: 2400 },
    { amount: -1000 },
    { amount: 500 },
    { amount: 10400 },
    { amount: -11400 }
];

//получить сумму дохода у которых он есть, число > 0
const getPositiveIncomeAmount = (data) => {

    return data.filter(income => income.amount > 0)
        .reduce((sum, income) => sum + income.amount, 0);

};

//считаем суммарный доход прибыльных и убыточных магазинов
const getTotalIncomeAmount = (data) => {
    return data.some(item => item.amount < 0) ? data.reduce((acc, curr) => acc + curr.amount, 0) : getPositiveIncomeAmount(data);

};

console.log(getTotalIncomeAmount(funds));

console.log(getPositiveIncomeAmount(funds));

/*  
Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?

Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.
*/

const recipe = {
    flour: 100,
    milk: 50,
    eggs: 1
};

const avaliable = {
    flour: 200,
    milk: 50,
    eggs: 2
};

function cakes(recipe, available) {
    return Object.keys(recipe).reduce(function (val, ingredient) {
        return Math.min(Math.floor(available[ingredient] / recipe[ingredient] || 0), val);
    }, Infinity);
}

console.log(cakes(recipe, avaliable));

//найти исключительное число в массиве
const numbers = [1, 8, 4, 4, 6, 1, 8];

function findUnique(numbers) {
    return Number.parseInt(numbers.sort((a, b) => a - b).map((val, i, arr) => {
        return val == arr[i + 1] ? (val = "", arr[i + 1] = "") : val;
    }).reduce((result, num) => result + num));
}

console.log(findUnique(numbers));