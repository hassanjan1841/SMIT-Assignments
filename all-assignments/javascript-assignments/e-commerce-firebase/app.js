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

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const signupBtn = document.getElementById("signup-btn");
const cartIcon = document.getElementById("cart-icon");
const productsContainer = document.getElementById("products-container");
const myProductsBtn = document.getElementById("my-products-btn");
const addProductBtn = document.getElementById("add-product-btn");
const heroTitle = document.getElementById("hero-title");
const heroImage = document.getElementById("hero-image");
const heroDescription = document.getElementById("hero-description");
const loaderContainer = document.querySelector(".loader-container");
const submitBtnText = document.querySelector("#submit_btn span");
const wholePageLoader = document.getElementById("whole_page_loader");

export const showLoader = () => {
  submitBtnText && (submitBtnText.style.display = "none");
  loaderContainer && (loaderContainer.style.display = "block");
  wholePageLoader && (wholePageLoader.style.display = "block");
};
export const hideLoader = () => {
  submitBtnText && (submitBtnText.style.display = "inline-block");
  loaderContainer && (loaderContainer.style.display = "none");
  wholePageLoader && (wholePageLoader.style.display = "none");
};

showLoader();
// document.addEventListener("DOMContentLoaded", () => {
//   hideLoader();
// });

logoutBtn.addEventListener("click", () => {
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

export const hideButtons = () => {
  loginBtn.style.display = "inline-flex";
  logoutBtn.style.display = "none";
  signupBtn.style.display = "inline-flex";
  cartIcon ? (cartIcon.style.display = "none") : null;
  myProductsBtn ? (myProductsBtn.style.display = "none") : null;
  addProductBtn && (addProductBtn.style.display = "none");
};
export const showButtons = () => {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-flex";
  signupBtn.style.display = "none";
  cartIcon ? (cartIcon.style.display = "inline-flex") : null;
  myProductsBtn ? (myProductsBtn.style.display = "inline-flex") : null;
  addProductBtn && (addProductBtn.style.display = "inline-flex");
};

getDocs(collection(db, "products"))
  .then((querySnapshot) => {
    getSingleProduct(querySnapshot);
    showProducts(querySnapshot);
  })
  .finally(() => {
    hideLoader();
  });

export const showProducts = (products) => {
  productsContainer.innerHTML = "";
  products.forEach((doc) => {
    const product = doc.data();
    productsContainer.innerHTML += `
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a href="/products/single_product/index.html?productId=${doc.id}" class="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          class="object-cover object-center w-full h-full block"
          src="${product.productImage}"
        />
      </a>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          ${product.productCategory}
        </h3>
        <h2 class="text-gray-900 title-font text-lg font-medium">
          ${product.productName}
        </h2>
        <p class="mt-1">${product.productPrice}</p>
      </div>
    </div>
    `;
  });
  // hideLoader();
};

const getSingleProduct = (products) => {
  products.forEach((document, index) => {
    const docRef = doc(db, "products", document.id);
    getDoc(docRef).then((doc) => {
      console.log(doc.data());
      const product = doc.data();
      heroTitle.innerHTML = product.productName;
      // productNameEl.innerHTML = product.productName;
      heroImage.src = product.productImage;
    });
    if (index > 0) {
      return;
    }
  });
};
