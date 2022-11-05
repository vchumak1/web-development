document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector(".promo-menu-mobile"),
          hamburger = document.querySelector(".hamburger"),
          menuItem = document.querySelectorAll(".promo-menu-mobile__item"),
          tabs = document.querySelectorAll(".prices__tab"),
          tabBtns = document.querySelectorAll(".button_prices"),
          tabsInfo = document.querySelectorAll(".prices__tab-info");

    hamburger.addEventListener("click", (e) => {
        e.preventDefault();
        hamburger.classList.toggle("active");
        menu.classList.toggle("active");
    });

    menuItem.forEach(item => {
        item.addEventListener("click", (e) => {
            menu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    });

    tabs.forEach((item, index) => {
        tabBtns[index].addEventListener("click", (e) => {
            item.classList.toggle("active");
            tabsInfo[index].classList.toggle("active");
            tabBtns[index].classList.toggle("active");
        });
    });

});