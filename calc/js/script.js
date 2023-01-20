"use strict";

const inputRub = document.querySelector("#rub"),
      inputUsd = document.querySelector("#usd");  
      
inputRub.addEventListener("input", () => {
    const request = new XMLHttpRequest();

    //пример настройки запроса с сервера
    //request.open(method, url, async, login, password);
    request.open("GET", "js/current1.json");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send();

    //свойства объекта XMLHttpRequest()

    //status - ошибки, например 404 итп
    //statusText - текстовое описание кода ошибки
    //response - получаем ответ от сервера, что мы должны использовать на клиенте
    //readyState - текущее состояние нашего запроса

    //события объекта XMLHttpRequest()
    //событие readystatechange отслеживает статус готовности нашего запроса в текущий момент

    // request.addEventListener("readystatechange", () => {
    //     if(request.readyState === 4 && request.status === 200) {
    //         console.log(request.response);
    //         const data = JSON.parse(request.response);
    //         inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
    //     } else {
    //         inputUsd.value = "Что-то поломалось :(";
    //     }
    // });


    //событие load отслеживает когда запрос полностью готов, но не значит, что он успешен
    request.addEventListener("load", () => {
        if(request.status === 200) {
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = "Что-то поломалось :(";
        }
    });


});