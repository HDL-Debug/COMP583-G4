import logo from './logo.svg';
import './App.css';
import React from 'react';
import { collection, getDocs, getFirestore } from "firebase/firestore";

const printData = (doc) => {
  console.log(doc.id, " => ", doc.data());
}

const fetchCollection = async (db) => {
  const querySnapshot = await getDocs(collection(db, "Movies"));
  querySnapshot.forEach(printData);
};

function App(props) {
  const db = getFirestore(props.app);
  fetchCollection(db);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Test.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
