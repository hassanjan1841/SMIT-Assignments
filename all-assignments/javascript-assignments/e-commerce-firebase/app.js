import { toggleNavbar } from "./products/single_product/utils.js";
import {
  auth,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  signOut,
} from "./utils/firebaseConfig.js";
import {
  hideButtons,
  hideLoader,
  showButtons,
  showLoader,
  showProducts,
} from "./utils/utils.js";

const logoutBtn = document.getElementById("logout-btn");
const heroTitle = document.getElementById("hero-title");
const heroImage = document.getElementById("hero-image");
const heroDescription = document.getElementById("hero-description");
toggleNavbar();
showLoader();

// document.addEventListener("DOMContentLoaded", () => {
//   hideLoader();
// });

logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User signed out");
  });
});

onAuthStateChanged(auth, (user) => {
  //   toggleButtons(user);
  if (user) {
    showButtons();
  } else {
    hideButtons();
  }
});

getDocs(collection(db, "products"))
  .then((querySnapshot) => {
    getSingleProduct(querySnapshot);
    showProducts(querySnapshot);
  })
  .finally(() => {
    hideLoader();
  });

const getSingleProduct = (products) => {
  products.forEach((document, index) => {
    const docRef = doc(db, "products", document.id);
    getDoc(docRef).then((doc) => {
      console.log(doc.data());
      const product = doc.data();
      heroTitle && (heroTitle.innerHTML = product.productName);
      // productNameEl.innerHTML = product.productName;
      heroImage && (heroImage.src = product.productImage);
    });
    if (index > 0) {
      return;
    }
  });
};
