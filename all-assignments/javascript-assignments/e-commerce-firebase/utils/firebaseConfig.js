// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  addDoc,
  storage,
  uploadBytes,
  getDownloadURL,
  ref,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  onSnapshot,
  updateDoc,
};
