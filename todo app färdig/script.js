//create new variables for the elements in the html
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const modal = document.getElementById("modal");
const form = document.querySelector("form");
const todoListContainer = document.querySelector(".todo-container");
const deleteTodobtn = document.querySelector("#delete-btn");

const todoListArray = []




//GET - gets all tasks from the database and waits for the fetch to complete
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
    createNewTodoElement(task)
  })
}

getTasks()




//POST - adds a new task to the database and waits for the fetch to complete

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

//Splits the task into li, button and checkbox, adds the task to the list + adds the task to the database

function createNewTodoElement(task) {

  //Create a new list item
  const li = document.createElement('li');
  //shows the task title in the li
    li.textContent = task.title;
    //adds li to the list named taskList which is a ul
    taskList.appendChild(li);

    //Create a delete button
    const deleteTodobtn = document.createElement('button');
    //Change the text in the button to empty
    deleteTodobtn.textContent = 'Delete';
    //adds the delete button to the li
    li.appendChild(deleteTodobtn);

    //Create a checkbox
    const taskCheckbox = document.createElement("input");
    //says that the type is a checkbox
    taskCheckbox.type = "checkbox";
    //adds the checkbox to the li
    li.appendChild(taskCheckbox);
    //applies the id from the task to the checkbox
    taskCheckbox.dataset.id = task._id;
    //sets the checkbox to the completed status of the task
    taskCheckbox.checked = task.completed;

    // Apply styles based on the task status
    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.5";
    } else {
      li.style.textDecoration = "none";
      li.style.color = "black";
      li.style.opacity = "1";
    }

    //deletes the task from the database when the delete button is clicked and waits for the fetch to complete
    deleteTodobtn.addEventListener ('click', async () => {
      await deleteTodo (task._id)
    })
  }


//tells the console that the delete button will delete the task from the database but waits for the fetch to complete
const deleteTodo = async (id) => {
  // fetches the task from the database
 //waiting for the fetch to complete
  const taskResponse = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb`);
  const task = await taskResponse.json();

  // Check if the task is not completed
  if (task.completed === false) {
    modal.style.display = "block";
    return;
  }

  // Delete the task
  const deleteResponse = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb`, {
    method: 'DELETE',
  });
  // Check if the task was deleted, if not, log an error message
  if(deleteResponse.status !== 200) {
    console.log('Något gick fel');
    return;
  }
 //if the task was deleted, log the deleted id and data
  const data = await deleteResponse.json();
  console.log("Deleted id:", data);
//update the task list
  getTasks();
};


//checks if the  is empty and shows an error message if it is
function validateInput() {
  if (taskInput.value.trim() === "") {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Please enter a task!";
    return false;
  }
  else{
    errorMsg.style.display = "none";
    return true;
  }
}

//closes the modal when the close button is clicked
document.querySelector(".close-modal-btn").addEventListener("click", () => {
  modal.style.display = "none";
  console.log("closed modal");
});


//updates the task status in the database

taskList.addEventListener('click', async (event) => {
  if (event.target.type === 'checkbox') {
    const id = event.target.dataset.id;
    const status = event.target.checked;
    console.log(`Updating task id: ${id}, status: ${status}`);

    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        completed: status,
      })
    });
      //styling the task based on the status

    if (status) {
      event.target.parentNode.style.textDecoration = "line-through";
      event.target.parentNode.style.opacity = "0.5";
    } else {
      event.target.parentNode.style.textDecoration = "none";
      event.target.parentNode.style.color = "black";
      event.target.parentNode.style.opacity = "100";

    }

    if (response.status !== 200) {
      console.log('Task status couldn\'t be updated', data);
      return;
    }

    const data = await response.json();
    
    console.log('Task status updated:', data);
  }
});
