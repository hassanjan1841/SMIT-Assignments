// script.j
document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const expenseStats = document.getElementById("expense-stats");
  const clearBtn = document.getElementById("clear-btn");
  let expenses = [];

  // Event listener for form submission
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;

    if (!isNaN(amount)) {
      addExpense(amount, category);
      updateUI();
    } else {
      alert("Please enter a valid amount.");
    }

    expenseForm.reset();
  });

  // Event listener for clear button
  clearBtn.addEventListener("click", function () {
    expenses = [];
    updateUI();
  });

  // Function to add an expense
  function addExpense(amount, category) {
    const expense = {
      id: Date.now(),
      amount: amount,
      category: category,
    };
    expenses.push(expense);
  }

  // Function to delete an expense
  function deleteExpense(id) {
    expenses = expenses.filter((expense) => expense.id !== id);
    updateUI();
  }

  // Function to update the UI
  function updateUI() {
    // Clear expense list
    expenseList.innerHTML = "";

    // Render each expense item
    expenses.forEach((expense) => {
      const item = document.createElement("div");
      item.classList.add("expense-item");
      item.innerHTML = `
                <span>${expense.amount}</span>
                <span>${expense.category}</span>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
      expenseList.appendChild(item);
    });

    // Update statistics
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const categories = {};
    expenses.forEach((expense) => {
      categories[expense.category] =
        (categories[expense.category] || 0) + expense.amount;
    });
    const statsHTML = `
            <h3>Total Expenses: $${total.toFixed(2)}</h3>
            <h3>Category Breakdown:</h3>
            <ul>
                ${Object.keys(categories)
                  .map(
                    (category) =>
                      `<li>${category}: $${categories[category].toFixed(2)}</li>`,
                  )
                  .join("")}
            </ul>
        `;
    expenseStats.innerHTML = statsHTML;
  }

  // Function to edit an expense
  window.editExpense = function (id) {
    const expense = expenses.find((expense) => expense.id === id);
    if (!expense) return;

    const newAmount = prompt("Enter the new amount:", expense.amount);
    const newCategory = prompt("Enter the new category:", expense.category);

    if (newAmount !== null && newCategory !== null) {
      expense.amount = parseFloat(newAmount);
      expense.category = newCategory;
      updateUI();
    }
  };
});
