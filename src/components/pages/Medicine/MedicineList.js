// MedicineList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import AddMedicine from "./AddMedicine";
import EditMedicine from "./EditMedicine";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const API_URL = "http://localhost:8000/api/products";

  // Fetch medicines from API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(API_URL);
        setMedicines(response.data);
        setFilteredMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    
    fetchMedicines();
  }, []);

  // Add a new medicine
  const handleAddMedicine = async (newMedicine) => {
    try {
      const response = await axios.post(API_URL, newMedicine);
      setMedicines([...medicines, response.data]);
      setFilteredMedicines([...medicines, response.data]);
      setShowAddMedicine(false);
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  // Update an existing medicine
  const handleUpdateMedicine = async (updatedMedicine) => {
    try {
      await axios.put(`${API_URL}/${updatedMedicine._id}`, updatedMedicine);

      const updatedMedicines = medicines.map((medicine) =>
        medicine._id === updatedMedicine._id ? updatedMedicine : medicine
      );
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
      setEditingMedicine(null);
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  // Delete a medicine
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedMedicines = medicines.filter((medicine) => medicine._id !== id);
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  // Search medicines
  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = medicines.filter(
      (medicine) =>
        medicine.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
        medicine.productDetails.toLowerCase().includes(lowerCaseSearchTerm) ||
        medicine.productDescription.toLowerCase().includes(lowerCaseSearchTerm) ||
        medicine.categories.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredMedicines(filtered);
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
  };

  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddMedicine(!showAddMedicine)}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent p-2 rounded"
        >
          {showAddMedicine ? "Close Form" : "Add a Medicine"}
        </button>
        <div className="flex justify-end items-center">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent p-2 rounded"
          >
            Search
          </button>
        </div>
      </div>
      {showAddMedicine && <AddMedicine onAddMedicine={handleAddMedicine} />}
      {editingMedicine && (
        <EditMedicine
          medicine={editingMedicine}
          onUpdateMedicine={handleUpdateMedicine}
          onCancel={() => setEditingMedicine(null)}
        />
      )}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Details</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine._id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="py-2 px-4 border">
                  <img
                    src={medicine.productImage}
                    alt={medicine.productName}
                    className="h-20 w-20 rounded"
                  />
                </td>
                <td className="py-2 px-4 border">{medicine.productName}</td>
                <td className="py-2 px-4 border">{medicine.productDetails}</td>
                <td className="py-2 px-4 border">{medicine.productDescription}</td>
                <td className="py-2 px-4 border">{medicine.categories}</td>
                <td className="py-2 px-4 border">{medicine.price}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(medicine)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(medicine._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default MedicineList;
