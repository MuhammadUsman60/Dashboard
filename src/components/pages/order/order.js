import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";

const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:8000/api/orders";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data);
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        order.address.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Orders</h1>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by Name or Address"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded mb-4"
            />
          </div>
        </div>
        {error && <p className="text-red-500">Error: {error}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-medium">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{order.name}</td>
                <td className="py-3 px-6 text-left">{order.address || "N/A"}</td>
                <td className="py-3 px-6 text-left">{order.product}</td>
                <td className="py-3 px-6 text-left">{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Order;
