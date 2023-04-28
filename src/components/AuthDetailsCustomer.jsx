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
              <button onClick={updateEmailHandler}>Update Email</button>
            </div>
            <button onClick={resetPassword}>Reset Password</button>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
    </>
  );
};

export default AuthDetailsCustomer;

