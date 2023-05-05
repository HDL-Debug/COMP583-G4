import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { findUser } from "../../assets/Utils";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigte = useNavigate();
  const db = getFirestore();
  const user = signInWithEmailAndPassword(auth, email, password);

  const signIn = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const userID = await findUser(db, userCredential.user.uid);
            getDoc(doc(collection(db, "users"), userID))
                .then((doc) => {
                    if(doc.data().role === "customer"){
                        navigte('/dashboardcustomer');
                        console.log(userCredential);
                    } else {
                        navigte('/dashboard');
                        console.log(userCredential);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
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
        Log in to your account
      </h1>
      <form onSubmit={signIn} style={{width: "100%"}}>
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

        <div style={{marginBottom: "20px", width: "100%"}}>
          <label htmlFor="password" style={{display: "block", marginBottom: "5px", color: "#333333", fontSize: "16px"}}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
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
        }}>Log In</button>
        <p style={{marginTop: "20px", color: "#666666", fontSize: "14px"}}>
          Forgot your password? <Link to='forgotpassword' className='underline' style={{color: "#333333"}}>Forgot Password</Link>
        </p>
        <p style={{marginTop: "20px", color: "#666666", fontSize: "14px"}}>
          Don't have an account yet? <Link to='signup' className='underline' style={{color: "#333333"}}>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
