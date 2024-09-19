// EditMedicine.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMedicine = ({ medicine, onUpdateMedicine, onCancel }) => {
  const [updatedMedicine, setUpdatedMedicine] = useState(medicine);

  useEffect(() => {
    setUpdatedMedicine(medicine);
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMedicine({ ...updatedMedicine, [name]: value });
    console.log(`Updated Field: ${name}, New Value: ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Updated Medicine:', updatedMedicine);

    try {
      // Call the parent function to handle the update
      await onUpdateMedicine(updatedMedicine);
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="productName"
          value={updatedMedicine.productName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Details</label>
        <input
          type="text"
          name="productDetails"
          value={updatedMedicine.productDetails}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          name="productDescription"
          value={updatedMedicine.productDescription}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          name="productImage"
          value={updatedMedicine.productImage}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="categories"
          value={updatedMedicine.categories}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={updatedMedicine.price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMedicine;
