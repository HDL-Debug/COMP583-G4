import logo from './logo.svg';
import './App.css';
import React from 'react';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Dashboard from './pages/Dashboard.js';

function App(props) {
  const db = getFirestore(props.app);
  
  return (
    <Dashboard db={db} />
  );
}

export default App;
