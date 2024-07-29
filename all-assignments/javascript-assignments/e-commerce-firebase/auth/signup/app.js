import { showLoader } from "../../app.js";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  getDownloadURL,
  ref,
  setDoc,
  storage,
  uploadBytes,
} from "../../utils/firebaseConfig.js";

const signupForm = document.getElementById("signup-form");
const validationContainer = document.getElementById("validation-container");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const profileIMageINput = document.getElementById("profileImage");
const showIMage = document.getElementById("imageEL");
const loaderContainer = document.querySelector(".loader-container");
const submitBtnText = document.querySelector("button span");

profileIMageINput.addEventListener("change", (e) => {
  console.log("e.target.files[0]", e.target.files[0]);
  const reader = new FileReader();
  reader.onload = (e) => {
    showIMage.src = e.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

// const submitBtn = document.getElementById("submit_btn");

password.addEventListener("keyup", () => {
  console.log("confirmPassword.value", password.value);
  passwordValidation(password.value, password.value);
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInfo = {
    profileImage: e.target[0].files[0],
    firstName: e.target[1].value,
    lastName: e.target[2].value,
    email: e.target[3].value,
    password: e.target[4].value,
    confirmPassword: e.target[5].value,
  };
  const { email, confirmPassword, profileImage } = userInfo;
  if (profileImage === undefined) {
    alert("Please upload an image");
    return;
  }
  createUserWithEmailAndPassword(auth, email, confirmPassword)
    .then((userCredential) => {
      console.log("user singed up", userCredential);
      const userId = userCredential.user.uid;
      showLoader();

      const imageRef = ref(
        storage,
        `profileImages/${userId}/${profileImage.name}`
      );
      uploadBytes(imageRef, profileImage).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
        getDownloadURL(imageRef)
          .then((url) => {
            console.log("url", url);
            userInfo.profileImage = url;
            const docRef = doc(db, "users", userCredential.user.uid);
            setDoc(docRef, userInfo)
              .then(() => {
                console.log("Document written with ID: ", docRef.id);
                loaderContainer.style.display = "none";
                submitBtnText.style.display = "inline-block";
                window.location.href = "/auth/login/index.html";
              })
              .catch((error) => console.log("error", error));
          })
          .catch((error) => console.log("error", error));
      });
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
