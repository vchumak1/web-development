"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll('button'),
        parent = document.querySelector('.btn-block'),
        body = document.querySelector('body');


    function changeColorByParentClass(data) {
        parent.addEventListener('click', e => {
            if (e.target.tagName == 'DIV') {
                btns.forEach(btn => {
                    btn.classList.toggle('red');
                });
            }
        });
        body.addEventListener('click', e => {
            if(e.target.tagName == 'BODY') {
                btns.forEach(btn => {
                    btn.classList.add('blue');
                    btn.classList.remove('blue', 'some');
                });
            }
        });
    }
    function changeColorOfButtons(btns) {
        btns.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('purple');
            });
        });
    }

    changeColorByParentClass(btns);
    changeColorOfButtons(btns);
});