// implementing a task
let tasks = [];

const addTask = ()=> {
    const taskInput = document.getElementById("taskInput")
    const text = taskInput.ariaValueMax.trip()

    if(text){
        tasks.push({text: text, completed: false});

        updateTasksList();
    }
};

const updateTasksList = ()=> {
    const taskList = document.getElementById("task-list")
    taskList.innerHTML = "";
     
    tasks.forEach((tasks, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class = "taskItem">
            <div class = "task ${task.completed ? 'completed':''}">
                <input type = "checkbox" class "checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p> {} </p>
            </div>
            <div class = "icons">
                <img src = "" />
                <img src = "" />
            </div>
        </div>
        `;

        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
}

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault()

    addTask();
})