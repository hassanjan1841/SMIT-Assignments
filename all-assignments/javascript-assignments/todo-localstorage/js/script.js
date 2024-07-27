document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task-button");
  const taskList = document.getElementById("task-list");
  const newTaskInput = document.getElementById("new-task");
  const userEmail = document.getElementById("user-email");
  const logoutButton = document.getElementById("logout-button");
  const emailList = document.getElementById("email-list");

  // Get the logged-in user's email from local storage
  const email = localStorage.getItem("email") || "user@example.com";
  userEmail.textContent = email;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load tasks and email list from local storage
  loadTasks();
  if (email === "admin@gmail.com") {
    loadEmailList();
  }

  addTaskButton.addEventListener("click", function () {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "" && email !== "") {
      addTask(taskText, email);
      newTaskInput.value = "";
    }
  });

  newTaskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const taskText = newTaskInput.value.trim();
      if (taskText !== "" && email !== "") {
        addTask(taskText, email);
        newTaskInput.value = "";
      }
    }
  });

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("email");
    location.href = "login.html";
  });

  function addTask(taskText, taskEmail) {
    const task = { text: taskText, email: taskEmail };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
  }

  function loadTasks(userEmail = email) {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    refreshTaskList(userEmail);
  }

  function refreshTaskList(userEmail = email) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      if (task.email === userEmail) {
        taskList.innerHTML += `
          <li>
            <span class="task-details">${task.text}</span>
            <span class="task-email">${task.email}</span>
            <button class="delete-button" data-index="${index}">Delete</button>
          </li>
        `;
      }
    });

    // Add event listeners to delete buttons
    const deleteButtons = taskList.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        removeTask(button.dataset.index);
      });
    });
  }

  function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
  }

  function loadEmailList() {
    const emailSet = new Set(tasks.map((task) => task.email));
    //alert(emailSet.size);
    emailList.innerHTML = "";
    emailSet.forEach((email) => {
      const emailItem = document.createElement("div");
      emailItem.className = "email-item";
      emailItem.textContent = email;
      emailItem.addEventListener("click", function () {
        loadTasks(email);
      });
      emailList.appendChild(emailItem);
    });
  }
});
