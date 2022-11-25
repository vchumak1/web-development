"use strict";



function likes(names) {
    if (names === null || typeof (names) === 'number') {
        return "Error";
    }
    let nameArr = [];

    if (names !== undefined) {
         nameArr.push(names).join();
    } else {
        return ("no one likes this");
    }
        let line = '';
        let arrSize = nameArr.length;
        let a = ``,
            b = ``;


        if (nameArr == '') {
            return ("no one likes this");
        } else if (nameArr.length === 1) {
            return (`${nameArr[0]} likes this`);
        } else if (nameArr.length === 2) {
            return (`${nameArr[0]} and ${nameArr[1]} like this`);
        } else if (nameArr === 3) {
            return (`${nameArr[0]}, ${nameArr[1]} and ${nameArr[2]} like this`);
        } else if (arrSize > 3) {
            nameArr.forEach(name => {
                a = `${nameArr[0]}`;
                b = `${nameArr[1]}`;
            });
            line = `${a}, ${b} and ${arrSize - 2} others like this`;
            return line;
        }
}

console.log(likes("Alex, Victor, Ivan"));



/* Задание на урок:

1) Создать переменную numberOfFilms и в неё поместить ответ от пользователя на вопрос:
'Сколько фильмов вы уже посмотрели?'

2) Создать объект personalMovieDB и в него поместить такие свойства:
    - count - сюда передается ответ на первый вопрос
    - movies - в это свойство поместить пустой объект
    - actors - тоже поместить пустой объект
    - genres - сюда поместить пустой массив
    - privat - в это свойство поместить boolean(логическое) значение false

3) Задайте пользователю по два раза вопросы:
    - 'Один из последних просмотренных фильмов?'
    - 'На сколько оцените его?'
Ответы стоит поместить в отдельные переменные
Записать ответы в объект movies в формате: 
    movies: {
        'logan': '8.1'
    }

Проверить, чтобы все работало без ошибок в консоли */

const numberOfFilms = prompt("Сколько фильмов Вы просмотрели?", ''),
    lastFilm = prompt("Один из последних просмотренных фильмов?", ''),
    rating = prompt("На сколько оцените его?", ''),
    personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false

    };


if (numberOfFilms != null && numberOfFilms != '') {
    console.log(numberOfFilms);
} else {
    console.log("Error");
}

personalMovieDB.movies[lastFilm] = rating;
console.log(personalMovieDB);