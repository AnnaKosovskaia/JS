(function () {
  let todoArray = [];

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = !input.value.length;
    input.addEventListener('input', () => {
      button.disabled = !input.value.length;
    });

    return {
      form,
      input,
      button,
    }
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {

    let item = document.createElement('li');

    let randomId = Math.random() * 100;
    item.id = randomId.toFixed(2);

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
      buttonGroup
    }
  }

  function changeItemDone(arr, item) {
    arr.map(obj => {
      if (obj.id === item.id && obj.done === false) {
        obj.done = true;
      } else if (obj.id === item.id && obj.done === true) {
        obj.done = false;
      }
    });
  }

  function completeTodoItem(item, btn) {
    btn.addEventListener('click', () => {
      todoArray = JSON.parse(localStorage.getItem(key));
      item.classList.toggle('list-group-item-success');
      changeItemDone(todoArray, item);
      localStorage.setItem(key, JSON.stringify(todoArray));
    });
  }

  function deleteTodoItem(item, btn) {
    btn.addEventListener('click', () => {
      if (confirm('Вы уверены?')) {
        todoArray = JSON.parse(localStorage.getItem(key));
        let newList = todoArray.filter(obj => obj.id !== item.id);
        localStorage.setItem(key, JSON.stringify(newList));
        item.remove();
      }
    });
  }

  function createTodoApp(container, title = 'Список дел', key) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(key)) {
      todoArray = JSON.parse(localStorage.getItem(key));

      for (let obj of todoArray) {
        let todoItem = createTodoItem(todoItemForm.input.value);
        todoItem.item.textContent = obj.name;
        todoItem.item.id = obj.id;
        if (obj.done == true) {
          todoItem.item.classList.add('list-group-item-success');
        } else {
          todoItem.item.classList.remove('list-group-item-success');
        }

        completeTodoItem(todoItem.item, todoItem.doneButton);
        deleteTodoItem(todoItem.item, todoItem.deleteButton);

        todoList.append(todoItem.item);
        todoItem.item.append(todoItem.buttonGroup)
      }
    }

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();
      let todoItem = createTodoItem(todoItemForm.input.value);

      if (!todoItemForm.input.value) {
        return;
      }

      completeTodoItem(todoItem.item, todoItem.doneButton);
      deleteTodoItem(todoItem.item, todoItem.deleteButton);

      let = localStorageData = localStorage.getItem(key);

      if (localStorageData == null) {
        todoArray = [];
      } else {
        todoArray = JSON.parse(localStorageData);
      }

      let createItemObj = (arr) => {
        let itemObj = {}
        itemObj.name = todoItemForm.input.value;
        itemObj.id = todoItem.item.id;
        itemObj.done = false;
        arr.push(itemObj);
      }
      createItemObj(todoArray);

      localStorage.setItem(key, JSON.stringify(todoArray));

      todoList.append(todoItem.item);
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = !todoItemForm.button.disabled;
    });
  }

  window.createTodoApp = createTodoApp;
})();
