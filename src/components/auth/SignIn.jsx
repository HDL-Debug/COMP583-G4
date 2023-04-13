import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigte = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        navigte ('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container" >
      <form onSubmit={signIn}>
        <h1>Log into your Account</h1>
        <div className="flex flex-col py-2">
        <input className="border p-3"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        </div>

        <div className="flex flex-col py-2">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        </div>
      
        <button type="submit">Log In</button>
        <p className="py-2">
          Don't have an account yet? <Link to='signup' className='underline'>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
