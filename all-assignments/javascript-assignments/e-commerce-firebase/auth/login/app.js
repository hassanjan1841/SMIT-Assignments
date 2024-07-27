import {
  auth,
  signInWithEmailAndPassword,
} from "../../utils/firebaseConfig.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
});
