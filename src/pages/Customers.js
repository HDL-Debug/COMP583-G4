import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { findUser } from "../assets/Utils";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const firestore = getFirestore();

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const customersRef = collection(firestore, "users");
      const querySnapshot = await getDocs(customersRef);
      let customers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      customers = customers.filter(e => !(e.role === "admin"));
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
      const customersRef = collection(firestore, "users");
      const querySnapshot = await getDocs(customersRef);
      const customers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let updatedCustomers = customers.filter((customer) => {
        return findUser(firestore, customer.uid);
      });
      updatedCustomers = updatedCustomers.filter(e => !(e.role === "admin"));
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
      <div style={{ border: "1px solid #ddd", padding: "10px" }}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <table style={{ width: "100%", backgroundColor: "white" }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button style={{ marginTop: "10px" }} onClick={refreshTable}>
        Refresh Table
      </button>
    </>
  );
};

export default Customers;



