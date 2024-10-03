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
            <input type="checkbox" onclick="markComplete(this)" />
            <span>${task}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
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
            <input type="checkbox" ${completed ? 'checked' : ''} onclick="markComplete(this)" />
            <span class="${completed ? 'completed' : ''}">${name}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        document.getElementById("taskList").appendChild(li);
    });
}

function removeTask(button) {
    const li = button.parentElement; // Get the parent li
    const taskText = li.querySelector('span').textContent;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.name !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
}

// Function to mark tasks as completed
function markComplete(checkbox) {
    const li = checkbox.parentElement; // Get the parent li
    const taskText = li.querySelector('span').textContent;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        if (task.name === taskText) {
            task.completed = checkbox.checked; // Update completion status based on checkbox
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.querySelector('span').classList.toggle('completed', checkbox.checked); // Toggle completed class for styling
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
