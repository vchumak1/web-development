"use strict";


//hamburger

function activateHamburger() {
    const hamburger = document.querySelector(".hamburger"),
    hamburgerMenu = document.querySelector(".hamburger-menu"),
    hamburgerMenuClose = document.querySelector(".hamburger-menu__close"),
    hamburgerMenuItems = document.querySelectorAll(".hamburger-menu__item");

    hamburger.addEventListener("click", () => {
        hamburgerMenu.classList.add("hamburger-menu__active");
    });
    
    hamburgerMenuClose.addEventListener("click", () => {
        hamburgerMenu.classList.remove("hamburger-menu__active");
    });

    hamburgerMenuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            hamburgerMenu.classList.remove("hamburger-menu__active");
        });
    });
} 

activateHamburger();

//slider

const slides = ['img/promo/slide1.png', 
                'img/promo/slide2.png',
                'img/promo/slide3.png'],
       slider = document.querySelector(".promo"),
       sliderNavBtns = document.querySelectorAll(".promo__nav-item");

function switchSlide(i = 0) {
    slider.style.cssText = `background-image: url(${slides[i]});
                            transition: background-image 0.5s`; 
}
       
function hideSlideActive(i = 0) {
    sliderNavBtns.forEach(item => item.classList.remove("promo__nav-item_active"));
    sliderNavBtns[i].classList.add("promo__nav-item_active");
}

function showSlideActive() {
    sliderNavBtns.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            item.classList.add("promo__nav-item_active");
            switchSlide(i);
            hideSlideActive(i);
        });
    });
}

hideSlideActive();
showSlideActive();
   
//how tabs

const howTabsHeadingsArr = ['Проводим консультацию',
                     'Составляем смету',
                     'Привлекаем подрядчиков',
                     'Инспектируем все этапы работ'],
      howTabsDescrArr = [
        'Влечёт за собой процесс внедрения и модернизации приоритизации разума над эмоциями. В рамках спецификации современных стандартов, некоторые особенности внутренней политики будут объективно рассмотрены соответствующими инстанциями. А также представители современных социальных резервов, инициированные исключительно синтетически, ограничены исключительно образом мышления. Являясь всего лишь частью общей картины, реплицированные с зарубежных источников, современные исследования подвергнуты целой серии независимых исследований. Кстати, стремящиеся вытеснить традиционное производство, нанотехнологии освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, призваны к ответу.',

        'Внедрения и модернизации приоритизации разума над эмоциями. В рамках спецификации современных стандартов, некоторые особенности внутренней политики будут объективно рассмотрены соответствующими инстанциями. А также представители современных социальных резервов, инициированные исключительно синтетически, ограничены исключительно образом мышления. Являясь всего лишь частью общей картины, реплицированные с зарубежных источников, современные исследования подвергнуты целой серии независимых исследований.',
    
        'Идейные соображения высшего порядка, а также новая модель организационной деятельности требует анализа прогресса профессионального сообщества. Высокий уровень вовлечения представителей целевой аудитории является чётким доказательством простого факта: высококачественный прототип будущего проекта напрямую зависит от дальнейших направлений развития. Разнообразный и богатый опыт говорит нам, что новая модель организационной деятельности говорит о возможностях системы массового участия. Принимая во внимание показатели успешности, постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнить важные задания по разработке прогресса профессионального сообщества.',

        'Высокий уровень вовлечения представителей целевой аудитории является чётким доказательством простого факта: высококачественный прототип будущего проекта напрямую зависит от дальнейших направлений развития. Разнообразный и богатый опыт говорит нам, что новая модель организационной деятельности говорит о возможностях системы массового участия. Принимая во внимание показатели успешности, постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет.'],
    howTabsImgArr = ['img/how/step1.png', 
                    'img/how/step2.png', 
                    'img/how/step3.png',
                    'img/how/step4.png' ],
    steps = document.querySelectorAll(".how__list-item"),
    elementHeading = document.querySelector(".element-heading__how"),
    elementDescr = document.querySelector(".section-descr__how"),
    elementImg = document.querySelector(".how__img");


function switchTabsContent(i = 0) {
    elementHeading.innerHTML = howTabsHeadingsArr[i];
    elementDescr.innerHTML = howTabsDescrArr[i];
    elementImg.style.cssText = `background-image: url(${howTabsImgArr[i]});
                                transition: background-image 0.5s;`;
}

function hideTabsActive(i = 0) {
    steps.forEach(item => item.classList.remove("how__list-item_active"));
    steps[i].classList.add("how__list-item_active");
}

function showTabsActive() {
    steps.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            item.classList.add("how__list-item_active");
            switchTabsContent(i);
            hideTabsActive(i);
        });
    });
}
hideTabsActive();
showTabsActive();

//qestions

const crossBtn = document.querySelectorAll(".questions__list-btn"),
      answer = document.querySelectorAll(".section-descr__answer");

function fillAnswersDescr() {
    answer.forEach(item => item.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fuga asperiores nostrum possimus quaerat inventore provident dolore recusandae temporibus, quibusdam, aspernatur voluptatibus optio animi laboriosam id ipsa debitis reiciendis. Facere!`);
}

function hideAnswers(i = 0) {
    crossBtn.forEach(item => {
        item.lastElementChild.classList.remove("questions__cross_active");
        item.firstElementChild.classList.remove("questions__cross_active");
    });

    answer.forEach(item => item.classList.remove("section-descr__answer_active"));
}

function showAnswers() {
    crossBtn.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            item.firstElementChild.classList.toggle("questions__cross_active");
            item.lastElementChild.classList.toggle("questions__cross_active");
            answer[i].classList.toggle("section-descr__answer_active");
        });
        hideAnswers(i);
    });
}

hideAnswers();
showAnswers();
fillAnswersDescr();