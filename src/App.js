import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MovieInstance from "./pages/MovieInstance";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';

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
        <Route path='/movie' element={<MovieInstance/>}/>
      </Routes>
    </div>
  );
}

export default App;
