// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import "firebase/storage";

import { FirebaseApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY_nP-DdMHXFNts2o6JKNfYt2q-taWWi8",
  authDomain: "employedbullsfirebase.firebaseapp.com",
  projectId: "employedbullsfirebase",
  storageBucket: "employedbullsfirebase.appspot.com",
  messagingSenderId: "952201041768",
  appId: "1:952201041768:web:4b3462781381ecf35ce8dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
