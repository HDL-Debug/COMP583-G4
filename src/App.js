import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MovieInstance from "./pages/MovieInstance";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from "./pages/ForgotPassword";
import AuthDetails from './pages/AuthDetails';
import AuthDetailsCustomer from "./pages/AuthDetailsCustomer";
import Customers from "./pages/Customers";
import { ThemeProvider } from '@mui/material/styles';
import MovieTimeline from './pages/MovieTimeline';
import MovieInstanceCustomer from "./pages/MovieInstanceCustomer";
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
          <Route path='/profilepagecustomer' element={<AuthDetailsCustomer/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/moviecustomer' element={<MovieInstanceCustomer/>}/>
          <Route path='/movie' element={<MovieInstance/>}/>
          <Route path='/timeline' element={<MovieTimeline/>}/>
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
