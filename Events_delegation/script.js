"use strict";

const box = document.createElement("div");
box.classList.add("box");
document.body.append(box);

let btn;

for (let i = 0; i < 5; i++) {
    btn = document.createElement("button");
    btn.classList.add("button");
    btn.innerHTML = "Virgin btn";
    box.append(btn);
}

const arr = box.childNodes;
console.log(arr);

arr.forEach(item => {
    item.addEventListener("click", (e) => {
        let target = e.target.className;
        if (target === "button") {
            item.classList.toggle("click");
            item.textContent = "clicked!";
        } else {
            item.classList.toggle("click");
            item.textContent = "click me again!";
        }
    });
});
