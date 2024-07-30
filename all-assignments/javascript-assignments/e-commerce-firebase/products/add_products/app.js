
import {
  addDoc,
  auth,
  collection,
  db,
  getDownloadURL,
  onAuthStateChanged,
  ref,
  storage,
  uploadBytes,
} from "../../utils/firebaseConfig.js";
import { hideButtons, showButtons } from "../../utils/utils.js";
import { toggleNavbar } from "../single_product/utils.js";

toggleNavbar();
onAuthStateChanged(auth, (user) => {
  //   toggleButtons(user);
  if (user) {
    showButtons();
  } else {
    hideButtons();
    window.location.href = "../auth/login/index.html";
  }
});

const addProductForm = document.getElementById("add_product_form");
const loaderContainer = document.querySelector("#submit_btn .loader-container");
const submitBtnText = document.querySelector("#submit_btn span");
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("add prodcut form submit", e);
  loaderContainer.style.display = "block";
  submitBtnText.style.display = "none";

  const productInfo = {
    userId: auth.currentUser.uid,
    productName: e.target[0].value,
    productCategory: e.target[1].value,
    productPrice: `$${e.target[2].value}`,
    productDescription: e.target[3].value,
    productImage: e.target[4].files[0],
  };
  // Check if all inputs are filled
  if (
    !productInfo.productName ||
    !productInfo.productCategory ||
    !productInfo.productPrice ||
    !productInfo.productImage ||
    !productInfo.productDescription
  ) {
    alert("Please fill in all fields");
    loaderContainer.style.display = "none";
    submitBtnText.style.display = "inline-block";
    return;
  }
  //   console.log(productInfo);
  const storageRef = ref(storage, `products/${productInfo.productImage.name}`);
  uploadBytes(storageRef, productInfo.productImage)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          console.log("File available at", downloadURL);
          productInfo.productImage = downloadURL;
          addDoc(collection(db, "products"), productInfo).then(() => {
            window.location.href = "../index.html";
          });
        })
        .catch((error) => {
          alert(error);
          loaderContainer.style.display = "none";
          submitBtnText.style.display = "inline-block";
        });
      //   addProduct(product);
    })
    .catch((error) => {
      alert(error);
      loaderContainer.style.display = "none";
      submitBtnText.style.display = "inline-block";
    });
});

// console.log("Hello from add_products", db);
