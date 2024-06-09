const taskText = document.querySelector(".task-text");
let capitalizeText =
  taskText.textContent.charAt(0).toUpperCase() + taskText.textContent.slice(1);
taskText.innerHTML = capitalizeText;
//alert(taskText);
//
//
//
const emailList = document.querySelector(".users-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const email = localStorage.getItem("email") || "user@example.com";
const name = localStorage.getItem("name") || "User";
const taskList = document.querySelector(".tasks-list");
const addTaskButton = document.getElementById("add-task-button");
const newTaskInput = document.getElementById("new-task");
const categoryElement = document.getElementById("category");
const categories = document.querySelectorAll(".category");
const todoInputContainer = document.querySelector(".todo-input-container");
const clearEverythingBtn = document.querySelector(".clear-everything");
let newEmail;

let category = categoryElement.value;
let categoryColor = "";
getCategoryColor(category);

const categoryAllBtn = document.getElementById("toggle-categories-btn");

categoryAllBtn.addEventListener("click", function () {
  if (categories[0].classList.contains("slide-in")) {
    categories.forEach((category) => {
      category.classList.remove("slide-in");
      // category.classList.remove("show");
      category.classList.add("slide-out");
      categoryAllBtn.textContent = ">";
    });
  } else {
    categories.forEach((category) => {
      category.classList.remove("slide-out");
      category.classList.add("slide-in");
      category.classList.add("show");
      categoryAllBtn.textContent = "<";
    });
  }
});

function getCategoryColor(category) {
  switch (category) {
    case "grocery":
      categoryColor = "#556B2F";
      break;
    case "deepwork":
      categoryColor = "#B8860B";
      break;
    case "chores":
      categoryColor = "#483D8B";
      break;
    case "mind":
      categoryColor = "#008B8B";
      break;
    case "nextweek":
      categoryColor = "#B22222";
      break;

    default:
      break;
  }
}

categoryElement.addEventListener("change", function (e) {
  category = e.target.value;
  getCategoryColor(category);
  // console.log(category);
});

categories.forEach((category) => {
  category.addEventListener("click", function (e) {
    console.log(e.target.id);
    if (newEmail) {
      loadTasks(newEmail, e.target.id);
    } else {
      loadTasks(email, e.target.id);
    }
  });
});

loadTasks();

if (email === "admin@gmail.com") {
  loadEmailList();
  todoInputContainer.style.display = "none";
} else {
  clearEverythingBtn.style.display = "none";
}
console.log(tasks);

if (email != "admin@gmail.com") {
  const leftPanel = document.querySelector(".left-container");
  leftPanel.style.display = "none";
  const rightPanel = document.querySelector(".right-container");
  rightPanel.style.maxWidth = "900px";
}

addTaskButton.addEventListener("click", function () {
  const taskText = newTaskInput.value.trim();

  if (taskText !== "" && email !== "") {
    addTask(taskText, email, category, categoryColor);
    newTaskInput.value = "";
  }
});

newTaskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    console.log(category);
    const taskText = newTaskInput.value.trim();
    // const category = getCategory();
    if (taskText !== "" && email !== "") {
      addTask(taskText, email, category, categoryColor);
      newTaskInput.value = "";
    }
  }
});
function logout() {
  // localStorage.removeItem("email");
  location.href = "index.html";
}

function addTask(taskText, taskEmail, category = "Grocery", categoryColor) {
  const task = {
    text: taskText,
    email: taskEmail,
    name: name,
    date: new Date().toLocaleDateString(),
    category: category,
    categoryColor: categoryColor,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshTaskList();
}

function loadTasks(userEmail = email, category = "all") {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  refreshTaskList(userEmail, category);
}

function refreshTaskList(userEmail = email, category = "all") {
  console.log(userEmail, category);
  newEmail = userEmail;
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (
      task.email === userEmail &&
      (task.category === category || category === "all")
    ) {
      // Check if the task's email matches the user's email or if userEmail is set to "all",
      // and if the task's category matches the selected category or if category is set to "all"
      const taskTextShortened = task.text.slice(0, 50);
      const showMoreButton =
        task.text.length > 50
          ? `<span class="less-more" onclick="showFullText(this)" data-task="${task.text}">more</span>`
          : "";
      taskList.innerHTML += `
        <div class="task">
          <div class="task-left">
            <div class="task-logo">
              <i class="fa-regular fa-hourglass-half"></i>
            </div>
            <div class="task-info">
              <p class="task-text">
              ${taskTextShortened}
              ${showMoreButton}
              </p>
              <p class="task-date">${task.date}</p>
              <span class="task-category" style="background-color:${task.categoryColor};">${task.category}</span>
            </div>
          </div>
          <div class="task-control-btns">
            <div class="task-btns">
              <a href="#" class="edit-btn" id="${index}" onclick="editTask(this)">Edit</a>
              <a href="#" class="delete-btn" id="${index}" data-category="${category}" data-email="${task.email}" onclick="removeTask(this)">Delete</a>
            </div>
          </div>
        </div>
      `;
    }
  });
}

function showFullText(button) {
  const taskInfo = button.parentNode;
  const fullText = button.dataset.task;
  const isShowingMore = button.textContent === "more";

  if (isShowingMore) {
    taskInfo.innerHTML =
      fullText +
      `<span class="less-more" onclick="showFullText(this)" data-task="${fullText}">less</span> `;
  } else {
    const shortenedText = fullText.slice(0, 50);
    taskInfo.innerHTML =
      shortenedText +
      `<span class="less-more" onclick="showFullText(this)" data-task="${fullText}">more</span> `;
  }
}

function loadEmailList() {
  const emailSet = new Set();
  emailList.innerHTML = "";

  tasks.forEach((task) => {
    if (!emailSet.has(task.email)) {
      emailSet.add(task.email);
      emailList.innerHTML += `
        <div class="user" onclick="loadTasks('${task.email}')">
          <div class="user-info">
            <h3>${task.name}</h3>
            <h4>${task.email}</h4>
          </div>
        </div>
      `;
    }
  });
}

function removeTask(ele) {
  console.log(ele.dataset);
  tasks.splice(ele.id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshTaskList(ele.dataset.email, ele.dataset.category);
}
function clearEverything() {
  localStorage.clear();
  closeModal();
  location.href = "index.html";
}

// Function to open the modal
function openModal() {
  document.getElementById("modal-container").style.display = "flex";
}

// Function to close the modal
function closeModal() {
  document.getElementById("modal-container").style.display = "none";
}
