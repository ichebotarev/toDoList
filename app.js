//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);


//functions

function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //toDoDive

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    //sadd todo to local storage
    // saveLocalTodos(todoInput.value);

    //check markbutton

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to LIST
    todoList.appendChild(todoDiv);


    //clear Todo InputValue
    todoInput.value = "";
}

function deleteCheck(e) {

    const item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-btn') {

        const todo = item.parentElement;
        //animatioon
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();

        });

    }


    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }


}


function filterToDo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });

}


function saveLocalTodos(todo) {
    //check--do i already have things in there?

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos.JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    return;
}