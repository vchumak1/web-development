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

let viktor = removeRubish.split(' ').filter(item => item === 'viktor' || item === 'apple');
let kate = removeRubish.split(' ').filter(item => item === 'kate' || item === 'apple');

console.log(removeRubish);
console.log(kate.join(' ').match(/kate apple/g));
console.log(viktor.join(' ').match(/viktor apple/g));

const string = "the-stealth_warrior";

function toCamelCase(string) {
    if (string === '' || typeof (string) === 'undefined' || string === null) {
        return '';
    }

    if (string.match(/\-/g) !== null && string.match(/\-/g).length > 0 ) {
        let dashes = string.match(/\-\w/g).map(item => item.toUpperCase());

        for (let i = 0; i < dashes.length; i++) {
            string = string.replace(/\-\w/, dashes[i]).replace(/\-/, '');
        }
    }
    
    if (string.match(/\_/g) !== null && string.match(/\_/g).length > 0 ) {
        let underlines = string.match(/\_\w/g).map(item => item.toUpperCase());

        for (let i = 0; i < underlines.length; i++) {
            string = string.replace(/\_\w/, underlines[i]).replace(/\_/, '');
        }
    }

    return string;
}

// console.log(toCamelCase(string));

//а вот как предыдущую задачу решать надо было

function toCamelCase1(string){
    var regExp=/[-_]\w/ig;
    return string.replace(regExp,function(match){
          return match.charAt(1).toUpperCase();
     });
}

console.log(toCamelCase1(string));