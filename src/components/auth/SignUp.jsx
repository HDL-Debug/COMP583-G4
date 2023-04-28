import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, firestore } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigte = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(firestore, "users"), {
        uid: userCredential.user.uid,
        role: "customer", // changed role value to customer
      });
      console.log(userCredential);
      navigte("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: 10,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      padding: "40px 30px",
      marginTop: 10,
      width: "30%",
      marginLeft: "35%",
      marginRight: "35%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <h1 style={{marginBottom: "30px", color: "#333333", fontSize: "24px"}}>
        Create an Account
      </h1>
      <form onSubmit={signUp} style={{width: "100%"}}>
        <div style={{marginBottom: "20px", width: "100%"}}>
          <label htmlFor="email" style={{display: "block", marginBottom: "5px", color: "#333333", fontSize: "16px"}}>Email address</label>
          <input 
            type="email"
            id="email"
            name="email"
            placeholder="Enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #dddddd",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{marginBottom: "20px", width: "100%"}}>
          <label htmlFor="password" style={{display: "block", marginBottom: "5px", color: "#333333", fontSize: "16px"}}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #dddddd",
              fontSize: "16px",
            }}
          />
        </div>
      
        <button type="submit" style={{
          backgroundColor: "#333333",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}>Sign Up</button>
        <p style={{marginTop: "20px", color: "#666666", fontSize: "14px"}}>
          Don't have an account yet? <Link to='/' className='underline' style={{color: "#333333"}}>Sign In</Link>
        </p>
      </form>
    </div>
    
  );
};

export default SignUp;
