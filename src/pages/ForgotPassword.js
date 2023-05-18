import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendResetEmail = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.log(error);
      setMessage("Failed to send password reset email.");
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
        Forgot Password
      </h1>
      <form onSubmit={sendResetEmail} style={{width: "100%"}}>
        <div style={{marginBottom: "20px", width: "100%"}}>
          <label htmlFor="email" style={{display: "block", marginBottom: "5px", color: "#333333", fontSize: "16px"}}>Email address</label>
          <input 
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
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

        <button type="submit" style={{
          backgroundColor: "#333333",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}>Send Reset Email</button>
        <p style={{marginTop: "20px", color: "#666666", fontSize: "14px"}}>
          <Link to='/' className='underline' style={{color: "#333333"}}>Back to Sign In.</Link>
        </p>
        <p style={{marginTop: "20px", color: "#666666", fontSize: "14px"}}>
          {message}
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
