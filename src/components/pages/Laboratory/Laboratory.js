import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./Laboratory.css";
import axios from "axios";

const Laboratory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [filteredLabTests, setFilteredLabTests] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:8000/api/LabTest";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data);
        setLabTests(response.data);
        setFilteredLabTests(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = labTests.filter(
      (labTest) =>
        labTest.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        labTest.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        labTest.referredBy.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLabTests(filtered);
  };

  const handleStatusChange = (id, newStatus) => {
    setLabTests(
      labTests.map((labTest) =>
        labTest._id === id ? { ...labTest, status: newStatus } : labTest
      )
    );
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "received":
        return "bg-blue-100";
      case "conducted":
        return "bg-yellow-100";
      case "ReportsGenerated":
        return "bg-green-100";
      case "rejected":
        return "bg-red-100";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Home Service
            </h1>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by Patient Name or Referred By"
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
              <th className="py-3 px-6 text-left">Patient Name</th>
              <th className="py-3 px-6 text-left">
              appointment Date</th>
              <th className="py-3 px-6 text-left">Patient Contact No</th>
              <th className="py-3 px-6 text-left">Test Name</th>
              <th className="py-3 px-6 text-left">Referred By</th>
              {/* <th className="py-3 px-6 text-left">Actions</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-medium">
            {filteredLabTests.map((labTest) => (
              <tr
                key={labTest._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${getStatusClassName(
                  labTest.status
                )}`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {`${labTest.firstName} ${labTest.lastName}`}
                </td>
                <td className="py-3 px-6 text-left">
                  {labTest.
appointmentDate || "N/A"}
                </td>
                <td className="py-3 px-6 text-left">{labTest.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{labTest.testType}</td>
                <td className="py-3 px-6 text-left">{labTest.referredBy || "N/A"}</td>
                {/* <td className="py-3 px-6 text-left">
                  <select
                    value={labTest.status || "received"}
                    onChange={(e) =>
                      handleStatusChange(labTest._id, e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="received">Received</option>
                    <option value="conducted">Conducted</option>
                    <option value="ReportsGenerated">Reports Generated</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Laboratory;
