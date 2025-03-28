import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import DoctorAppointment from '../components/DoctorAppointment';
import MedicineDelivery from '../components/MedicineDelivery';

export default function Dashboard() {
  const [symptoms, setSymptoms] = useState("");
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://health-backend-gjoo.onrender.com/healthcare/form/me", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Healthcare AI</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          <Link to="/emergency" className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">Emergency</Link>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>
        
        {patientData ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* User Information */}
            <div className="bg-white p-6 shadow-md rounded">
              <h3 className="text-blue-600 font-bold">Patient Information</h3>
              <p><b>Name:</b> {patientData.name}</p>
              <p><b>Age:</b> {patientData.age}</p>
              <p><b>Gender:</b> {patientData.gender}</p>
              <p><b>Blood Group:</b> {patientData.blood_group}</p>
              <p><b>Medical History:</b> {patientData.medical_history || "No history available"}</p>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-100 p-6 shadow-md rounded border-l-4 border-red-500">
              <h3 className="text-red-600 font-bold">Emergency Contact</h3>
              <p><b>Name:</b> {patientData.emergency_contact?.name || "N/A"}</p>
              <p><b>Phone:</b> {patientData.emergency_contact?.number || "N/A"}</p>
              <p><b>Relationship:</b> {patientData.emergency_contact?.relationship || "N/A"}</p>
            </div>

            {/* AI Symptom Checker */}
            <div className="bg-white p-6 shadow-md rounded">
              <h3 className="text-blue-600 font-bold">AI Symptom Checker</h3>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe your symptoms"
                className="w-full p-2 border rounded"
              />
              <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full">
                Check Symptoms
              </button>
            </div>

            {/* Telemedicine Services */}
            <div className="bg-white p-6 shadow-md rounded">
              <h3 className="text-blue-600 font-bold">Telemedicine Services</h3>
              <p>Start a video consultation with a doctor.</p>
              <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full">
                Start Consultation
              </button>
            </div>

            {/* Doctor Appointment Section */}
            <DoctorAppointment />

            {/* Medicine Delivery Section */}
            <MedicineDelivery />
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading patient data...</p>
        )}
      </div>
    </div>
  );
}
