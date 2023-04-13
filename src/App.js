import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <Routes> 
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profilepage' element={<AuthDetails/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
