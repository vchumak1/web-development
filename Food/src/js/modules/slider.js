function slider() {
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

        if (i === 0) {
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
        dots.forEach(dot => dot.style.opacity = ".5");
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

        dots.forEach(dot => dot.style.opacity = ".5");
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

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = 1;


            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            clearInterval(slidesSwitcher);
        });
    });
}

module.exports = slider;