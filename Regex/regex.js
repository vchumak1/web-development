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

    if (string.match(/\-/g) !== null && string.match(/\-/g).length > 0) {
        let dashes = string.match(/\-\w/g).map(item => item.toUpperCase());

        for (let i = 0; i < dashes.length; i++) {
            string = string.replace(/\-\w/, dashes[i]).replace(/\-/, '');
        }
    }

    if (string.match(/\_/g) !== null && string.match(/\_/g).length > 0) {
        let underlines = string.match(/\_\w/g).map(item => item.toUpperCase());

        for (let i = 0; i < underlines.length; i++) {
            string = string.replace(/\_\w/, underlines[i]).replace(/\_/, '');
        }
    }

    return string;
}

// console.log(toCamelCase(string));

//а вот как предыдущую задачу решать надо было

function toCamelCase1(string) {
    var regExp = /[-_]\w/ig;
    return string.replace(regExp, function (match) {
        return match.charAt(1).toUpperCase();
    });
}

console.log(toCamelCase1(string));

//моё решение по проверке пин-кода
let pin = '-1.234';

function validatePIN(pin) {
    let checked = pin.match(/\D/gi);
    if (checked !== null) {
        return false;
    }
    return pin.length === 4 || pin.length === 6 ? true : false;
}

console.log(validatePIN(pin));

//оптимальное решение задачи по проверке пин-кода
function validatePIN(pin) {
    return /^(\d{4}|\d{6})$/.test(pin);
}

function solution(data) {
    if(data === '') {
        return [];
    } else if (data.length === 1) {
        return [`${data}_`];
    }

    let regex = /\w/gi;
    regex.lastIndex = data.length - 1;
    return data.length % 2 === 0 ? data.match(/\w{2}/g) : (data.match(/\w{2}/g) + `,${regex.exec(data)}_`).split(',');
}

console.log(solution('abcde'));

//оптимальное решение
function solution(s){
    return (s+"_").match(/.{2}/g)||[];
 }

let url = ' https://www.7uwjwzhu9fejuj7uqp01kuh6.co/error';
function domainName(url){
    let result = url.split('').map(item => item == '.' || item == '/' ? item = ' ' : item)
                    .join('')
                    .match(/\w.+\s/g)
                    .join('').trim()
                    .split(' ')
                    .filter(item => item !== '' && item !== 'www' && item !== "https:" && item !== "http:");

    return result[0];
}

console.log(domainName(url));

//оптимальное решение по поиску названия сайта
function domainName(url){
    url = url.replace("https://", '');
    url = url.replace("http://", '');
    url = url.replace("www.", '');
    return url.split('.')[0];
}

const ip = '123.193.149.10';
function isValidIP(ip) {
    let splittedIp = ip.split('.').filter(item => item !== '');
    let toggler = true;

    if(splittedIp.length < 4 || splittedIp.length > 4) {
        return false;
    }

    splittedIp.forEach(item => {
        if(item > 255) {
            toggler = false;
        }
        if(item[0] == '0' || item[1] != 'undefined') {
            console.log(item[1]);
            toggler = false;
        }
        if(item.match(/\D/ig) !== null) {
            toggler = false;
        }
    });
    return toggler;
  }

console.log(isValidIP(ip));