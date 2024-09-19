import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios"; 

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Admin Name",
    image: "admin-image-url.jpg",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAdmin((prevAdmin) => ({
        ...prevAdmin,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.put("http://localhost:8000/api/users", admin); // Replace with your actual API endpoint
      console.log("Profile updated successfully:", response.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8 p-4 rounded shadow bg-lightCard dark:bg-darkElement text-gray-900">
        <div className="flex flex-col items-center">
          <img
            src={admin.image}
            alt="Admin"
            className="w-32 h-32 rounded-full mb-4"
          />
          {editMode ? (
            <>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
              />
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                className="mb-4 p-2 border rounded w-full bg-lightElement dark:bg-darkElement text-gray-900"
              />
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                placeholder="New Password"
                className="mb-4 p-2 border rounded w-full bg-lightElement dark:bg-darkElement text-gray-900"
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                onClick={handleSave}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl mb-2">{admin.name}</h2>
              <p className="mb-4">Password: ••••••••</p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
