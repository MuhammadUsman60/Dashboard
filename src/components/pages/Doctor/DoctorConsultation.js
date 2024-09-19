import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout"; 
import "../Laboratory/Laboratory.css"; 
import axios from "axios";

const DoctorConsultation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:8000/api/DoctorConsultation";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setConsultations(response.data);
        setFilteredConsultations(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = consultations.filter(
      (consultation) =>
        consultation.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        consultation.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        consultation.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredConsultations(filtered);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Doctor Consultations
          </h1>
          <input
            type="text"
            placeholder="Search by Patient Name or Email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded mb-4"
            aria-label="Search by Patient Name or Email"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Patient Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Appointment Date</th>
              <th className="py-3 px-6 text-left">Appointment Time</th>
              <th className="py-3 px-6 text-left">AM/PM</th>
              <th className="py-3 px-6 text-left">Comments</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-medium">
            {filteredConsultations.map((consultation) => (
              <tr
                key={consultation._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {`${consultation.firstName} ${consultation.lastName}`}
                </td>
                <td className="py-3 px-6 text-left">
                  {consultation.email}
                </td>
                <td className="py-3 px-6 text-left">
                  {consultation.phoneNumber}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(consultation.appointmentDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {consultation.appointmentTime}
                </td>
                <td className="py-3 px-6 text-left">
                  {consultation.amPm}
                </td>
                <td className="py-3 px-6 text-left">
                  {consultation.comments || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DoctorConsultation;
