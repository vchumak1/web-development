"use strict";

//пример с асинхронным кодом
console.log("Запрос данных");

setTimeout(() => {
    console.log("Подготовка данных");

    const product = {
        name: "TV",
        price: 2000
    };

    setTimeout(() => {
        product.status = "order";
        console.log(product);
    }, 2000);

}, 2000);

//создаем Promise
console.log("Запрос данных");

const req = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("Подготовка данных");

        const product = {
            name: "TV",
            price: 2000
        };
        //чтобы мы увидели объект product, мы его возвращаем в качестве аргумента функции resolve()
        resolve(product);

    }, 2000);
});

//передаем возвращенный объект из функции resolve() в качестве аргумента в then()
req.then((product) => {
    setTimeout(() => {
        product.status = "order";
        console.log(product);
    }, 2000);

});

//делаем вложенный Promise внутри req.then()
console.log("Запрос данных");

const req1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Подготовка данных");

        const product = {
            name: "TV",
            price: 2000
        };

        resolve(product);

    }, 2000);
});

req1.then((product) => {
    const req2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = "order";
            resolve(product);
        }, 2000);
    });
    req2.then((data) => {
        console.log(data);
    });
});


//реализуем Promise цепочкой then() без создания дополнительных переменных

console.log("Запрос данных");

const req2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Подготовка данных");

        const product = {
            name: "TV",
            price: 2000
        };

        resolve(product);

    }, 2000);
});

req2.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = "order";
            resolve(product);
        }, 2000);
    });
}).then((data) => {
    //можем не просто обрабатывать полученные Promise, но и модифицировать данные
    data.modify = true;
    return data;
}).then((modified) => {
    console.log(modified);
    //finally выполняется при любом исходе Promise и ставится в конце цепочки
}).finally(() => {
    console.log("finally");
});


//тестируем функцию reject()
console.log("Запрос данных");

const req3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Подготовка данных");

        const product = {
            name: "TV",
            price: 2000
        };

        resolve(product);

    }, 2000);
});

//ни одно из звеньев цепочки не выполнится, результатом работы будет Error из catch()
req3.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = "order";
            //меняем resolve на reject
            reject();
        }, 2000);
    });
}).then((data) => {
    data.modify = true;
    return data;
}).then((modified) => {
    console.log(modified);
    //catch прописывается в конце
}).catch(() => {
    console.error("Error");
});


//методы Promise all и race

const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
};

/* test(1000).then(() => console.log("1000 ms"));
test(2000).then(() => console.log("2000 ms")); */

//выполняет последовательно все промисы
Promise.all([test(1000), test(2000)]).then(() => {
    console.log("All");
});
//выполняет только первый промис
Promise.race([test(1000), test(2000)]).then(() => {
    console.log("Race");
});


//fetch API и его структура. Будем использовать ресурс JSON placeholder
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify({ name: "Alex" }),
    headers: {
        "Content-type": "application/json"
    }
})
    .then(response => response.json())
    .then(json => console.log(json));