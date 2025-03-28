import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, X, ShieldCheck } from "lucide-react";

const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://health-backend-gjoo.onrender.com/auth/register/", formData);
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.post("https://health-backend-gjoo.onrender.com/auth/verify-otp/", {
        email: formData.email,
        otp: otp,
      });
      console.log(response.data)
      if (response.data.success) {
        setMessage("OTP Verified! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
          onClose();
        }, 2000);
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP");
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-96 p-8 rounded-xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition">
          <X size={24} />
        </button>

        {step === 1 ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Register</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
                {loading ? "Processing..." : "Register"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Verify OTP</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            
            <form onSubmit={handleOTPVerify} className="space-y-4">
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;