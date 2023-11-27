//importera variabler från html koden
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const form = document.querySelector("form");
const todoListContainer = document.querySelector(".todo-container");

const todoListArray = []
//lägg till funktion till addtaskbtn
// addTaskBtn.addEventListener("click", addTask);
//när du trycker add task..
// function addTask() {
//   const task = taskInput.value.trim();
// //kolla om textfältet är tomt, om det är tomt, visa error meddelandet
//   if (task === "") {
//     errorMsg.style.display = "block";
//     return;
//   }
//   //om textfältet inte är tomt, ta bort errormeddelandet.
//   else{
//     errorMsg.style.display = "none";
//   }
//   //lägg till de olika element i varje to-do (så det ses som en lista, har en checkbox, är text och har ta bort )
//   const taskItem = document.createElement("li");
//   const taskCheckbox = document.createElement("input");
//   const taskText = document.createElement("span");
//   const taskDeleteBtn = document.createElement("btn");
// //en task del ska innehålla..
//   taskCheckbox.type = "checkbox";
//   taskText.innerText = task;
//   taskDeleteBtn.innerText = "Delete";
// //delete knappen ska ta bort..
//   taskDeleteBtn.addEventListener("click", deleteTask);
// //dessa delar av en task.
//   taskItem.appendChild(taskCheckbox);
//   taskItem.appendChild(taskText);
//   taskItem.appendChild(taskDeleteBtn);

//   taskList.appendChild(taskItem);
// //och ersätta de med..
//   taskInput.value = "";
// }
//delete knappen gör detta.
// function deleteTask(event) {
//   const taskItem = event.target.parentElement;
//   taskList.removeChild(taskItem);
// }
const getTasks = async () => {
  const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb')
  if(response.status !== 200) {
    console.log('Något gick fel')
    return
  }

  const data = await response.json()
  
  todoListArray.push(data)
  console.log(todoListArray)

  // data.forEach(task => tasks.push(task))
  taskList.innerHTML = ""
  data.forEach(task =>{
    const li = document.createElement('li');
    li.textContent = task.title;
    taskList.appendChild(li);
  })
  console.log(taskList)
}

getTasks()




form.addEventListener("submit", async (event) => {
  event.preventDefault()
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
  createNewTodoElement()
  
})

function createNewTodoElement() {
const todoLiElement = document.createElement("li")
 todoLiElement.textContent = taskInput.value
 taskList.appendChild(todoLiElement)
 
}




// DELETE

const deletetask1 = (e) => {
  fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb' + e.target.dataset.taskid, {
    method: 'DELETE'
  })
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(data => {
    console.log(data)
    e.target.remove()
  })
}
const deletetask = async  (e) => {
  const res = await fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb' + e.target.dataset.taskid, {
    method: 'DELETE'
  })
  
  console.log(res)
  
  const data = await res.json()
  console.log(data)
  e.target.remove()
}


























// formElement.addEventListener("submit", async () => {
//   const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb', {
//     method:'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       title:taskInput.value,
//     }),
//   })
// }



// post - lägger till data, krypterat i en body

// const task = {
//   title: 'Ny task',
// }

// const addtask1 = () => {
//   fetch('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify(task)
//   })
//   .then(res => {
//     // felhantering ?
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//     output.insertAdjacentHTML('beforeend', `<li>${data.title}</li>`)
//   })
// }


// const addtask = async () => {
//   const res = await fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify(task)
//   })

//   // felhantering ?
//   const data = await res.json()
//   task = data

//   console.log(data)
//   output.insertAdjacentHTML('beforeend', `<li>${data.title}</li>`)
// }

// addTaskBtn.addEventListener('click', addtask)




// // PUT - Byter ut ett objekt på databasen
// const updatedtask = {
//   title: 'Uppdaterad!',
//   body: 'kjandasjnk fwkj fwkejhf skjhf sdf',
//   userId: 1
// }

// const updatetask1 = (e) => {
//   console.log(e.target.dataset.taskid)

//   fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb' + e.target.dataset.taskid, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify(updatedtask)
//   })
//   .then(res => {
//     console.log(res)
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//     document.querySelector('#task'+data.id).textContent = data.title
//   })
// }

// const updatetask2 = async (e) => {
//   const res = await fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb' + e.target.dataset.taskid, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify(updatedtask)
//   })

//   console.log(res)

//   const data = await res.json()
//   console.log(data)
//   document.querySelector('#task'+data.id).textContent = data.title
// }




// // PATCH
// const updatetask3 = (e) => {
//   console.log(e.target.dataset.taskid)

//   fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb' + e.target.dataset.taskid, {
//     method: 'PATCH',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       title: 'Patchad title'
//     })
//   })
//   .then(res => {
//     console.log(res)
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//     document.querySelector('#task'+data.id).textContent = data.title
//   })
// }


// const updatetask = async (e) => {
//   const res = await fetch('https://js1-todo-api.vercel.app/api/todos/{id}?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb' + e.target.dataset.taskid, {
//     method: 'PATCH',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       title: 'Patchad title'
//     })
//   })

//   console.log(res)

//   const data = await res.json()
//   console.log(data)
//   document.querySelector('#task'+data.id).textContent = data.title
// }

