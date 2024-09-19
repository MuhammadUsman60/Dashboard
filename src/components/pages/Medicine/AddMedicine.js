import React, { useState } from "react";

const AddMedicine = ({ onAddMedicine }) => {
  const [newMedicine, setNewMedicine] = useState({
    productName: "",
    productDetails: "",
    productDescription: "",
    productImage: "",
    price: "",
    categories: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMedicine(newMedicine);
    setNewMedicine({
      productName: "",
      productDetails: "",
      productDescription: "",
      productImage: "",
      price: "",
      categories: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="productName"
          value={newMedicine.productName}
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
          value={newMedicine.productDetails}
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
          value={newMedicine.productDescription}
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
          value={newMedicine.productImage}
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
          value={newMedicine.price}
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
          value={newMedicine.categories}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        Add Medicine
      </button>
    </form>
  );
};

export default AddMedicine;
