import { fetchProductData } from "../cart/utils.js";
import {
  addDoc,
  auth,
  collection,
  db,
  getDocs,
  onAuthStateChanged,
  query,
  where,
} from "../utils/firebaseConfig.js";
import { hideButtons, logoutFunction, showButtons } from "../utils/utils.js";

const cartProductsEl = document.getElementById("cart-items");
const checkoutForm = document.getElementById("checkout-form");
const subtotal = document.getElementById("subtotal");
const deliveryCharges = document.getElementById("delivery");
const total = document.getElementById("total");
subtotal.innerHTML = "";

// const creditExpiry = document.getElementById("credit-expiry");

// Format for Credit Card Number
Inputmask({
  mask: "9999-9999-9999-9999",
  placeholder: "",
  showMaskOnHover: false,
  showMaskOnFocus: false,
}).mask("#card-no");

// Format for Expiry Date
Inputmask({
  mask: "99/99",
  placeholder: "MM/YY",
  showMaskOnHover: false,
  showMaskOnFocus: false,
  definitions: {
    9: {
      validator: "[0-9]",
      cardinality: 1,
      casing: "lower",
    },
  },
}).mask("#credit-expiry");

// Format for CVV
Inputmask({
  mask: "999", // Use '9999' for American Express if needed
  placeholder: " ",
  showMaskOnHover: false,
  showMaskOnFocus: false,
}).mask("#credit-cvc");

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const checkoutDetails = {
    userInfo: {
      email: e.target[0].value,
      name: e.target[1].value,
      address: e.target[5].value,
      state: e.target[6].value,
      zip: e.target[7].value,
    },
    paymentDetails: {
      cardNumber: e.target[2].value,
      expiryDate: e.target[3].value,
      cvv: e.target[4].value,
    },
  };
  console.log("checkout details", checkoutDetails);
  const { email, name, address, state, zip } = checkoutDetails.userInfo;
  const { cardNumber, expiryDate, cvv } = checkoutDetails.paymentDetails;
  const user = auth.currentUser;
  // console.log("user", user);
  const cartItems = await getDocs(
    query(collection(db, "cart"), where("userId", "==", user.uid))
  );
  const cartItemsData = cartItems.docs
    .filter((doc) => doc.data().userId === user.uid)
    .map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log("cartItemsData", cartItemsData);
  const orderData = {
    email,
    name,
    address,
    cardNumber,
    expiryDate,
    cvv,
    cartItems: cartItemsData,
    userId: user.uid,
  };
  await addDoc(collection(db, "orders"), orderData);

  cartItemsData.forEach(async (cartItem) => {
    await deleteDoc(doc(db, "cart", cartItem.id));
  });
  // alert("Order placed successfully");
  window.location.href = "/confirmation/index.html";
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    showButtons();
    logoutFunction();
    subtotal.innerHTML = "$" + localStorage.getItem("cartSubtotal");
    deliveryCharges.innerHTML =
      "$" + localStorage.getItem("cartDeliveryCharges");
    total.innerHTML = "$" + localStorage.getItem("cartTotal");
    showCartItems(user);
  } else {
    hideButtons();
  }
});

const showCartItems = async (user) => {
  const q = query(collection(db, "cart"), where("userId", "==", user.uid));
  const uniqueProductIds = new Set();
  const getDocsData = await getDocs(q);
  cartProductsEl.innerHTML = "";
  getDocsData.forEach(async (doc) => {
    // console.log("doc", doc.data());
    const data = doc.data();
    // console.log("data", data);
    const { productId, quantity } = data;
    if (!uniqueProductIds.has(productId)) {
      uniqueProductIds.add(productId);
      const productData = await fetchProductData(productId);
      console.log("productData", productData);
      // Your code to handle the unique product ID goes here
      // console.log(productData);
      displayProduct(productData, cartProductsEl);
    }
  });
};

function displayProduct(product, cartProductsEl) {
  const {
    productName,
    productCategory,
    productPrice,
    productDescription,
    productImage,
    productId,
  } = product;
  if (
    productName &&
    productCategory &&
    productPrice &&
    productDescription &&
    productImage &&
    productId
  ) {
    cartProductsEl.innerHTML += `
          <div class="flex flex-col rounded-lg bg-white sm:flex-row">
            <img
              class="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="${productImage}"
              alt=""
            />
            <div class="flex w-full flex-col px-4 py-4">
              <span class="font-semibold"
                >${productName}</span
              >
              <span class="float-right text-gray-400">42EU - 8.5US</span>
              <p class="text-lg font-bold">$${productPrice}</p>
            </div>
          </div>`;
  }
}
