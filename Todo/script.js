const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const task = taskInput.value.trim();

  if (task === "") {
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

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

const output = document.querySelector('#out')
const todos = []

const getTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
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
    fetch('https://jsonplaceholder.typicode.com/todos', {
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

//       data.forEach(todo => {
//         todos.push(todo)
//       })
//       todos.forEach(todo =>{
//         output.insertAdjacentHTML('beforeend', `<li>${todo.title}</li>`)
//       })
//     })
// }
// getTodos()




function rendertasks() {
  const output = document.querySelector('#output')
  output.innerHTML = ''

  tasks.forEach(task => {
    output.appendChild(createtaskElement(task))
  })
}


// function createtaskElement(task) {
//   const taskDiv = createCustomElement('div', 'task')

//   const imgContainer = createCustomElement('div', 'img-container')
//   const img = createCustomElement('img')
//   img.setAttribute('src', task.imgUrl)
//   imgContainer.appendChild(img)
//   taskDiv.appendChild(imgContainer)

//   const contentDiv = createCustomElement('div', 'content')
//   const contentTitle = createCustomElement('h2', 'content_title', task.title)

//   const info = createCustomElement('div', 'info')
//   const categories = createCustomElement('ul', 'categories')
//   task.categories.forEach(cat => {
//     const categoryLi = createCustomElement('li', '', cat)
//     categories.appendChild(categoryLi)
//   })
//   const author = createCustomElement('p', '', 'Author: ' + task.author)
//   info.append(categories, author)

//   const bodyDiv = createCustomElement('p', 'task_body', task.body.slice(0, 100) + '...')
//   const link = createCustomElement('a', 'btn btn-primary bottom-right', 'Read more')

//   contentDiv.append(contentTitle, info, bodyDiv, link)
//   taskDiv.appendChild(contentDiv)
//   return taskDiv
// }



// function createCustomElement(type, classList, text) {
//   const el = document.createElement(type)
//   if(classList && classList.length > 0) {
//     el.className = classList
//   }
//   if(text) {
//     el.textContent = text
//   }
//   return el
// }