"use strict";


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


