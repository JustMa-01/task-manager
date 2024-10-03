document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadTheme(); // Load saved theme preference
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const task = taskInput.value.trim();

    if (task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button onclick="markComplete(this)">Complete</button>
                <button onclick="removeTask(this)">Remove</button>
            </div>`;
        taskList.appendChild(li);

        saveTask(task);
        taskInput.value = '';
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: task, completed: false }); // Save completion status
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ name, completed }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${completed ? 'completed' : ''}">${name}</span>
            <div>
                <button onclick="markComplete(this)">Complete</button>
                <button onclick="removeTask(this)">Remove</button>
            </div>`;
        document.getElementById("taskList").appendChild(li);
    });
}

function removeTask(button) {
    const li = button.parentElement.parentElement; // Get the parent li
    const taskText = li.firstChild.textContent;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.name !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
}

// Function to mark tasks as completed
function markComplete(button) {
    const li = button.parentElement.parentElement; // Get the parent li
    const taskText = li.firstChild.textContent;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        if (task.name === taskText) {
            task.completed = !task.completed; // Toggle completion status
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.firstChild.classList.toggle('completed'); // Toggle completed class for styling
}

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");

    // Save the theme preference
    if (body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
}
