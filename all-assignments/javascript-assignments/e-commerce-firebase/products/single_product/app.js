import { hideButtons, showButtons } from "../../app.js";
import {
  db,
  doc,
  getDoc,
  onAuthStateChanged,
} from "../../utils/firebaseConfig.js";

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("userId")); // price_descending

const productPriceEl = document.getElementById("product-price");
const productNameEl = document.getElementById("product-name");
const productImageEl = document.getElementById("product-image");

const docRef = doc(db, "products", searchParams.get("userId"));

getDoc(docRef).then((doc) => {
  console.log(doc.data());
  const product = doc.data();
  productPriceEl.innerHTML = product.productPrice;
  productNameEl.innerHTML = product.productName;
  productImageEl.src = product.productImage;
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    showButtons();
  } else {
    hideButtons();
  }
});
