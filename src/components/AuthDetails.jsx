import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
 const navigte = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = async () => {
    signOut(auth)
      .then(() => {
        navigte('/')
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      text-align: center;
      <h1 className='text-center text-3xl font-bold'>
      Account Information
      </h1>
      {authUser ? (
        <>
          <p>{`Currently logged in user: ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
