// Import necessary functions and objects from your Firebase configuration

import { toggleNavbar } from "../products/single_product/utils.js";
import {
  auth,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  query,
  where,
  onSnapshot,
  updateDoc,
  setDoc,
} from "../utils/firebaseConfig.js";
import { hideButtons, showButtons } from "../utils/utils.js";
import { displayProduct, fetchProductData } from "./utils.js";
toggleNavbar();
// Reference to the cart products container element
const cartProductsEl = document.getElementById("cartProductsContainer");
const cartProductsData = []; // Set to keep track of processed product IDs
// const processedProductIds = new Set();
const totalFinalPriceEl = document.getElementById("total-final-price");
const subTotalPrice = document.getElementById("sub-total");
const deliveryChargesEL = document.getElementById("delivery-charges");
const checkoutBtn = document.getElementById("checkoutBtn");

let checkoutDeliveryCharges = 0;
let checkoutSubtotal = 0;

let userId = { id: "" };
let deliveryChargesValue = 0;

onAuthStateChanged(auth, async (user) => {
  cartProductsEl.innerHTML = "";
  userId.id = user.uid;
  if (user) {
    await fetchCartProducts();
    showButtons();
    // await caartProducts();
  } else {
    hideButtons();
  }
});

async function fetchCartProducts() {
  const processedProductIds = new Set();
  try {
    // Clear existing data and arrays
    cartProductsEl.innerHTML = "";
    cartProductsData.length = 0;
    processedProductIds.clear();

    const q = query(collection(db, "cart"), where("userId", "==", userId.id));

    // Set up real-time listener for the cart collection
    const querySnapshot = await getDocs(q);
    // Use Promise.all to handle all fetch operations concurrently
    const fetchPromises = querySnapshot.docs.map(async (singleDoc) => {
      const { productId, quantity, userId } = singleDoc.data();

      // Check if the productId has already been processed
      if (!processedProductIds.has(productId)) {
        console.log("Product ID:", productId, processedProductIds);
        const product = await fetchProductData(productId);

        // Only process valid products
        if (product) {
          console.log("Product data:", product, singleDoc.data());
          cartProductsData.push({ product, quantity, userId });
          displayProduct(product, quantity, singleDoc.id, cartProductsEl);
          processedProductIds.add(productId); // Add to set after processing
        }
      }
    });

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);
    await fetchProductPrices();
    console.log("All IDs", processedProductIds);
    console.log("All done", cartProductsData);
    localStorage.setItem("cartPrices", JSON.stringify(cartProductsData));
  } catch (error) {
    console.log("Error setting up real-time listener:", error);
  }
}

async function updatePrices() {
  const processedProductIds = new Set();
  try {
    // Clear existing data and arrays
    // cartProductsEl.innerHTML = "";
    cartProductsData.length = 0;
    processedProductIds.clear();

    const q = query(collection(db, "cart"), where("userId", "==", userId.id));

    // Set up real-time listener for the cart collection
    const querySnapshot = await getDocs(q);
    // Use Promise.all to handle all fetch operations concurrently
    const fetchPromises = querySnapshot.docs.map(async (singleDoc) => {
      const { productId, quantity, userId } = singleDoc.data();

      // Check if the productId has already been processed
      if (!processedProductIds.has(productId)) {
        const product = await fetchProductData(productId);

        // Only process valid products
        if (product) {
          console.log("Product data:", product, singleDoc.data());
          cartProductsData.push({ product, quantity, userId });
          // displayProduct(product, quantity, singleDoc.id);
          processedProductIds.add(productId); // Add to set after processing
        }
      }
    });

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);
    await fetchProductPrices();
    console.log("update All done", cartProductsData);
  } catch (error) {
    console.log("Error setting up real-time listener:", error);
  }
}

// Functipon to calculate the total price of cart products
function calculateTotalPrice() {
  let totalPrice = 0;
  cartProductsData.forEach((product) => {
    const productPrice = +product.product.productPrice;
    const quantity = product.quantity;
    // deliveryCharges = product.deliveryCharges;
    totalPrice += productPrice * quantity;
    // console.log("delivery carhges totla price==> :", deliveryCharges);
    // console.log(totalPrice);
  });
  return totalPrice;
}

// Function to fetch product prices and calculate the total price of cart products
async function fetchProductPrices() {
  try {
    for (const product of cartProductsData) {
      const productId = product.product.productId;
      const productData = await fetchProductData(productId);
      // console.log("product data===>> ", productData);
      if (productData) {
        product.product.productPrice = productData.productPrice;
      }
    }
    const totalPrice = calculateTotalPrice();
    subTotalPrice.innerHTML = `$${totalPrice}.00`;
    totalFinalPriceEl.innerHTML = `$${+totalPrice + +deliveryChargesValue}.00`;
    checkoutSubtotal = totalPrice;
    // deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
    console.log("Total price:", totalPrice);
  } catch (error) {
    console.log("Error fetching product prices:", error);
  }
}

