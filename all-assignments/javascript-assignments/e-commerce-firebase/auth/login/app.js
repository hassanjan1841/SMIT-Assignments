import { toggleNavbar } from "../../products/single_product/utils.js";
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "../../utils/firebaseConfig.js";
import { hideButtons, logoutFunction, showButtons } from "../../utils/utils.js";
toggleNavbar();
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "/";
    showButtons();
    logoutFunction();
  } else {
    hideButtons();
  }
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
});
