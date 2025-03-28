import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, User, X, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://health-backend-gjoo.onrender.com/auth/login/",
        { username, password }
      );
      
      if (response.data.access) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("user", JSON.stringify({ username }));

        handleLogin();
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail || "Login failed. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-96 p-8 rounded-xl shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>
        
        {!showRegister ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
            {errorMessage && (
              <div className="text-red-600 bg-red-100 p-2 rounded-md mb-4 text-center">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Login"
                )}
              </button>
              
              <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 hover:underline flex items-center justify-center gap-2 w-full"
                >
                  <UserPlus size={20} /> Create New Account
                </button>
              </div>
            </form>
          </>
        ) : (
          <Register onClose={() => setShowRegister(false)} />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
