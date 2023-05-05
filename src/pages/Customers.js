import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from '../firebase'; // Import Firebase SDK modules
import Navbar from '../components/Navbar';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersRef = firestore.collection("users");
        const snapshot = await customersRef.get();
        const customers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomers();
  }, []);

  const refreshTable = async () => {
    try {
      const customersRef = firestore.collection("users");
      const snapshot = await customersRef.get();
      if (snapshot.empty) {
        await customersRef.doc("1").set({
          provider: "Google",
          identifier: "user1",
          created: "2021-01-01",
          signedIn: "2021-01-02",
        });
        await customersRef.doc("2").set({
          provider: "Facebook",
          identifier: "user2",
          created: "2021-01-03",
          signedIn: "2021-01-04",
        });
        await customersRef.doc("3").set({
          provider: "Twitter",
          identifier: "user3",
          created: "2021-01-05",
          signedIn: "2021-01-06",
        });
        console.log("Customers collection created and data added.");
        setCustomers([
          {
            id: "1",
            provider: "Google",
            identifier: "user1",
            created: "2021-01-01",
            signedIn: "2021-01-02",
          },
          {
            id: "2",
            provider: "Facebook",
            identifier: "user2",
            created: "2021-01-03",
            signedIn: "2021-01-04",
          },
          {
            id: "3",
            provider: "Twitter",
            identifier: "user3",
            created: "2021-01-05",
            signedIn: "2021-01-06",
          },
        ]);
      } else {
        const customers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customers);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create customers collection or add data.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{border: "1px solid #ddd", padding: "10px"}}>
        <table style={{width: "100%", backgroundColor: "white"}}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((users) => (
              <tr key={users.id}>
                <td>{users.email}</td>
                <td>{users.role}</td>
                <td>{users.lastlogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button style={{marginTop: "10px"}} onClick={refreshTable}>Refresh Table</button>
    </>
  );
};

export default Customers;


