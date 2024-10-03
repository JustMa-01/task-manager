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
        li.innerHTML = task + ' <button onclick="removeTask(this)">Remove</button>';
        taskList.appendChild(li);

        saveTask(task);
        taskInput.value = '';
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = task + ' <button onclick="removeTask(this)">Remove</button>';
        document.getElementById("taskList").appendChild(li);
    });
}

function removeTask(button) {
    const li = button.parentElement;
    const taskText = li.firstChild.textContent;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
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
