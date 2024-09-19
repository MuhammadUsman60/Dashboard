import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');  
  };

  return (
    <div className="flex items-center justify-between p-4 bg-lightBar dark:bg-darkBar shadow">
      <button className="text-xl text-gray-900 text-lightElement">
        Welcome Admin
      </button>
      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="text-xl">
          {isDarkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-lightElement" />
          )}
        </button>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/307/264/original/tony-stark-robert-downey-black-white-potrait-illustration-free-vector.jpg" // replace with actual admin picture URL
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-lightElement">AdminName</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-md rounded-lg">
              {/* Uncomment and use these links if needed */}
              {/* <Link to="/adminprofile" className="sidebar-link">
                <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                  Profile
                </button>
              </Link>
              <Link to="/adminprofile" className="sidebar-link">
                <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                  Edit Profile
                </button>
              </Link> */}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
