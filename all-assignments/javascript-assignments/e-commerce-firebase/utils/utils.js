export const showLoader = () => {
  const loaderContainer = document.querySelector(".loader-container");
  const submitBtnText = document.querySelector("button span");
  const wholePageLoader = document.getElementById("whole_page_loader");
  console.log("loader showing");
  submitBtnText && (submitBtnText.style.display = "none");
  loaderContainer && (loaderContainer.style.display = "block");
  wholePageLoader && (wholePageLoader.style.display = "block");
};
export const hideLoader = () => {
  const loaderContainer = document.querySelector(".loader-container");
  const submitBtnText = document.querySelector("button span");
  const wholePageLoader = document.getElementById("whole_page_loader");
  submitBtnText && (submitBtnText.style.display = "flex");
  loaderContainer && (loaderContainer.style.display = "none");
  wholePageLoader && (wholePageLoader.style.display = "none");
};

export const hideButtons = () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const signupBtn = document.getElementById("signup-btn");
  const cartIcon = document.getElementById("cart-icon");
  const myProductsBtn = document.getElementById("my-products-btn");
  const addProductBtn = document.getElementById("add-product-btn");
  loginBtn && (loginBtn.style.display = "inline-flex");
  logoutBtn && (logoutBtn.style.display = "none");
  signupBtn && (signupBtn.style.display = "inline-flex");
  cartIcon && (cartIcon.style.display = "none");
  myProductsBtn && (myProductsBtn.style.display = "none");
  addProductBtn && (addProductBtn.style.display = "none");

  const navloginBtn = document.getElementById("nav-login-btn");
  const navlogoutBtn = document.getElementById("nav-logout-btn");
  const navsignupBtn = document.getElementById("nav-signup-btn");
  const navcartIcon = document.getElementById("nav-cart-icon");
  const navmyProductsBtn = document.getElementById("nav-my-products-btn");
  const navaddProductBtn = document.getElementById("nav-add-product-btn");
  navloginBtn && (navloginBtn.style.display = "inline-flex");
  navlogoutBtn && (navlogoutBtn.style.display = "none");
  navsignupBtn && (navsignupBtn.style.display = "inline-flex");
  navcartIcon && (navcartIcon.style.display = "none");
  navmyProductsBtn && (navmyProductsBtn.style.display = "none");
  navaddProductBtn && (navaddProductBtn.style.display = "none");
};
export const showButtons = () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const signupBtn = document.getElementById("signup-btn");
  const cartIcon = document.getElementById("cart-icon");
  const myProductsBtn = document.getElementById("my-products-btn");
  const addProductBtn = document.getElementById("add-product-btn");

  loginBtn && (loginBtn.style.display = "none");
  logoutBtn && (logoutBtn.style.display = "inline-flex");
  signupBtn && (signupBtn.style.display = "none");
  cartIcon && (cartIcon.style.display = "inline-flex");
  myProductsBtn && (myProductsBtn.style.display = "inline-flex");
  addProductBtn && (addProductBtn.style.display = "inline-flex");

  const navloginBtn = document.getElementById("nav-login-btn");
  const navlogoutBtn = document.getElementById("nav-logout-btn");
  const navsignupBtn = document.getElementById("nav-signup-btn");
  const navcartIcon = document.getElementById("nav-cart-icon");
  const navmyProductsBtn = document.getElementById("nav-my-products-btn");
  const navaddProductBtn = document.getElementById("nav-add-product-btn");

  navloginBtn && (navloginBtn.style.display = "none");
  navlogoutBtn && (navlogoutBtn.style.display = "inline-flex");
  navsignupBtn && (navsignupBtn.style.display = "none");
  navcartIcon && (navcartIcon.style.display = "inline-flex");
  navmyProductsBtn && (navmyProductsBtn.style.display = "inline-flex");
  navaddProductBtn && (navaddProductBtn.style.display = "inline-flex");
};

export const showProducts = (products) => {
  const productsContainer = document.getElementById("products-container");
  productsContainer && (productsContainer.innerHTML = "");
  products.forEach((doc) => {
    const product = doc.data();
    productsContainer &&
      (productsContainer.innerHTML += `
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
    `);
  });
  // hideLoader();
};
