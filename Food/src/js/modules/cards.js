function cards() {
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
}

module.exports = cards;