// Function to fetch product data by product ID

// Function to increment the quantity of a product
// Function to increment the quantity of a product
async function increment(el) {
  const productPrice = +el.dataset.productPrice;
  const quantityInput = el.previousElementSibling;
  const quantity = +quantityInput.value;
  const totalPriceEl = el.parentElement.nextElementSibling;
  const totalPrice = +productPrice * (quantity + 1);
  // const deliveryCharges = +el.dataset.deliveryCharges;
  checkoutSubtotal = totalPrice;
  totalPriceEl.innerHTML = `$${totalPrice}.00`;
  quantityInput.value = quantity + 1;
  try {
    const docRef = doc(db, "cart", el.dataset.cartId);
    await updateDoc(docRef, {
      quantity: quantity + 1,
    });
    // fetchProductPrices();
    await updatePrices();
    updateCartData(el.dataset.cartId, quantity + 1);
    const subtotalPrice = calculateTotalPrice();
    subTotalPrice.innerHTML = `$${subtotalPrice}.00`;
    totalFinalPriceEl.innerHTML = `$${subtotalPrice + deliveryChargesValue}.00`;
  } catch (error) {
    console.log(error);
  }
}

// Function to decrement the quantity of a product
async function decrement(el) {
  const quantityInput = el.nextElementSibling;
  const quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
    const productPrice = +el.dataset.productPrice;
    // const deliveryCharges = +el.dataset.deliveryCharges;
    const totalPriceEl = el.parentElement.nextElementSibling;
    const totalPrice = +productPrice * (quantity - 1);
    totalPriceEl.innerHTML = `$${totalPrice}.00`;
    try {
      const docRef = doc(db, "cart", el.dataset.cartId);
      await updateDoc(docRef, {
        quantity: quantity - 1,
      });
      // fetchProductPrices();
      await updatePrices();
      updateCartData(el.dataset.cartId, quantity - 1);
      const subtotalPrice = calculateTotalPrice();
      checkoutSubtotal = subtotalPrice;
      subTotalPrice.innerHTML = `$${subtotalPrice}.00`;
      totalFinalPriceEl.innerHTML = `$${
        subtotalPrice + deliveryChargesValue
      }.00`;
    } catch (error) {
      console.log(error);
    }
  }
}

// Function to update the global cart data after changing quantities
function updateCartData(cartId, newQuantity) {
  for (let i = 0; i < cartProductsData.length; i++) {
    if (cartProductsData[i].product.productId === cartId) {
      cartProductsData[i].quantity = newQuantity;
      break;
    }
  }
}

window.increment = increment;
window.decrement = decrement;

// Check for user authentication and fetch cart products

const updateDeliveryRate = (radioVAlue) => {
  switch (radioVAlue) {
    case "tcs":
      return `200`;

    case "leopard":
      return `300`;

    case "dhl":
      return `400`;

    case "m&p":
      return `100`;

    default:
      return `0`;
  }
};
document.querySelectorAll('input[name="courier"]').forEach((radio) => {
  if (radio.checked) {
    console.log("radio value", radio.value);
    // updateDeliveryRate(radio.value);
    const deliveryCharges = updateDeliveryRate(radio.value);
    deliveryChargesValue = +deliveryCharges;
    checkoutDeliveryCharges = deliveryCharges;
    console.log(
      "deliveryCharges radio value==> ",
      deliveryCharges,
      "deliveryChargesValue",
      deliveryChargesValue
    );
    deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
  }
  radio.addEventListener("change", async (e) => {
    console.log("radio value", e.target.value);
    // updateDeliveryRate(e.target.value);
    const deliveryCharges = updateDeliveryRate(radio.value);
    console.log("deliveryCharges", deliveryCharges);
    deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
    totalFinalPriceEl.innerHTML = `$${
      +calculateTotalPrice() + +deliveryCharges
    }.00`;

    checkoutDeliveryCharges = deliveryCharges;
  });
});

checkoutBtn.addEventListener("click", async () => {
  localStorage.setItem("cartSubtotal", checkoutSubtotal);
  localStorage.setItem("cartDeliveryCharges", checkoutDeliveryCharges);
  localStorage.setItem(
    "cartTotal",
    +checkoutSubtotal + +checkoutDeliveryCharges
  );
  window.location.href = "/checkout/index.html";
});
