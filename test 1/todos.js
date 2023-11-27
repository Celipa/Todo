const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const form = document.querySelector('form');

form.addEventListener("submit", async () => {
    const response = await fetch ('https://js1-todo-api.vercel.app/api/todos?apikey=dcab7abf-b780-4f35-a791-cb0f8bd53feb', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title:taskInput.value
      })
    })
    if(response.status !== 201) {
      console.log('Något gick fel')
      return
    }
    const data = await response.json()
    console.log(data)
  })
  
  