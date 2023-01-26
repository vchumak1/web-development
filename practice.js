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
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];

//получить сумму дохода у которых он есть, число > 0
const getPositiveIncomeAmount = (data) => {
    
    return data.filter(income => income.amount > 0)
    .map(income => Number.parseInt(Object.values(income)))
    .reduce((sum, income) => sum += income);

};

//считаем суммарный доход прибыльных и убыточных магазинов
const getTotalIncomeAmount = (data) => {
   return data.map(income => Number.parseInt(Object.values(income))
   .reduce((sum, number) => {
        if(number <= 0) {
            return sum += number;
        } else {
            return getPositiveIncomeAmount(data);
        }
   }));
   
};

console.log(getTotalIncomeAmount(funds));

console.log(getPositiveIncomeAmount(funds));
