import {
  onAuthStateChanged,
  auth,
  query,
  where,
  collection,
  db,
  getDocs,
} from "../utils/firebaseConfig.js";
import {
  hideButtons,
  logoutFunction,
  showButtons,
  showProducts,
} from "../utils/utils.js";
import { toggleNavbar } from "./single_product/utils.js";
toggleNavbar();

onAuthStateChanged(auth, (user) => {
  //   toggleButtons(user);
  if (user) {
    showButtons();
    logoutFunction();
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
