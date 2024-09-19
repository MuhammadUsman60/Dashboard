import React, { useState, useEffect } from "react";

const EditDoctor = ({ doctor, onUpdateDoctor, onCancel }) => {
  const [updatedDoctor, setUpdatedDoctor] = useState(doctor);

  useEffect(() => {
    setUpdatedDoctor(doctor);
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDoctor({ ...updatedDoctor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateDoctor(updatedDoctor);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="overflow-x-auto">
        <div className="px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h3 className="font-medium">Edit Doctor</h3>
        </div>
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
              <td className="py-2 px-4 dark:text-black">
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  value={updatedDoctor.photo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Pic URL..."
                  required
                />
              </td>
              <td className="py-2 px-4 border dark:text-black">
                <input
                  type="text"
                  id="doctor_name"
                  name="doctor_name"
                  value={updatedDoctor.doctor_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Name..."
                  required
                />
              </td>
              <td className="py-2 px-4 border dark:text-black">
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={updatedDoctor.specialization}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Specialist..."
                  required
                />
              </td>
              <td className="py-2 px-4 border dark:text-black">
                <input
                  type="email"
                  id="doctor_email"
                  name="doctor_email"
                  value={updatedDoctor.doctor_email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Email..."
                  required
                />
              </td>
              <td className="py-2 px-4 border dark:text-black">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={updatedDoctor.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Address..."
                  required
                />
              </td>
              <td className="py-2 px-4 border dark:text-black">
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  value={updatedDoctor.phoneNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Phone No..."
                  required
                />
              </td>
              <td className="py-2 px-4 border">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 rounded mb-2 mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 border border-yellow-500 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default EditDoctor;
