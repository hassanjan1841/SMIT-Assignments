import { hideButtons, showButtons } from "../app.js";
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
} from "../utils/firebaseConfig.js";

const cartProductsEl = document.getElementById("cartProductsContainer");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const q = query(collection(db, "cart"), where("userId", "==", user.uid));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const cartProducts = doc.data();
        getCartSingleProduct(cartProducts);
        // showCartProducts(querySnapshot);
      });
    });
    showButtons();
  } else {
    hideButtons();
  }
});

const getCartSingleProduct = (product) => {
  console.log("cart data", product);

  const docRef = doc(db, "products", product.productId);
  getDoc(docRef)
    .then((doc) => {
      console.log("CArt Document data:", doc.data());
      const cartProducts = doc.data();
      console.log("cart product", cartProducts);
      showCartProducts(cartProducts);
    })
    .catch((error) => console.log("Error getting document:", error));
};

const showCartProducts = (product) => {
  cartProductsEl.innerHTML = "";
  //   cartProducts.forEach((doc) => {
  // const product = doc.data();
  cartProductsEl.innerHTML += `<div
            class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
          >
            <div
              class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto"
            >
              <div class="img-box">
                <img
                  src="${product.productImage}"
                  alt="perfume bottle image"
                  class="xl:w-[140px] rounded-xl"
                />
              </div>
              <div class="pro-data w-full max-w-sm">
                <h5
                  class="font-semibold text-xl leading-8 text-black max-[550px]:text-center"
                >
                  ${product.productName}
                </h5>
                <p
                  class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center"
                >
                  ${product.productCategory}
                </p>
                <h6
                  class="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center"
                >
                  ${product.productPrice}
                </h6>
              </div>
            </div>
            <div
              class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2"
            >
              <h6
                class="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center"
              >
                $15.00
                <span
                  class="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap"
                  >(Delivery Charge)</span
                >
              </h6>
              <div class="flex items-center w-full mx-auto justify-center">
                <button
                  class="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      stroke-opacity="0.2"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      stroke-opacity="0.2"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                  placeholder="1"
                />
                <button
                  class="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      stroke-opacity="0.2"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      stroke-opacity="0.2"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
              <h6
                class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center"
              >
                $120.00
              </h6>
            </div>
          </div>`;
  //   });
};
