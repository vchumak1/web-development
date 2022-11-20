/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту 



*/

'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    //обрабатываем события в форме
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value; //получаем значение из input формы
        const favorite = checkbox.checked; //получаем значение true или false с галочки
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);

            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList); // после отправки формы вызываем функцию создания li с новым фильмом
            
        }

        e.target.reset(); //сбрасмываем текст формы после её отправки
    });

    //удаляем рекламу
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });

    };
    //меняем жанр и фон
    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    //сортируем массив по алфавиту
    const sortArr = (arr) => {
        arr.sort();
    };


    //создаем список фильмов на странице parent это movieList, films это movieDB.movies
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        //удаляем элемент со страницы и из базы данных при нажатии на корзину
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); //удаляем родительский элемент
                films.splice(i, 1); // удаляем значение из массива
                createMovieList(films, parent); // рекурсией перестраиваем список на странице
            });
        });
    }
    //осуществляем вызов наших функций
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});