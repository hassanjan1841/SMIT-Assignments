import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "../../utils/firebaseConfig.js";

const signupForm = document.getElementById("signup-form");
const validationContainer = document.getElementById("validation-container");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const loaderContainer = document.querySelector("#submit_btn .loader-container");
const submitBtnText = document.querySelector("#submit_btn span");
const submitBtn = document.getElementById("submit_btn");

[confirmPassword, password].forEach((element) => {
  element.addEventListener("keyup", () => {
    console.log("confirmPassword.value", confirmPassword.value);
    passwordValidation(password.value, confirmPassword.value);
  });
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  submitBtnText.style.display = "none";
  loaderContainer.style.display = "block";

  const userInfo = {
    firstName: e.target[0].value,
    lastName: e.target[1].value,
    email: e.target[2].value,
    password: e.target[3].value,
    confirmPassword: e.target[4].value,
  };

  const { email, confirmPassword } = userInfo;
  createUserWithEmailAndPassword(auth, email, confirmPassword)
    .then((userCredential) => {
      console.log("user singed up", userCredential);

      const docRef = doc(db, "users", userCredential.user.uid);
      setDoc(docRef, userInfo)
        .then(() => {
          console.log("Document written with ID: ", docRef.id);
          loaderContainer.style.display = "none";
          submitBtnText.style.display = "inline-block";
          window.location.href = "../login/index.html";
        })
        .catch((error) => console.log("error", error));
    })
    .then((error) => console.log("error", error));
});

const passwordValidation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    validationContainer.innerHTML = `<span class="text-sm text-red-500">Passwords do not match</span>`;
    return;
  } else if (confirmPassword.length < 8) {
    validationContainer.innerHTML = `<span class="text-sm text-red-500">Password must be at least 6 characters long</span>`;
    return;
  } else if (!/\d/.test(confirmPassword)) {
    validationContainer.innerHTML = `<span class="text-sm text-red-500">Password must contain at least one number</span>`;
    return;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword)) {
    validationContainer.innerHTML = `<span class="text-sm text-red-500">Password must contain at least one symbol</span>`;
    return;
  } else if (!/[a-z]/.test(confirmPassword) || !/[A-Z]/.test(confirmPassword)) {
    validationContainer.innerHTML = `<span class="text-sm text-red-500">Password must contain at least one uppercase and one lowercase letter</span>`;
    return;
  } else {
    validationContainer.innerHTML = `<span class="text-sm text-green-500 font-bold">Password is valid</span>`;
  }
};
