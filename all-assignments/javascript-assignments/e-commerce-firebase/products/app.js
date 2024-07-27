import { hideButtons, showButtons, showProducts } from "../app.js";
import {
  onAuthStateChanged,
  auth,
  query,
  where,
  collection,
  db,
  getDocs,
} from "../utils/firebaseConfig.js";

const productContainer = document.getElementById("products-container");

onAuthStateChanged(auth, (user) => {
  //   toggleButtons(user);
  if (user) {
    showButtons();
    const q = query(
      collection(db, "products"),
      where("userId", "==", user.uid)
    );
    getDocs(q).then((querySnapshot) => {
      showProducts(querySnapshot.docs);
    });
  } else {
    hideButtons();
    window.location.href = "../auth/login/index.html";
  }
});
