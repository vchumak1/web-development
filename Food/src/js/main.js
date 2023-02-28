"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          slider = require('./modules/slider'),
          modal = require('./modules/modal'),
          cards = require('./modules/cards'),
          calculator = require('./modules/calculator');

    tabs();
    timer();
    slider();
    modal();
    cards();
    calculator();
    
});