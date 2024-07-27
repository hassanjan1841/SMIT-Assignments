// script.js

document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-task-btn");
  const newTaskInput = document.getElementById("new-task");
  const taskList = document.getElementById("task-list");

  const editModal = document.getElementById("edit-modal");
  const editTaskInput = document.getElementById("edit-task-input");
  const saveEditBtn = document.getElementById("save-edit-btn");
  const closeBtn = document.querySelector(".close-btn");

  let tasks = [];
  let currentEditIndex = null;

  addTaskBtn.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
      tasks.unshift(taskText);
      newTaskInput.value = "";
      renderTasks();
    }
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
      taskList.appendChild(li);
    });
  }

  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      currentEditIndex = e.target.dataset.index;
      editTaskInput.value = tasks[currentEditIndex];
      editModal.style.display = "flex";
    } else if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      renderTasks();
    }
  });

  saveEditBtn.addEventListener("click", () => {
    const updatedTaskText = editTaskInput.value.trim();
    if (updatedTaskText) {
      tasks[currentEditIndex] = updatedTaskText;
      editModal.style.display = "none";
      renderTasks();
    }
  });

  closeBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == editModal) {
      editModal.style.display = "none";
    }
  });

  renderTasks();
});
