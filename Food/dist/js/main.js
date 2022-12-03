"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    //прячем всё содержимое табов
    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    //реализуем отображение активного контента
    function showTabsContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            //перебираем наши заголовки для того, чтобы определить активный и раскрыть описание таба по индексу заголовка.
            tabs.forEach((item, i) => {
                //идет проверка того, что событие произошло в том же элементе, который перебирается. Далее повторно вызываем функции и передаем в функцию showTabsContent(i) индекс заголовка
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    //Создаем timer
    const deadline = '2022-11-11';

    function getTimeRemaining(endtime) {
        //получаем разницу в миллисекундах между датой окончанчания события и текущей датой и временем
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            //чтобы часы, минуты и секунды не превышали значений 24, 60 и 60, производится деление по остатку на 24 и 60
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //функция помощник, добавляет к таймеру ноль, если число меньше 10, если дата просрочена, то оставляет нули, чтобы не ползла вёрстка
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else if (num >= 0) {
            return num;
        } else {
            return '00';
        }
    }

    function setClock(selector, endtime) {
        //получаем элементы со страницы, куда будем передавать информацию
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            //определяем время запуска функции updateClock
            timeInterval = setInterval(updateClock, 1000);
        //убираем мигание в браузере. Мигание появилось в результате того, что setInterval занимает 1 секунду
        updateClock();

        //создаем функцию, которая будет обновлять наш таймер на странице
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    //создаем модальное окно
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector('.modal'),
        modalCloseBtn = modal.querySelector("[data-close]"),
        modalTimerId = setTimeout(showModal, 10000);

    function stopInterval() {
        //реализуем функционал отключения таймера, если пользователь сам открыл модальное окно
        clearInterval(modalTimerId);
    }

    function showModal() {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');
        //стиль, который не позволяет использовать прокрутку при открытом модальном окне
        document.body.style.overflow = "hidden";
        stopInterval();
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', showModal);
    });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show', 'fade');
        //возвращаем возможность прокрутки страницы при закрытии модального окна
        document.body.style.overflow = "";
        stopInterval();

    }
    modalCloseBtn.addEventListener('click', closeModal);

    //реализуем закрытие модального окна при клике на подложку с помощью e.target
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //реализуем возможность закрытия модального окна с помощью клавиши esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    //реализуем открытие модального окна при прокрутке до конца страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            //убираем повторное появление модального окна при прокрутке страницы путем удаления обработчика событий
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //создаем продуктовые карточки с помощью классов

    class MenuCard {
        //используем rest оператор ...classes для того, чтобы предусмотреть возможность расширения карточки
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            //this.classes это будет массив
            this.classes = classes;
            //получаем родительский элемент, куда будут помещаться наши карточки
            this.parent = document.querySelector(parentSelector);
            //зададим курс валют
            this.transfer = 60;
            //вызываем метод конвертации валют и обновляем свойство price
            this.changeToUAH();
        }
        //создаем метод конвертации валют
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        //создаем метод вертски продуктовой карточки
        render() {
            const element = document.createElement('div');
            //создаем защиту от пустого массива в результате работы rest оператора
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>`;
            }
            //помещаем классы в наш div

            //помещаем созданный элемент на страницу
            this.parent.append(element);
        }
    }
    //создаем экземпляры класса без использования промежуточных переменных

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        //таким образом передаем селектор родительского элемента для размещения карточки, поставлены точки т.к. работает querySelector()
        ".menu .container",
        //тестируем работу rest оператора и проверяем дополнительные классы у карточки
        "menu__item",
        "big"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        5,
        ".menu .container",
        "menu__item"

    ).render();

});