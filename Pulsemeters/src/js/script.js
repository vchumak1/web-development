"use strict";

/* const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.prev').addEventListener("click", function () {
    slider.goTo("prev");
  }); 

  document.querySelector('.next').addEventListener("click", function () {
    slider.goTo("next");
  });  */




//slick slider
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
/*     $(".slick-initialized").css("color", "transparent");
    $(".slick-dots").css("display","flex");
    $(".slick-dots").css("list-style-type","none");
    $(".slick-dots").contents("li").css("margin", "auto");
    $("li").contents("button").css("background-color", "black");
    $("li").contents("button").css("border-radius", "100%");
    $("li").contents("button").css("color", "transparent"); */
});


