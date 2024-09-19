import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    medicinesSold: 0,
    totalUsers: 0,
    testSamplings: 0,
    totalProducts: 0,
  });

  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productResponse = await fetch(`${API_URL}/products/count`);
        const productData = await productResponse.json();

        const doctorsResponse = await fetch(`${API_URL}/DoctorList`);
        const doctorsData = await doctorsResponse.json();

        const medicinesResponse = await fetch(`${API_URL}/products`);
        const medicinesData = await medicinesResponse.json();
        
        const userResponse = await fetch(`${API_URL}/users/count`);
        const userData = await userResponse.json();

        const medicinesSold = await fetch(`${API_URL}/orders/count`);
        const medicinesSoldData = await medicinesSold.json();

        const testSamplings = await fetch(`${API_URL}/LabTest/count`);
        const testSamplingsData = await testSamplings.json();

        const fetchedStats = {
          totalMedicines: medicinesData.length,
          medicinesSold: medicinesSoldData, 
          totalUsers: userData.totalUsers, 
          testSamplings: testSamplingsData, 
          totalProducts: productData.totalProducts,
        };

        setStats(fetchedStats);
        setDoctors(doctorsData.slice(0, 5)); 
        setMedicines(medicinesData.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-lightCard p-4 rounded shadow bg-lightElement dark:bg-darkElement text-gray-900">
          <h3 className="text-xl mb-2">Total Medicines</h3>
          <p className="text-2xl">{stats.totalMedicines}</p>
        </div>
        <div className="bg-lightCard p-4 rounded shadow bg-lightElement dark:bg-darkElement text-gray-900">
          <h3 className="text-xl mb-2">Medicines Sold</h3>
          <p className="text-2xl">{stats.medicinesSold}</p>
        </div>
        <div className="bg-lightCard p-4 rounded shadow bg-lightElement dark:bg-darkElement text-gray-900">
          <h3 className="text-xl mb-2">Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-lightCard p-4 rounded shadow bg-lightElement dark:bg-darkElement text-gray-900">
          <h3 className="text-xl mb-2">Test Samplings</h3>
          <p className="text-2xl">{stats.testSamplings}</p>
        </div>
      </div>

      <hr className="mt-8 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded shadow bg-transparent text-gray-900">
          <h3 className="bg-lightBar dark:bg-darkBar rounded-t text-white text-xl text-center pt-4 pb-4">
            Doctors
          </h3>
          <div className="bg-gray-100 p-8">
            <ul className="divide-y divide-slate-200">
              {doctors.map((doctor) => (
                <li key={doctor.id} className="flex justify-between py-4">
                  <div className="flex items-center">
                    <img
                      src={doctor.photo}
                      alt={doctor.doctor_name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">
                        {doctor.doctor_name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {doctor.specialist}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-900">{doctor.phoneNo}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-lightBar dark:bg-darkBar rounded-b text-center pt-4 pb-4 hover:underline">
            <Link to="/doctorlist" className="text-lightElement">
              View All
            </Link>
          </div>
        </div>

        <div className="rounded shadow bg-transparent text-gray-900">
          <h3 className="bg-lightBar dark:bg-darkBar rounded-t text-white text-xl text-center pt-4 pb-4">
            Medicines
          </h3>
          <div className="bg-gray-100 p-8">
            <ul className="divide-y divide-slate-200">
              {medicines.map((medicine) => (
                <li key={medicine.id} className="flex justify-between py-4">
                  <div className="flex items-center">
                    <img
                      src={medicine.productImage}
                      alt={medicine.productName}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">
                        {medicine.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {medicine.formula}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-900">{medicine.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-lightBar dark:bg-darkBar rounded-b text-center pt-4 pb-4 hover:underline">
            <Link to="/medicinelist" className="text-lightElement">
              View All
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
