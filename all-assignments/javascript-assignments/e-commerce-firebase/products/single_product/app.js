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
  deliveryCharges: 0,
};

const addToCart = () => {
  if (cartProductInfo.userId != null) {
    cartProductInfo.userId;
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

const updateDeliveryRate = (radioVAlue) => {
  switch (radioVAlue) {
    case "tcs":
      return `$200`;
      break;
    case "leopard":
      return `$300`;
      break;
    case "dhl":
      return `$400`;
      break;
    case "m&p":
      return `$100`;
      break;
    default:
      return `$0`;
  }
};
document.querySelectorAll('input[name="courier"]').forEach((radio) => {
  if (radio.checked) {
    console.log("radio value", radio.value);
    // updateDeliveryRate(radio.value);
    cartProductInfo.deliveryCharges = updateDeliveryRate(radio.value);
  }
  radio.addEventListener("change", (e) => {
    console.log("radio value", e.target.value);
    // updateDeliveryRate(e.target.value);
    cartProductInfo.deliveryCharges = updateDeliveryRate(e.target.value);
  });
});

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
