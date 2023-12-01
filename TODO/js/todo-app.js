(function () {

  let todoItemList = [];

  function createAppTitle(title) {

    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function getTodoItemForm(container) {

    const formTemplate = document.querySelector('.template-form');
    const clone = formTemplate.content.cloneNode(true);

    container.append(clone);

    let form = document.querySelector('.input-group');
    let input = document.querySelector('.form-control');
    let button = document.querySelector('.btn-primary');

    return {

      form,
      input,
      button,
    };
  }

  function createTodoList() {

    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(todoObject) {

    let { name, done } = todoObject;

    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    let todoItemObject = {
      id: createTodoItemId(),
      name: name,
      done: done
    };

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

    todoItemList.push(todoItemObject);

    return {

      item,
      doneButton,
      deleteButton,
      todoItemObject
    };
  }

  function createTodoObject(name, done = false) {

    return { name: name, done: done };
  }

  function createTodoItemId() {

    return todoItemList.length === 0 ? 0 : todoItemList[todoItemList.length - 1].id + 1;
  }

  function createTodoApp(container, title = 'Список дел', listName) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = getTodoItemForm(container);
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoList);

    if (getTodoListData(listName)) {

      let arr = getTodoListData(listName);

      for (let i = 0; i < arr.length; i++) {

        let todoItem = createTodoItem(createTodoObject(arr[i].name, arr[i].done));

        if (arr[i].done === true) {

          todoItem.item.classList.add('list-group-item-success');
        }

        todoItemEvent(todoItem, listName);

        todoList.append(todoItem.item);
      }
    }

    todoItemForm.form.addEventListener('submit', function (e) {

      e.preventDefault();

      let todoItem = createTodoItem(createTodoObject(todoItemForm.input.value));

      setTodoListData(listName, todoItemList);

      todoItemEvent(todoItem, listName);

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';
      todoItemForm.button.setAttribute('disabled', '');
    });

    todoItemForm.input.addEventListener('input', function () {

      todoItemForm.input.value.length === 0 ? todoItemForm.button.setAttribute('disabled', '') :
        todoItemForm.button.removeAttribute('disabled');
    });
  }

  function findTodoItemObject(id) {

    for (let i = 0; i < todoItemList.length; i++) {

      if (todoItemList[i].id === id) {

        return i;
      }
    }
  }

  function todoItemEvent(todoItem, listName) {

    todoItem.doneButton.addEventListener('click', function () {

      todoItem.item.classList.toggle('list-group-item-success');

      if (todoItem.item.classList.contains('list-group-item-success')) {

        todoItem.todoItemObject.done = true;
        todoItemList[findTodoItemObject(todoItem.todoItemObject.id)].done = true;
        setTodoListData(listName, todoItemList);
      }
      else {

        todoItem.todoItemObject.done = false;
        todoItemList[findTodoItemObject(todoItem.todoItemObject.id)].done = false;
        setTodoListData(listName, todoItemList);
      }
    });
    todoItem.deleteButton.addEventListener('click', function () {

      if (confirm('Вы уверены?')) {

        todoItem.item.remove();
        todoItemList.splice(findTodoItemObject(todoItem.todoItemObject.id), 1);
        removeObjectFromStorage(listName, todoItem.todoItemObject.id);
      }
    });
  }

  function removeObjectFromStorage(key, id) {

    let data = getTodoListData(key);

    let newData = [];
    for (let i = 0; i < data.length; i++) {

      if (data[i].id !== id) {

        newData.push(data[i]);
      }
    }

    setTodoListData(key, newData);
  }

  function getTodoListData(key) {

    return JSON.parse(localStorage.getItem(key));
  }

  function setTodoListData(key, data) {

    localStorage.setItem(key, JSON.stringify(data));
  }

  document.addEventListener('DOMContentLoaded', function () {

    const PAGES_LIST = [
      { page: 'index.html', title: "Мои дела", listName: 'myFormDate', container: 'todo-app-index' },
      { page: 'dad.html', title: "Дела папы", listName: 'dadFormDate', container: 'todo-app-dad' },
      { page: 'mom.html', title: "Дела мамы", listName: 'momFormDate', container: 'todo-app-mom' }
    ];

    let title = null;
    let listName = null;
    let container = null;
    const userLocation = location.href.match(/[\d\w-]+\.\w+$/);

    for (let i = 0; i < PAGES_LIST.length; i++) {

      if (userLocation[0] === PAGES_LIST[i].page) {

        title = PAGES_LIST[i].title;
        listName = PAGES_LIST[i].listName;
        container = document.getElementById(`${PAGES_LIST[i].container}`);
      }
    }

    createTodoApp(container, title, listName);
  });
})();
