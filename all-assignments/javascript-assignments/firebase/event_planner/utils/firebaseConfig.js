import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4ssZsRY_Luci6HLI5gSjKCFAAlCR9L64",
  authDomain: "smit-try-2a798.firebaseapp.com",
  projectId: "smit-try-2a798",
  storageBucket: "smit-try-2a798.appspot.com",
  messagingSenderId: "414632023813",
  appId: "1:414632023813:web:6278aac59b7cd56f4d896c",
  measurementId: "G-5GYZ55VC3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  app,
  db,
  auth,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  ref,
  uploadBytes,
  doc,
  setDoc,
  addDoc,
  getDownloadURL,
};
