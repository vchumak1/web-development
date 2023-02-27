"use strict";


(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = "введите название нового дела";
        buttonWrapper.classList.add('iput-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = "Добавить дело";

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        todoItemForm.button.setAttribute('disabled', '');

        todoItemForm.input.addEventListener("input", () => {
            if(todoItemForm.input.value != '') {
                todoItemForm.button.removeAttribute('disabled', '');
            } else {
                todoItemForm.button.setAttribute('disabled', '');
            }

        });

        todoItemForm.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener("click", () => {
                todoItem.item.classList.toggle('list-group-item-success');
            });

            todoItem.deleteButton.addEventListener("click", () => {
                if (confirm("Вы уверены?")) {
                    todoItem.item.remove();
                }
            });
            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
        });

        function createTodoItem(name) {
            let item = document.createElement('li');
            let buttonGroup = document.createElement('div');
            let doneButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = name;

            buttonGroup.classList.add('btn-group', 'btn-group-sm');
            doneButton.classList.add('btn', 'btn-success');
            doneButton.textContent = 'Готово';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.textContent = 'Удалить';

            buttonGroup.append(doneButton);
            buttonGroup.append(deleteButton);
            item.append(buttonGroup);

            return {
                item,
                doneButton,
                deleteButton,
            };
        }
    }
    window.createTodoApp = createTodoApp;
})();