"use strict";

import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import cards from './modules/cards';
import calculator from './modules/calculator';

document.addEventListener('DOMContentLoaded', () => {

    tabs();
    timer();
    slider();
    modal();
    cards();
    calculator();
    
});