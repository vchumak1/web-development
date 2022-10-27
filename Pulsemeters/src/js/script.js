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

    //Tabs eventlistener
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });



    function toggleSlide(item) {
      $(item).each(function (i) {
        $(this).on('click', function (e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
      $('.overlay, consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function (i) {
      $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    //forms validation
    function validateForms (form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста введите своё имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          },
          phone: "Пожалуйста введите свой номер телефона",
          email: {
            required: "Пожалуйста введите свою почту",
            email: "Неправильно введён адрес почты"
          }
        }
      });
    }

    validateForms('#consultation form');
    validateForms('#consultation-form');
    validateForms('#order form');

  });

  $('input[name=phone]').mask("+7(999) 999-9999");


  /*     $(".slick-initialized").css("color", "transparent");
      $(".slick-dots").css("display","flex");
      $(".slick-dots").css("list-style-type","none");
      $(".slick-dots").contents("li").css("margin", "auto");
      $("li").contents("button").css("background-color", "black");
      $("li").contents("button").css("border-radius", "100%");
      $("li").contents("button").css("color", "transparent"); */


