// script.js
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginForm.email.value.trim();
    const name = loginForm.name.value.trim();

    if (email === "" || name === "") {
      alert("Please fill in both fields.");
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    location.href = "home.html";
    // Simulate form submission
    // alert("Login successful!");
  });
});
