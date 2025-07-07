// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcYDLdMi53cAxQE6uDSq0hRAQYE5L_X0k",
  authDomain: "basiclogin-bc302.firebaseapp.com",
  projectId: "basiclogin-bc302",
  storageBucket: "basiclogin-bc302.firebasestorage.app",
  messagingSenderId: "7578565990",
  appId: "1:7578565990:web:37649ccf1c2026d1b9dca7",
  measurementId: "G-BTB3LB0F1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;