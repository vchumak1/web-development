function modal() {
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

}

export default modal;