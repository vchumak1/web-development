"use strict";


$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: `<button type="button" class="slick-prev"><img src="img/slider/left_btn.svg"></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="img/slider/right_btn.svg"></button>`,
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });
});