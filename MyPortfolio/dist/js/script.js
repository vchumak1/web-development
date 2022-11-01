"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger"),
        close = document.querySelector(".menu__close"),
        menu = document.querySelector(".menu"),
        menuItems = document.querySelectorAll(".menu__list");


    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
    close.addEventListener("click",() => {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
    });

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menu.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
});