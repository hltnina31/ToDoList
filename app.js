/** Implementing a task - Declares an empty array named 'tasks'
 * This array is basically the central memory of your to-do list: multiple values get stored
 */
let tasks = []; 

/**
 * Event listener that runs when the DOM (document object model) is fully loaded.
 * It attempts to load stored tasks from Local Storage and initializes the UI.
 * Basically saving data so it doesn't disappear when closing the browser tab.
 */
document.addEventListener ("DOMContentLoaded", () => {
      // Attempt to retrieve tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

      // If tasks are found, load them and update the UI
    if(storedTasks) {
        // Use forEach to safely push items from localStorage array into the global 'tasks' array
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();

    }
});

/**
 * Saves the current state of the global 'tasks' array to Local Storage.
 * The data is stored as a JSON string under the key "tasks".
 */
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

};

/**
 * Adds a new task based on the content of the task input field.
 * Only adds the task if the input is not empty after trimming whitespace.
 */
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        // Add new task object to the array
        tasks.push({text:text, completed: false });
         // Reset input field
        taskInput.value = "";
         // Update UI and save state
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

/**
 * Deletes a task from the list at the specified index.
 * @param {number} index - The zero-based index of the task to delete.
 */
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

/**
 * Prepares a task for editing by moving its text into the input field
 * and immediately removing the old task from the list.
 * @param {number} index - The zero-based index of the task to edit.
 */
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    // Populate input with the task's current text
    taskInput.value = tasks[index].text;

    // Remove the task from the list (it will be re-added via addTask)
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

/**
 * Updates the task statistics and the progress bar in the UI.
 * Calculates the total tasks, completed tasks, and the completion percentage.
 */
const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    // Calculate progress as a percentage
    const progress = (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById ("progress");

    // Update progress bar width
    progressBar.style.width = `${progress}%`; 

    // Update numerical counter
    document.getElementById(
        "numbers"
        ).innerText = `${completeTasks} / ${totalTasks}`;

};

/**
 * Toggles the 'completed' status of a task at the specified index.
 * @param {number} index - The zero-based index of the task to toggle.
 */
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

/**
 * Renders the entire list of tasks to the DOM.
 * Clears the existing list and rebuilds it based on the current 'tasks' array.
 */
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    // Clear existing list content
    taskList.innerHTML = "";
     
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        // Construct the HTML for a single task item
        listItem.innerHTML = `
        <div class = "taskItem">
            <div class = "task ${task.completed ? "completed" : ""}">
                <input type = "checkbox" class = "checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p> ${task.text} </p>
            </div>
            <div class = "icons">
                <img src = "./images/edit_icon.png" onClick= "editTask(${index})" />
                <img src = "./images/bin_icon.png" onClick= "deleteTask(${index})" />
            </div>
        </div>
        `;

        // Attach change listener to the list item to handle checkbox toggles
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

/**
 * Event listener for the "Add New Task" button.
 * Prevents default form submission and calls the addTask function.
 */
document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});