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
        //modalCloseBtn = modal.querySelector("[data-close]"),
        modalTimerId = setTimeout(showModal, 50000);

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
    //modalCloseBtn.addEventListener('click', closeModal);

    //реализуем закрытие модального окна при клике на подложку с помощью e.target
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == '') {
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
                //помещаем класс в наш div
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

            //помещаем созданный элемент на страницу
            this.parent.append(element);
        }
    }

    //создаем функцию получения данных с сервера для внесения в карточки
    const getResource = async (url) => {

        //В данном случае настройки метода, заголовки и тело не нужно, т.к. мы ничего не отправляем на сервер
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Что то пошло не так c ${url}, статус: ${res.status}`);
        }

        return await res.json();
    };

    //создаем продуктовые карточки с помощью деструктуризации массива с объектами, который получен с сервера
    getResource("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
            });
        });

    //создаем экземпляры класса без использования промежуточных переменных
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     10,
    //     //таким образом передаем селектор родительского элемента для размещения карточки, поставлены точки т.к. работает querySelector()
    //     ".menu .container",
    //     //тестируем работу rest оператора и проверяем дополнительные классы у карточки
    //     "menu__item",
    //     "big"
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     15,
    //     ".menu .container",
    //     "menu__item"
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     5,
    //     ".menu .container",
    //     "menu__item"

    // ).render();


    //создаем отправку данных из форм на сервер старой технологией
    /* const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро мы с Вами свяжемся",
        failure: "Что-то пошло не так"
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            //добавляем элемент после формы, чтобы не плыла вёрстка
            form.insertAdjacentElement("afterend", statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            //этот заголовок предназначен для отправки данных из формы на сервер без JSON
            // request.setRequestHeader("Content-type", "multipart/form-data");

            //этот заголовок для отправки данных в формате JSON
            request.setRequestHeader("Content-type", "application/json", "charset=UTF-8");

            const formData = new FormData(form);

            const object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    //statusMessage.textContent = message.success;
                    showThanksModal(message.success); 
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModal();
                    }, 2000);

                } else {
                    //statusMessage.textContent = message.failure;
                    showThanksModal(message.failure);
                }
            });

        });
    }

    //подключаем спиннер при ожидании отправки формы на сервер и выводим окно благодарности

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        showModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    } */

    //создаем отправку формы на сервер с помощью Promise и fetch
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро мы с Вами свяжемся",
        failure: "Что-то пошло не так"
    };

    forms.forEach(item => {
        BindPostData(item);
    });

    //выносим отправку данных на сервер в отдельную функцию

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json"
            }
        });

        return await res.json();
    };


    function BindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            //добавляем элемент после формы, чтобы не плыла вёрстка
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);
            //закоментированно для отправки не в формате JSON
            /* const object = {};
 
             formData.forEach((value, key) => {
                 object[key] = value;
             });
 
             const json = JSON.stringify(object); */

            //Это более старое решение преобразования данных с форм в json

            // const object = {};

            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });

            //современный формат преобразования данных форм в json

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch("server.php", {
            //     method: "POST",
            //     body: JSON.stringify(object),
            //     //для отправки не в формате json
            //     //body: formData,
            //     headers: {
            //         "Content-type": "application/json"
            //     }
            //     //заголовок не нужен если отправляем не в формате json
            // /*    headers: {
            //         "Content-type": "application/json"
            //     } */
            // })

            //используем функцию отправки данных на сервер

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    //подключаем спиннер при ожидании отправки формы на сервер и выводим окно благодарности

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        showModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
    // Пример работы с json server с помощью fetch()

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

    //создаем слайдер, вариант 1 (простой)
    //моя реализация слайдера вариант 1 (простой) дополнительно прикрутил автоматическую прокрутку слайдов
    // const prevBtn = document.querySelector(".offer__slider-prev"),
    //     nextBtn = document.querySelector(".offer__slider-next"),
    //     currentNum = document.querySelector("#current"),
    //     totalNum = document.querySelector("#total"),
    //     slideImg = document.querySelectorAll(".offer__slide");

    // function hideSlides() {
    //     slideImg.forEach(item => {
    //         item.classList.add("hide");
    //         item.classList.remove("show", "fade");
    //     });
    // }

    // function showSlides(i = 0) {
    //     currentNum.innerHTML = `0${i + 1}`;
    //     totalNum.innerHTML = `0${slideImg.length}`;

    //     if (i > 8) {
    //         currentNum.innerHTML = `${i + 1}`;
    //     }

    //     if (slideImg.length > 9) {
    //         totalNum.innerHTML = `${slideImg.length}`;
    //     }

    //     slideImg[i].classList.remove("hide");
    //     slideImg[i].classList.add("show", "fade");
    // }

    // function showAndHide(index) {
    //     hideSlides();
    //     showSlides(index);
    // }

    // function switchSlides() {
    //     let i = 0;

    //     const slideInterval = setInterval(() => {
    //         if (i < slideImg.length) {
    //             showAndHide(i);
    //             i++;
    //         } else {
    //             i = 0;
    //             showAndHide(i);
    //         }
    //     }, 3000);

    //     nextBtn.addEventListener("click", () => {
    //         if (i < slideImg.length - 1) { 
    //             i++;
    //             showAndHide(i);
    //         } else {
    //             i = 0;
    //             showAndHide(i);
    //         }

    //         clearInterval(slideInterval);
    //     });

    //     prevBtn.addEventListener("click", () => {
    //         if (i === 0 ) {
    //             i = slideImg.length;
    //         }
    //         if (i > 0) {
    //             i--;
    //             showAndHide(i);
    //         }
    //         clearInterval(slideInterval);
    //     });
    // }

    // showAndHide(0);
    // switchSlides();

    //создаем сложный слайдер (карусель)

    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll('.offer__slide'),
        //создаем навигацию для слайдов
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
        slide.addEventListener("click", () => {
            switchNextSlide();
            clearInterval(slidesSwitcher);
        });
    });

    //обращаемся к блоку слайдера для установления абсолютного позиционирования
    slider.style.position = "relative";

    //создаем точки для навигации слайдера
    const indicators = document.createElement("ol"),
          dots = [];
    indicators.classList.add("carousel-indicators");

    //помещаем созданный элемент в блок со слайдером
    slider.append(indicators);

    //создаем количество точек в зависимости от слайдов
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");

        if(i === 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(string) {
        return +string.replace(/\D/g, '');
    }

    function switchNextSlide() {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity =".5");
        dots[slideIndex - 1].style.opacity = 1;
    }

    const slidesSwitcher = setInterval(switchNextSlide, 3000);

    next.addEventListener('click', () => {
        switchNextSlide();
        clearInterval(slidesSwitcher);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        clearInterval(slidesSwitcher);

        dots.forEach(dot => dot.style.opacity =".5");
        dots[slideIndex - 1].style.opacity = 1;
    });

    //создаем взаимодействие с навигацией слайдов
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            //устанавливаем позицию текущего слайда, на который кликнули
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity =".5");
            dots[slideIndex - 1].style.opacity = 1;

            
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

            clearInterval(slidesSwitcher);
        });
    });

    //калькулятор
    const result = document.querySelector(".calculating__result span");
    let sex = 'female', 
        height, weight, age,
        ratio = '1.375';
    
    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                   sex = e.target.getAttribute('id');
                }
    
                elements.forEach(elem => elem.classList.remove(activeClass));
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            switch(input.getAttribute("id")) {
                case "height": height = +input.value;
                break;
                case "weight": weight = +input.value;
                break;
                case "age": age = +input.value;
                break;
            }
            calcTotal();
        });
    }
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
});