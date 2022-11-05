"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger"),
        close = document.querySelector(".menu__close"),
        menu = document.querySelector(".menu"),
        menuItems = document.querySelectorAll(".menu__list"),
        counters = document.querySelectorAll(".tools-visual__percent"),
        lines = document.querySelectorAll(".tools-visual__indicator span"),
        links = document.querySelectorAll(".portfolio__item");


    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
    close.addEventListener("click", () => {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
    });

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menu.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    links.forEach((item, index) => {
            if (index > 2) {
                item.addEventListener("mouseenter", (e) => {
                    e.preventDefault();
                    item.classList.toggle("active");
                    const div = document.createElement("div");
                   
                    item.style.cssText = "position: relative;";
                    div.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%); font-size: 25px; left: 25%; font-weight: bold; color: black;";
                    div.classList.add("portfolio__item-dev");
                    div.innerHTML = `В разработке`;
                    item.append(div);
            
                    item.addEventListener("mouseout", () => {
                        item.classList.remove("active");
                        item.style.cssText = "";
                        div.remove();
                    });      
                });
            }
    });

    counters.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });
});