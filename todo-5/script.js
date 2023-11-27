const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

addTaskBtn.addEventListener("click", addTask);


function deleteTask(event) {
  const taskItem = event.target.parentElement;
  taskList.removeChild(taskItem);
}
function addTask() {
  const task = taskInput.value.trim();

  if (task === "") {
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  if (taskInput !== null) { // Add this condition
    const taskItem = document.createElement("li");
    const taskCheckbox = document.createElement("input");
    const taskText = document.createElement("span");
    const taskDeleteBtn = document.createElement("button");

    taskCheckbox.type = "checkbox";
    taskText.innerText = task;
    taskDeleteBtn.type = "Delete";

    taskDeleteBtn.addEventListener("click", deleteTask);

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDeleteBtn);

    taskList.appendChild(taskItem);

    taskInput.value = "";
  }
}

const output = document.querySelector('#output')
const todos = []

const getTodos = () => {
    fetch('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb')
      .then(response => response.json())
      .then(data => {

      data.forEach(todo => {
        todos.push(todo)
      })
      todos.forEach(todo =>{
        output.insertAdjacentHTML('beforeend', `<li>${todo.title}</li>`)
      })
    })
}
getTodos()

const task = {
    title: 'New task',
    body: 'alskjdlkasjdlkajsdl',
    userId: 1
}

const addTodos = () => {
    fetch('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
            },
        body: JSON.stringify(task)
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        output.insertAdjacentHTML('beforeend', `<li>${data.title}</li>`)
    })
}