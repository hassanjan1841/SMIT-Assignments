import { auth, signInWithEmailAndPassword } from "../../utils/firebaseConfig.js";

const signInForm = document.getElementById("signin-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // console.log("user=>", user);
    window.location.href = "/";
  });
});
