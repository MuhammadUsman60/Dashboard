import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported

const API_URL = "http://localhost:8000/api/DoctorList"; 

const AddDoctor = ({ onAddDoctor }) => {
  const [doctor, setDoctor] = useState({
    photo: "",
    doctor_name: "",
    specialization: "",
    doctor_email: "",
    address: "",
    phoneNo: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!doctor.doctor_name || !doctor.specialization || !doctor.doctor_email || !doctor.address || !doctor.phoneNo || !doctor.photo) {
        throw new Error("All fields are required");
      }

      // Log the data to be sent
      console.log("Submitting doctor data:", {
        doctor_name: doctor.doctor_name,
        specialization: doctor.specialization,
        doctor_email: doctor.doctor_email,
        address: doctor.address,
        phoneNo: doctor.phoneNo,
        photo: doctor.photo,
      });

      // Add Doctor via API
      const response = await axios.post(API_URL, {
        doctor_name: doctor.doctor_name,
        specialization: doctor.specialization,
        doctor_email: doctor.doctor_email,
        address: doctor.address,
        phoneNo: doctor.phoneNo,
        photo: doctor.photo,
      });

      onAddDoctor(response.data); 
      setDoctor({
        photo: "",
        doctor_name: "",
        specialization: "",
        doctor_email: "",
        address: "",
        phoneNo: "",
      });
    } catch (err) {
      console.error("Error adding doctor:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setDoctor({
      photo: "",
      doctor_name: "",
      specialization: "",
      doctor_email: "",
      address: "",
      phoneNo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="overflow-x-auto">
        <div className="px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h3 className="font-medium text-lg">Add a new Doctor</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-2 px-4 border">Picture</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Specialist</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">PhoneNo</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <td className="py-2 px-4 border dark:text-black">
                  <input
                    type="text"
                    id="photo"
                    name="photo"
                    value={doctor.photo}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter Pic URL..."
                    required
                  />
                </td>
                <td className="py-2 px-4 border dark:text-black">
                  <input
                    type="text"
                    id="doctor_name"
                    name="doctor_name"
                    value={doctor.doctor_name}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter Name..."
                    required
                  />
                </td>
                <td className="py-2 px-4 border dark:text-black">
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter Specialist..."
                    required
                  />
                </td>
                <td className="py-2 px-4 border dark:text-black">
                  <input
                    type="email"
                    id="doctor_email"
                    name="doctor_email"
                    value={doctor.doctor_email}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter Email..."
                    required
                  />
                </td>
                <td className="py-2 px-4 border dark:text-black">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={doctor.address}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter Address..."
                    required
                  />
                </td>
                <td className="py-2 px-4 border dark:text-black">
                  <input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={doctor.phoneNo}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder="Enter Phone No..."
                    required
                  />
                </td>
                <td className="py-2 px-4 border dark:text-black">
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 border border-yellow-500 rounded mb-2 mr-2"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleClear}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-500 rounded"
                  >
                    Clear
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
};

export default AddDoctor;
