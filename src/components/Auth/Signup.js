import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState(''); // Added state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error messages
  const navigate = useNavigate();

  const handleSignup = async () => { // Added async keyword
    try {
      if (!name || !email || !password) {
        setErrorMessage("Please fill in all fields");
        return;
      }

      const response = await axios.post('http://localhost:8000/api/users', {
        name,
        email,
        password
      });

      console.log(response.data);
      localStorage.setItem('token', response.data.token); 
      setMessage("Signup successful! Redirecting to login..."); // Show success message
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Sign up
        </h1>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <div>
          <label className="block text-sm">Username</label>
          <input
            type="text"
            value={name} // Added value to maintain state
            onChange={(e) => setName(e.target.value)} // Added handler for name
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email} // Added value to maintain state
            onChange={(e) => setEmail(e.target.value)} // Fixed handler for email
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password} // Added value to maintain state
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <button
          onClick={handleSignup}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Sign up
        </button>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
