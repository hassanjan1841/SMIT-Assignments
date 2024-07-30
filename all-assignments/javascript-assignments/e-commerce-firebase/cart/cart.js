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
toggleNavbar();
// Reference to the cart products container element
const cartProductsEl = document.getElementById("cartProductsContainer");
const cartProductsData = []; // Set to keep track of processed product IDs
// const processedProductIds = new Set();
const totalFinalPriceEl = document.getElementById("total-final-price");
const subTotalPrice = document.getElementById("sub-total");
const deliveryChargesEL = document.getElementById("delivery-charges");

let userId = { id: "" };

onAuthStateChanged(auth, async (user) => {
  cartProductsEl.innerHTML = "";
  userId.id = user.uid;
  if (user) {
    await fetchCartProducts();
    showButtons();
    await caartProducts();
  } else {
    hideButtons();
  }
});

// const cartId = { cartId: "" };
async function caartProducts() {
  const q = query(collection(db, "cart"), where("userId", "==", userId.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}
// await caartProducts();

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
      const { productId, quantity, userId, deliveryCharges } = singleDoc.data();

      // Check if the productId has already been processed
      if (!processedProductIds.has(productId)) {
        console.log("Product ID:", productId, processedProductIds);
        const product = await fetchProductData(productId);

        // Only process valid products
        if (product) {
          console.log("Product data:", product, singleDoc.data());
          cartProductsData.push({ product, quantity, userId, deliveryCharges });
          displayProduct(product, quantity, singleDoc.id, deliveryCharges);
          processedProductIds.add(productId); // Add to set after processing
        }
      }
    });

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);
    await fetchProductPrices();
    console.log("All IDs", processedProductIds);
    console.log("All done", cartProductsData);
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
          cartProductsData.push({ product, quantity, userId, deliveryCharges });
          // displayProduct(product, quantity, singleDoc.id);
          processedProductIds.add(productId); // Add to set after processing
        }
      }
    });

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);
    await fetchProductPrices();
    console.log("All done", cartProductsData);
  } catch (error) {
    console.log("Error setting up real-time listener:", error);
  }
}

// Functipon to calculate the total price of cart products
function calculateTotalPrice() {
  let totalPrice = 0;
  let deliveryCharges = 0;
  cartProductsData.forEach((product) => {
    console.log("Product:", product);
    const productPrice = +product.product.productPrice.slice(1);
    const quantity = product.quantity;
    deliveryCharges = +product.deliveryCharges;
    totalPrice += productPrice * quantity;
    // console.log(totalPrice);
  });
  return { totalPrice, deliveryCharges };
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
    const { totalPrice, deliveryCharges } = calculateTotalPrice();
    subTotalPrice.innerHTML = `$${totalPrice}.00`;
    totalFinalPriceEl.innerHTML = `$${totalPrice + deliveryCharges}.00`;
    deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
    console.log("Total price:", totalPrice);
  } catch (error) {
    console.log("Error fetching product prices:", error);
  }
}

// Function to fetch product data by product ID
async function fetchProductData(productId) {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { productId, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
}

// Function to increment the quantity of a product
// Function to increment the quantity of a product
async function increment(el) {
  const productPrice = +el.dataset.productPrice.slice(1);
  const quantityInput = el.previousElementSibling;
  const quantity = +quantityInput.value;
  const totalPriceEl = el.parentElement.nextElementSibling;
  const totalPrice = +productPrice * (quantity + 1);
  const deliveryCharges = +el.dataset.deliveryCharges;

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
    totalFinalPriceEl.innerHTML = `$${subtotalPrice + deliveryCharges}.00`;
    deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
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
    const productPrice = +el.dataset.productPrice.slice(1);
    const deliveryCharges = +el.dataset.deliveryCharges;
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
      subTotalPrice.innerHTML = `$${subtotalPrice}.00`;
      totalFinalPriceEl.innerHTML = `$${subtotalPrice + deliveryCharges}.00`;
      deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
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

// Function to display a single product
function displayProduct(product, quantity, cartId, deliveryCharges) {
  const {
    productName,
    productCategory,
    productPrice,
    productDescription,
    productImage,
    productId,
  } = product;

  cartProductsEl.innerHTML += `
    <div class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div class="img-box">
          <a  href="/products/single_product/index.html?productId=${productId}" >
            <img src="${productImage}" alt="Product Image" class="xl:w-[140px] sm:w-[160px] w-[300px] object-cover h-[200px] sm:h-[160px] rounded-xl" />
          </a>
        </div>
        <div class="pro-data w-full max-w-sm">
          <h5 class="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
            ${productName}
          </h5>
          <p class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
            ${productCategory}
          </p>
          <h6 class="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">
            ${productPrice}
          </h6>
        </div>
      </div>
      <div class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        
        <div class="flex items-center w-full mx-auto sm:justify-start justify-center">
          <button onclick="decrement(this)" data-product-price="${productPrice}" data-delivery="${deliveryCharges}" data-cart-id="${cartId}" class="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M16.5 11H5.5" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
          <input type="text" value='${quantity}' class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"  id="quantity"/>
          <button onclick="increment(this)" data-product-price="${productPrice}"  data-delivery="${deliveryCharges}" data-cart-id="${cartId}"  class="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 5.5V16.5M16.5 11H5.5" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <h6 class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          $${+productPrice.slice(1) * quantity}.00
        </h6>
      </div>
    </div>`;
}

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
    console.log("deliveryCharges", deliveryCharges);
    deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
  }
  radio.addEventListener("change", (e) => {
    console.log("radio value", e.target.value);
    // updateDeliveryRate(e.target.value);
    const deliveryCharges = updateDeliveryRate(radio.value);
    console.log("deliveryCharges", deliveryCharges);
    deliveryChargesEL.innerHTML = `$${deliveryCharges}.00`;
  });
});
