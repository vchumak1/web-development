"use strict";

const persone = {
    name: 'Alex',
    age: 25,
    
    //задаем геттер
    get userAge() {
        return this.age;
    },

    //задаем сеттер
    set userAge(number) {
        this.age = number;
    }
};

//сеттеру можем передавать напрямую значения
console.log(persone.userAge = 30);

//вызов геттера не требует вызова круглыми скобками
console.log(persone.userAge);

//инкапсуляция

// function User(name, age) {
//     let userName = name;
//     let userAge = age;

//     this.say = function() {
//         console.log(`User name: ${userName}, age: ${userAge}`);
//     };

//     this.getAge = function() {
//         return userAge;
//     };
//     this.setAge = function(age) {
//         if(typeof(age) === 'number' && age > 0 && age < 110) {
//             userAge = age;
//         } else {
//             console.log("Bad data");
//         }
//     };
// }

class User {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    //объявляем приватное свойство
    #surname = "Petrychenko";

    say() {
        console.log(`User name: ${this._name} ${this.#surname}, age: ${this._age}`);
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if(typeof(age) === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log("Bad data");
        }
    }
}

const ivan = new User("Ivan", 25);

console.log(ivan.age);
ivan.say();
console.log(ivan.surname);