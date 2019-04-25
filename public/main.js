axios.get('/tasks').then(response => {
   response.data.forEach(task => addRowToTable(task))
})
const form = document.querySelector('form')
const tbody = document.querySelector('tbody')
const input = document.querySelector('input')


      // write a function to handle the form submission
function handleFormSubmit(event){
    event.preventDefault()
    if(input.value.trim().length > 0){
        axios.post('/tasks', {"description": input.value})
        .then(response => addRowToTable(response.data))
        form.reset()
    }
}
    
    
function addRowToTable(task){
    const tableRow =  `<tr id="${task.id}">
                        <td>${task.description}</td>
                        <td>
                            <button onclick="deleteTask(${task.id})" class="btn btn-danger float-right">
                            Delete
                            </button>
                        </td>
                        </tr>`
    // get the table row into the table at the top
    tbody.innerHTML = tableRow + tbody.innerHTML

}
      
      function deleteTask(id){
        if(confirm('Are you sure?')){
            axios.delete(`/tasks/${id}`)
            .then(response =>{
                const task = document.getElementById(response.data.id)
                task.remove()
            })
        }
      }

      // listen to the submit event and run the function
      form.addEventListener('submit', handleFormSubmit)