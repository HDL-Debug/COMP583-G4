// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration, replace it with your project keys
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getFirestore(app);
