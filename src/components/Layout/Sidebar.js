import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaPills, FaPlus, FaTrash, FaSignOutAlt, FaAngleDown, FaFlask } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [medicineSubMenuOpen, setMedicineSubMenuOpen] = useState(false);
  const [doctorSubMenuOpen, setDoctorSubMenuOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMedicineClick = () => {
    if (medicineSubMenuOpen === false) {
      setMedicineSubMenuOpen(true);   
    } else {
      setMedicineSubMenuOpen(false);   
    }
  };

  const handleDoctorClick = () => {
    if (doctorSubMenuOpen === false) {
      setDoctorSubMenuOpen(true);   
    } else {
      setDoctorSubMenuOpen(false);   
    }
  };

  const iconClass = isOpen ? 'text-xl' : 'text-2xl';

  return (
    <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-13'} text-white h-screen p-4 dark:bg-darkBar bg-lightBar h-100%`} >
      <div className="flex justify-between items-center mb-6">
        {isOpen && <div className="text-xl">Logo</div>}
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        <Link to="/dashboard" className="flex items-center">
          <FaHome className={iconClass} />
          {isOpen && <span className="ml-4">Dashboard</span>}
        </Link>
        <div className="flex flex-col space-y-2">
          <Link to="/medicinelist" onClick={handleMedicineClick} className="flex items-center">
            <FaPills className={iconClass} />
            {isOpen && <span className="ml-4">Medicine</span>}
            {isOpen && <FaAngleDown className="ml-auto" />}
          </Link>
          {medicineSubMenuOpen && location.pathname === '/medicinelist' && (
            <div className="flex flex-col pl-8 space-y-2">
              <Link to="/medicinelist" className="flex items-center">
                <FaPlus className={iconClass} />
                {isOpen && <span className="ml-4">Add Medicine</span>}
              </Link>
              <Link to="/medicinelist" className="flex items-center">
                <FaTrash className={iconClass} />
                {isOpen && <span className="ml-4">Remove Medicine</span>}
              </Link>
              
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Link to="/doctorlist" onClick={handleDoctorClick} className="flex items-center">
            <FaUserDoctor className={iconClass} />
            {isOpen && <span className="ml-4">Doctor</span>}
            {isOpen && <FaAngleDown className="ml-auto" />}
          </Link>
          {doctorSubMenuOpen && location.pathname === '/doctorlist' && (
            <div className="flex flex-col pl-8 space-y-2">
              <Link to="/adddoctor" className="flex items-center">
                <FaPlus className={iconClass} />
                {isOpen && <span className="ml-4">Add Doctor</span>}
              </Link>
              <Link to="/doctorlist" className="flex items-center">
                <FaTrash className={iconClass} />
                {isOpen && <span className="ml-4">Remove Doctor</span>}
              </Link>
              <Link to="/doctorconsultation" className="flex items-center">
              <FaUserDoctor className={iconClass} />
                {isOpen && <span className="ml-4">Doctor Consultation</span>}
              </Link>
            </div>
          )}
        </div>
        <Link to="/laboratory" className="flex items-center mt-auto">
          <FaFlask className={iconClass} />
          {isOpen && <span className="ml-4">Home Service</span>}
        </Link>
        <Link to="/orders" className="flex items-center mt-auto">
          <FaFlask className={iconClass} />
          {isOpen && <span className="ml-4">orders</span>}
        </Link>
        <Link to="/logout" className="flex items-center mt-auto">
          <FaSignOutAlt className={iconClass} />
          {isOpen && <span className="ml-4">Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;