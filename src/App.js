import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/pages/Dashboard";
import AddMedicine from "./components/pages/Medicine/AddMedicine";
import MedicineList from "./components/pages/Medicine/MedicineList";
import DoctorList from "./components/pages/Doctor/DoctorList";
import AddDoctor from "./components/pages/Doctor/AddDoctor";
import Laboratory from "./components/pages/Laboratory/Laboratory";
import AdminProfile from "./components/pages/AdminProfile";
import DoctorConsultation from "./components/pages/Doctor/DoctorConsultation";
import Order from "./components/pages/order/order";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addmedicine" element={<AddMedicine />} />
          <Route path="/medicinelist" element={<MedicineList />} />
          <Route path="/doctorlist" element={<DoctorList />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/doctorconsultation" element={<DoctorConsultation />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

/*
todos:

proper login function (when refreshed don't take user to login page) 
lab should show msg (mail)
darkmode

database creation
database attaching
database schemas
*/
