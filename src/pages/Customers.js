import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from '../firebase'; // Import Firebase SDK modules
import Navbar from '../components/Navbar';
import { findUser } from "../assets/Utils";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const customersRef = firestore.collection("users");
      const snapshot = await customersRef.get();
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customers);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };


  const refreshTable = async () => {
    setIsLoading(true);
    try {
      const customersRef = firestore.collection("users");
      const snapshot = await customersRef.get();
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const updatedCustomers = customers.filter((customer) => {
        return findUser(firestore, customer.uid);
      });
      setCustomers(updatedCustomers);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{border: "1px solid #ddd", padding: "10px"}}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
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
        )}
      </div>
      <button style={{marginTop: "10px"}} onClick={refreshTable}>Refresh Table</button>
    </>
  );
};

export default Customers;



