import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password, confirm_password } = formData;
    
    if (!username || !email || !password || !confirm_password) {
      alert("All fields are required.");
      return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://health-backend-gjoo.onrender.com/auth/register/", formData);
      alert(response.data.message || "OTP sent to your email!");
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://health-backend-gjoo.onrender.com/auth/verify-otp/", {
        email: formData.email,
        otp: otp,
      });

      if (response.data.success) {
        alert("OTP Verified! Redirecting...");
        navigate("/patient-form");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {step === 1 ? (
        <>
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
            <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <button type="button" onClick={onClose} className="w-full bg-gray-300 text-gray-700 p-2 rounded mt-2">
              Close
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
          <form onSubmit={handleOTPVerify}>
            <input type="text" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required className="w-full mb-2 p-2 border rounded" />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
