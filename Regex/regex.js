"use strict";

//так уже никто не пользуется
//new RegExp("pattern", "flags");

// const ans = prompt("введите Ваше имя");

// const reg = /n/i;

//флаги можно комбинировать, например /n/igm;

//список флагов
// i - если хотим найти что-то вне зависимости от регистра
// g - пытаемся найти несколько значений
// m - включает многострочный режим


//на выходе, если буква n найдена, то возвращается её индекс, если не найдена, то -1
//метод search останавливается на первом найденном совпадении и с флаго g работать не будет
// console.log(ans.search(reg));

//возвращает массив
// console.log(ans.match(reg));

// const pass = prompt("Password");

//метод replace принимает 2 аргумента, регулярку и на что будем менять полученные значения
// /./ означает, что абсолютно любые символы без исключения

// console.log(pass.replace(/./g, "*"));

//пример с экраниерованием точки
// console.log(pass.replace(/\./g, "*"));

// console.log('12-55-66'.replace(/-/g, ":"));

//пример комбинирования паттернов в регулярных выражениях

// const str = "My name is R2D2";

// console.log(str.match(/\w\d\w\d/i));

const str = ":apple: <@viktor> sadjhabsdj bjshdba 🍎 🍌 :ananas: apple viktor sadsadsad 13213213 apple <@kate> 🍎 dkjbsakjd apple <@kate> :grape: :apple:";
let removeRubish = str.replace(/[\:\<@\>]/g, '');
removeRubish = removeRubish.replace(/[^viktor aple]/g, '');

let viktor = removeRubish.split(' ').filter(item => item === 'viktor' || item ==='apple');
let kate =  removeRubish.split(' ').filter(item => item === 'kate' || item ==='apple');

console.log(removeRubish);
console.log(kate.join(' ').match(/kate apple/g));
console.log(viktor.join(' ').match(/viktor apple/g));