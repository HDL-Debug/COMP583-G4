import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD
import "react-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require('dotenv').config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: process.env.FIREBASE_API_KEY,
  apiKey: 'AIzaSyDBrzZfX5BJJEPQpUxBmaFDNAY23k-I1oc',
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
=======
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> 2269cb7c11d6f80ffa3f90acfef2d4c740038a15

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App />;
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

