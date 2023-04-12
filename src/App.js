import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, PrivateRoute } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Dashboard from "./pages/Dashboard";
//import Signup from "./pages/Signup";

function App(props) {
  return (
    <Dashboard db={props.app.database}/>
  )
}
export default App