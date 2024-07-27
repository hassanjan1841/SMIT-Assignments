import {
  auth,
  createUserWithEmailAndPassword,
  storage,
  ref,
  uploadBytes,
  setDoc,
  doc,
  db,
  getDownloadURL,
} from "../../utils/firebaseConfig.js";

const imagePreview = document.getElementById("image-preview");
const imageFileInput = document.getElementById("image-file-input");

imagePreview.addEventListener("click", () => {
  imageFileInput.click();
});
imageFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imagePreview.style.backgroundImage = `url('${reader.result}')`;
  };
});

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(e.target);
  const image = e.target[0].files[0];
  if (!image) {
    alert("Please select an image");
    return;
  }
  const email = e.target[1].value;

  const password = e.target[2].value;
  const confirmPassword = e.target[3].value;

  const passwordErrorElement = document.getElementById("confirmPasswordError");

  if (password !== confirmPassword) {
    passwordErrorElement.innerHTML = "Password not matched";
    passwordErrorElement.classList.add("text-red-600");
  } else {
    passwordErrorElement.innerHTML = "Password Matched";
    passwordErrorElement.classList.add("text-green-600");
  }

  const firstName = e.target[4].value;
  const lastName = e.target[5].value;
  const phoneNumber = e.target[6].value;
  const company = e.target[7].value;

  const userInfo = {
    image,
    email,
    firstName,
    lastName,
    phoneNumber,
    company,
  };

  createUserWithEmailAndPassword(auth, email, confirmPassword)
    .then((userCredential) => {
      // Signed in
      const userId = userCredential.user.uid;
      const storageRef = ref(storage, `images/${userId}`);
      uploadBytes(storageRef, image)
        .then(() => {
          console.log("Image uploaded");
          getDownloadURL(storageRef).then((url) => {
            userInfo.image = url;
            
            console.log("url=>", url);
            const dbRef = doc(db, "users", userId);
            setDoc(dbRef, userInfo)
              .then(() => {
                console.log("Document written with ID: ", userId);
                window.location.href = "/auth/login/index.html";
              })
              .catch((error) => alert(error));
          });
        })
        .catch((error) => alert(error));
    })
    .catch((error) => alert(error));
});
