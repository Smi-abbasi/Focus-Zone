const clock = document.getElementById("clock");
const greeting = document.getElementById("greeting");

const timer = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");



function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours >= 5 && hours < 12) {
        greeting.textContent = "Good Morning 👋";
    } else if (hours >= 12 && hours < 17) {
        greeting.textContent = "Good Afternoon 👋";
    } else {
        greeting.textContent = "Good Evening 👋";
    }

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

updateClock();
setInterval(updateClock, 1000);

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const noTasks = document.getElementById("no-tasks");

function updateEmptyState() {
    if (taskList.children.length === 0) {
        noTasks.style.display = "block";
    } else {
        noTasks.style.display = "none";
    }
}

addBtn.addEventListener("click", addTask);
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    if (taskList.children.length >= 3) {
        alert("You can only add 3 active tasks.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔ Done";

    completeBtn.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = " 🗑 Remove ";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateEmptyState();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    updateEmptyState();

    taskInput.value = "";
}

let timeLeft = 1800;
let interval;

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
}

updateTimer();

startBtn.addEventListener("click", startTimer);
function startTimer() {

    if (interval) {
        return;
    }

    interval = setInterval(function () {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimer();

        } else {

            clearInterval(interval);

            interval = null;

            timeLeft = 1800;

            updateTimer();

            alert("Pomodoro completed! Great job 🎉");
        }

    }, 1000);

}

pauseBtn.addEventListener("click", pauseTimer);

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

resetBtn.addEventListener("click", resetTimer);
function resetTimer() {

    clearInterval(interval);

    interval = null;

    timeLeft = 1800;

    updateTimer();

}
updateEmptyState();