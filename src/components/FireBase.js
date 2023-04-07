// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBrzZfX5BJJEPQpUxBmaFDNAY23k-I1oc",
  authDomain: "comp-598-g4.firebaseapp.com",
  projectId: "comp-598-g4",
  storageBucket: "comp-598-g4.appspot.com",
  messagingSenderId: "850825401729",
  appId: "1:850825401729:web:b3119a0210be2732b68480",
  measurementId: "G-3B9HL2STSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);