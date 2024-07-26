// Import necessary functions and objects from your Firebase configuration
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

// Reference to the cart products container element
const cartProductsEl = document.getElementById("cartProductsContainer");
const cartProductsData = [];
const processedProductIds = new Set(); // Set to keep track of processed product IDs

// Function to fetch and display cart products for the authenticated user
async function fetchCartProducts(user) {
  try {
    const q = query(collection(db, "cart"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    for (const singleDoc of querySnapshot.docs) {
      const productId = singleDoc.data().productId;

      // Check if the productId has already been processed
      if (!processedProductIds.has(productId)) {
        const product = await fetchProductData(productId);

        // Only process valid products
        if (product) {
          cartProductsData.push(product);
          displayProduct(product);
          processedProductIds.add(productId); // Add to set after processing
        }
      }
    }

    console.log("All done", cartProductsData);
  } catch (error) {
    console.log("Error getting documents:", error);
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

// Function to display a single product
function displayProduct(product) {
  const {
    productName,
    productCategory,
    productPrice,
    productDescription,
    productImage,
  } = product;

  cartProductsEl.innerHTML += `
    <div class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div class="img-box">
          <img src="${productImage}" alt="Product Image" class="xl:w-[140px] rounded-xl" />
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
        <h6 class="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
          $15.00 <span class="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery Charge)</span>
        </h6>
        <div class="flex items-center w-full mx-auto justify-center">
          <button class="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M16.5 11H5.5" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
          <input type="text" class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent" placeholder="1" />
          <button class="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 5.5V16.5M16.5 11H5.5" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <h6 class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          $120.00
        </h6>
      </div>
    </div>`;
}

// Check for user authentication and fetch cart products
onAuthStateChanged(auth, (user) => {
  cartProductsEl.innerHTML = "";
  if (user) {
    fetchCartProducts(user);
  }
});
