import { onAuthStateChanged, sendPasswordResetEmail, signOut, updateEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import NavbarCustomer from './NavbarCustomer';
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { findUser } from "../assets/Utils";

const AuthDetailsCustomer = () => {
  const [authUser, setAuthUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        findUser(db, user.uid).then((userID) => {
          getDoc(doc(collection(db, "users"), userID))
          .then((doc) => {
            if (doc.exists()) {
              setUserRole(doc.data().role);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });

        })
        
        
      } else {
        setAuthUser(null);
        setUserRole(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = async () => {
    signOut(auth)
      .then(() => {
        navigate('/')
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const resetPassword = () => {
    if (authUser) {
      sendPasswordResetEmail(auth, authUser.email)
        .then(() => {
          console.log("Password reset email sent");
          alert("Password reset email sent");
          signOut(auth).then(() => {
            navigate('/');
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateEmailHandler = () => {
    if (authUser && newEmail.trim() !== '') {
      const oldEmail = authUser.email;
      updateEmail(authUser, newEmail)
        .then(() => {
          console.log("Email updated successfully");
          alert(`Email updated successfully. A notification email has been sent to ${oldEmail}.`);
          sendNotificationEmail(oldEmail);
          setNewEmail('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendNotificationEmail = (oldEmail) => {
    // send an email to the old email notifying them of the change
    console.log(`Notification email sent to ${oldEmail}`);
  };

  return (
    <>
  <NavbarCustomer />
  <div style={{ backgroundColor: 'white', width: 'fit-content', margin: 'auto', padding: '20px', borderRadius: '5px' }}>
    <h1 className='text-center text-3xl font-bold'>Account Information</h1>
    {authUser ? (
      <>
        <p>{`Currently logged in user: ${authUser.email}`}</p>
        <p>{`User role: ${userRole}`}</p>
        <div>
          <label htmlFor="newEmail">New Email:</label>
          <input type="email" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <button className="update-btn" onClick={updateEmailHandler}>Update Email</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button className="reset-btn" style={{ marginRight: '10px' }} onClick={resetPassword}>Reset Password</button>
          <button className="sign-out-btn" onClick={userSignOut}>Sign Out</button>
        </div>
      </>
    ) : (
      <p>Signed Out</p>
    )}
  </div>
  <style>
    {`
      .update-btn, .reset-btn, .sign-out-btn {
        background-color: #fff;
        border: 2px solid #000;
        color: #000;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      .update-btn:hover, .reset-btn:hover, .sign-out-btn:hover {
        background-color: #000;
        color: #fff;
      }
      .reset-btn {
        margin-right: 10px;
      }
      div[style] {
        width: 100%;
        text-align: center;
      }
    `}
  </style>
</>


  );
};

export default AuthDetailsCustomer;

