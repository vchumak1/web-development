"use strict"

function* generator() {
    yield 'S';
    yield 'c';
    yield 'r';
    yield 'i';
    yield 'p';
    yield 't';
}
//функция возвращает объект со свойством vaule и done
const str = generator();

console.log(str.next().value);
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next());

function* count(n) {
    for(let i = 0; i < n; i++) {
        yield i;
    }
}

for(let key of count(7)) {
    console.log(key);
}

const counter = count(7);

console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);