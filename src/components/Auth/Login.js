import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"; // Import axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get('http://localhost:8000/api/users');
      const user = response.data.find(user => user.email === email && user.password === password);
      if (user) {
        navigate('/dashboard');
        localStorage.setItem('token', response.data.token); 
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Login
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="text"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <button
          onClick={handleLogin}
          className={`w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
