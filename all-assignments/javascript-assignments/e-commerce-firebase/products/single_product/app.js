import { hideButtons, hideLoader, showButtons, showLoader } from "../../app.js";
import {
  addDoc,
  auth,
  collection,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
} from "../../utils/firebaseConfig.js";

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("productId")); // price_descending

const productPriceEl = document.getElementById("product-price");
const productNameEl = document.getElementById("product-name");
const productImageEl = document.getElementById("product-image");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const loginErrorModal = document.getElementById("loginErrorModal");
const modalCloseBtn = document.getElementById("closeLoginErrorModal");
const deliveryChargesEl = document.getElementById("delivery_charges");

const docRef = doc(db, "products", searchParams.get("productId"));

getDoc(docRef).then((doc) => {
  console.log(doc.data());
  const product = doc.data();
  productPriceEl.innerHTML = product.productPrice;
  productNameEl.innerHTML = product.productName;
  productImageEl.src = product.productImage;
});

const cartProductInfo = {
  productId: searchParams.get("productId"),
  userId: null,
  quantity: 1,
};

const addToCart = (user) => {
  if (user) {
    cartProductInfo.userId = user.uid;
    const collectionRef = collection(db, "cart");
    addDoc(collectionRef, cartProductInfo)
      .then((cartProduct) => {
        console.log("Product added to cart", cartProduct);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
      .finally(() => {
        hideLoader();
      });
  } else {
    showLoginModal();
  }
};

onAuthStateChanged(auth, (user) => {
  addToCartBtn.addEventListener("click", () => {
    console.log("add to cart clicked");
    showLoader();
    addToCart(user);
  });
  if (user) {
    showButtons();
  } else {
    hideButtons();
  }
});

const showLoginModal = () => {
  loginErrorModal.style.display = "block";
  modalCloseBtn.addEventListener("click", () => {
    loginErrorModal.style.display = "none";
  });
};

document.querySelectorAll('input[name="courier"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    switch (e.target.value) {
      case "tcs":
        deliveryChargesEl.innerHTML = `$200`;
        break;
      case "leopard":
        deliveryChargesEl.innerHTML = `$300`;
        break;
      case "dhl":
        deliveryChargesEl.innerHTML = `$400`;
        break;
      case "m&p":
        deliveryChargesEl.innerHTML = `$100`;
        break;
      default:
        deliveryChargesEl.innerHTML = `$0`;
    }
  });
});
