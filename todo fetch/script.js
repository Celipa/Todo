//importera variabler från html koden
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const form = document.querySelector("form");
const todoListContainer = document.querySelector(".todo-container");
const deleteTodobtn = document.querySelector("#delete-btn");
const taskCheckbox = document.createElement("input");

const todoListArray = []

//här ska vi hämta tasks från databasen
const getTasks = async () => {
  const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb')
  if(response.status !== 200) {
    console.log('Något gick fel')
    return
  }

  const data = await response.json()
  
  todoListArray.push(data)
  console.log(todoListArray)

  taskList.innerHTML = ""
  data.forEach(task =>{
    const li = document.createElement('li');
    li.textContent = task.title;
    taskList.appendChild(li);
    const deleteTodobtn = document.createElement('button');
    deleteTodobtn.textContent = '';
    li.appendChild(deleteTodobtn);
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    li.appendChild(taskCheckbox);

    deleteTodobtn.addEventListener ('click', async () => {
      await deleteTodo (task._id)
    })
  })
}

getTasks()


//lägger till tasks i databasen)

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  if(!validateInput()) {
    return
  }
  const response = await fetch ('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title:taskInput.value
    })
  })
  console.log(response)
  if(response.status !== 201) {
    console.log('Något gick fel')
    return
  }
  const data = await response.json()
  createNewTodoElement(data)
  taskInput.value = ""
})

function createNewTodoElement(task) {
  const todoLiElement = document.createElement("li");
  todoLiElement.textContent = task.title;
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', async () => {
    await deleteTodo(task._id);
    console.log(task._id)
  });

  todoLiElement.appendChild(deleteButton);
  taskList.appendChild(todoLiElement);
  todoLiElement.appendChild(taskCheckbox);
}


// ta bort tasks från databasen
const deleteTodo = async (id) => {
  const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb`, {
    method: 'DELETE',
  })
  if(response.status !== 200) {
    console.log('Något gick fel')
    return
  }
  const data = await response.json()
  console.log("Deleted id:", data)

  getTasks()
}


function validateInput() {
  if (taskInput.value.trim() === "") {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Please enter a task";
    return false;
  }
  else{
    errorMsg.style.display = "none";
    return true;
  }
}




