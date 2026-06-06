const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');





let tasks;
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    } catch {
        tasks = [];
    }
renderTask();



addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener("keypress", e => e.key === 'Enter' && addTask());

function addTask(){
    const errorMessage = document.getElementById('errorMessage');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        errorMessage.textContent = 'Task cannot be empty!';
        taskInput.style.borderColor = 'red';
        return;
    }

    taskInput.style.borderColor = '#ccc';
    errorMessage.textContent = '';

     tasks.push({id: crypto.randomUUID(), text: taskText, completed: false});
     taskInput.value = '';
   
     saveAndRender();

    }




function renderTask(){
    taskList.innerHTML = '';

    tasks.forEach((t, index) => {
        const li = document.createElement('li');
        if(t.completed) li.classList.add('completed');
       

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = t.completed;

        
        


        const span = document.createElement('span');
        span.textContent = t.text ;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';


         checkbox.addEventListener('change', () => {
                tasks[index].completed = checkbox.checked;
                li.classList.toggle('completed', t.completed);
                saveAndRender();
            });

        
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveAndRender();
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        


    });
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask();
}

