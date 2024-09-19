import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api/DoctorList";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data);
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedDoctors = doctors.filter((doctor) => doctor._id !== id);
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleSearch = (e) => {
    const lowerCaseSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(lowerCaseSearchTerm);
    const filtered = doctors.filter(
      (doctor) =>
        doctor.doctor_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        doctor.specialization.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredDoctors(filtered);
  };

  const handleAddDoctor = async (newDoctor) => {
    try {
      const response = await axios.post(API_URL, newDoctor);
      const updatedDoctors = [
        ...doctors,
        { ...response.data, _id: response.data._id },
      ];
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
      setShowAddDoctor(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateDoctor = async (updatedDoctor) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedDoctor._id}`, updatedDoctor);
      const updatedDoctors = doctors.map((doctor) =>
        doctor._id === updatedDoctor._id ? response.data : doctor
      );
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
      setEditingDoctor(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddDoctor(!showAddDoctor)}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 rounded"
        >
          {showAddDoctor ? "Close Form" : "Add a Doctor"}
        </button>
        <div className="flex justify-end items-center">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {showAddDoctor && <AddDoctor onAddDoctor={handleAddDoctor} />}
      {editingDoctor && (
        <EditDoctor
          doctor={editingDoctor}
          onUpdateDoctor={handleUpdateDoctor}
          onCancel={() => setEditingDoctor(null)}
        />
      )}
      {error && <div className="text-red-500">Error: {error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="border-b border-gray-300">
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
            {filteredDoctors.map((doctor) => (
              <tr key={doctor._id} className="border-b border-gray-300">
                <td className="py-2 px-4 border">
                  <img
                    src={doctor.photo}
                    alt={doctor.doctor_name}
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border">{doctor.doctor_name}</td>
                <td className="py-2 px-4 border">{doctor.specialization}</td>
                <td className="py-2 px-4 border">{doctor.doctor_email}</td>
                <td className="py-2 px-4 border">{doctor.address}</td>
                <td className="py-2 px-4 border">{doctor.phoneNo}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-500 rounded mb-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-500 rounded"
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

export default DoctorList;
