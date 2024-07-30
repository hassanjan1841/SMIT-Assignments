import {
  addDoc,
  auth,
  collection,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  setDoc,
} from "../../utils/firebaseConfig.js";
import {
  hideButtons,
  hideLoader,
  showButtons,
  showLoader,
} from "../../utils/utils.js";
import { toggleNavbar } from "./utils.js";

const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("productId"));

const productPriceEl = document.getElementById("product-price");
const productNameEl = document.getElementById("product-name");
const productImageEl = document.getElementById("product-image");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const loginErrorModal = document.getElementById("loginErrorModal");
const modalCloseBtn = document.getElementById("closeLoginErrorModal");

toggleNavbar();

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
  deliveryCharges: 0,
};

const addToCart = () => {
  if (cartProductInfo.userId != null) {
    cartProductInfo.userId;
    const docRef = doc(db, "cart", cartProductInfo.productId);
    setDoc(docRef, cartProductInfo)
      .then((cartProduct) => {
        console.log("Product added to cart", cartProduct);
        alert("Product added to cart");
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
  cartProductInfo.userId = user?.uid;
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

// Function to increment the quantity of a product
async function increment(el) {
  const quantityInput = el.previousElementSibling;
  const quantity = +quantityInput.value;
  quantityInput.value = quantity + 1;
  cartProductInfo.quantity = quantityInput.value;
}

// Function to decrement the quantity of a product
async function decrement(el) {
  const quantityInput = el.nextElementSibling;
  const quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
  }
  cartProductInfo.quantity = quantityInput.value;
}

const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");

incrementBtn.addEventListener("click", () => {
  increment(incrementBtn);
});
decrementBtn.addEventListener("click", () => {
  decrement(decrementBtn);
});
