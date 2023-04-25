import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MovieInstance from "./pages/MovieInstance";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from "./components/ForgotPassword";
import AuthDetails from './components/AuthDetails';
import Customers from "./pages/Customers";
import { ThemeProvider } from '@mui/material/styles';

import theme from './assets/Colors';
import './App.css';
import DashboardCustomer from "./pages/DashboardCustomer";


function App(props) {
  return (<ThemeProvider theme={theme}>
    <div className="App">
      <div className="background" style={{
        backgroundImage: `url(https://wallpaper.dog/large/20552168.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}/>
      <div className="content">
        <Routes> 
          <Route path='/' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profilepage' element={<AuthDetails/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/movie' element={<MovieInstance/>}/>
          <Route path='/customers' element={<Customers/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/dashboardcustomer' element={<DashboardCustomer/>}/>
        </Routes>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App;
