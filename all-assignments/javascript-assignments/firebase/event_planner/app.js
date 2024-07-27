import {
  app,
  db,
  auth,
  storage,
  onAuthStateChanged,
  signOut,
} from "./utils/firebaseConfig.js";

console.log("app=>", app);
console.log("db=>", db);
console.log("auth=>", auth);
console.log("storage=>", storage);

// e.preventDefault();

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    // if (window.location.pathname == "/") {
    window.location.href = "/auth/login/index.html";
    // }
  }
});

const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log("An error happened.", error);
    });
});
