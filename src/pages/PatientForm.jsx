import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PatientForm = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
    contact_details: "",
    chronic_conditions: "",
    past_surgeries: "",
    allergies: "",
    medications: "",
    symptoms: "",
    symptom_severity: "Mild",
    symptom_duration: "Less than a day",
    mental_health_stress: false,
    mental_health_anxiety: false,
    mental_health_depression: false,
    vaccination_history: "",
    accessibility_needs: "",
    pregnancy_status: "Not Pregnant",
    health_insurance_provider: "",
    health_insurance_policy: "",
    preferred_language: "English",
    research_participation: false,
    emergency_contact: {
      name: "",
      relationship: "",
      number: "",
    },
  });

  // State to manage form section visibility
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergency_contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergency_contact: { ...prev.emergency_contact, [field]: value },
      }));
    } else if (["mental_health_stress", "mental_health_anxiety", "mental_health_depression", "research_participation"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication required. Please log in.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("https://health-backend-gjoo.onrender.com/healthcare/form/submit/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("patientData", JSON.stringify(formData));
      alert("Patient data submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  // Navigation between sections
  const nextSection = () => {
    setActiveSection(prev => Math.min(prev + 1, 4));
  };

  const prevSection = () => {
    setActiveSection(prev => Math.max(prev - 1, 1));
  };

  // State choices for dropdown
  const stateChoices = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Patient Health Form</h2>
        
        {/* Progress Indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map(section => (
            <div 
              key={section} 
              className={`h-2 w-full mx-1 rounded-full ${
                activeSection === section 
                  ? 'bg-blue-500' 
                  : activeSection > section 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          {activeSection === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                placeholder="Full Name" 
                onChange={handleChange} 
                required 
                className="w-full mb-4 p-2 border rounded" 
              />
              <input 
                type="number" 
                name="age" 
                value={formData.age}
                placeholder="Age" 
                onChange={handleChange} 
                required 
                className="w-full mb-4 p-2 border rounded" 
              />
              <select 
                name="gender" 
                value={formData.gender}
                onChange={handleChange} 
                required 
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select 
                name="state" 
                value={formData.state}
                onChange={handleChange} 
                required 
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="">Select State</option>
                {stateChoices.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <input 
                type="text" 
                name="contact_details" 
                value={formData.contact_details}
                placeholder="Phone Number" 
                onChange={handleChange} 
                required 
                className="w-full mb-4 p-2 border rounded" 
              />
            </div>
          )}

          {/* Medical History Section */}
          {activeSection === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Medical History</h3>
              <textarea 
                name="chronic_conditions" 
                value={formData.chronic_conditions}
                placeholder="Chronic Conditions" 
                onChange={handleChange} 
                className="w-full mb-4 p-2 border rounded"
              ></textarea>
              <textarea 
                name="past_surgeries" 
                value={formData.past_surgeries}
                placeholder="Past Surgeries" 
                onChange={handleChange} 
                className="w-full mb-4 p-2 border rounded"
              ></textarea>
              <textarea 
                name="allergies" 
                value={formData.allergies}
                placeholder="Allergies" 
                onChange={handleChange} 
                className="w-full mb-4 p-2 border rounded"
              ></textarea>
              <textarea 
                name="medications" 
                value={formData.medications}
                placeholder="Current Medications" 
                onChange={handleChange} 
                className="w-full mb-4 p-2 border rounded"
              ></textarea>
            </div>
          )}

          {/* Symptoms and Mental Health Section */}
          {activeSection === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Current Health Status</h3>
              <textarea 
                name="symptoms" 
                value={formData.symptoms}
                placeholder="Describe Your Symptoms" 
                onChange={handleChange} 
                className="w-full mb-4 p-2 border rounded"
              ></textarea>
              
              <div className="mb-4">
                <label className="block mb-2">Symptom Severity</label>
                <select 
                  name="symptom_severity" 
                  value={formData.symptom_severity}
                  onChange={handleChange} 
                  className="w-full p-2 border rounded"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Symptom Duration</label>
                <select 
                  name="symptom_duration" 
                  value={formData.symptom_duration}
                  onChange={handleChange} 
                  className="w-full p-2 border rounded"
                >
                  <option value="Less than a day">Less than a day</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="More than a week">More than a week</option>
                  <option value="Chronic">Chronic</option>
                </select>
              </div>

              <h4 className="font-semibold mt-4 mb-2">Mental Health Assessment</h4>
              <div className="grid grid-cols-3 gap-4">
                {["stress", "anxiety", "depression"].map(condition => (
                  <div key={condition}>
                    <label className="block mb-2 capitalize">{condition}:</label>
                    <select 
                      name={`mental_health_${condition}`} 
                      value={formData[`mental_health_${condition}`]}
                      onChange={handleChange} 
                      className="w-full p-2 border rounded"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contact and Additional Information */}
          {activeSection === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact & Additional Details</h3>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Emergency Contact</h4>
                <input 
                  type="text" 
                  name="emergency_contact.name" 
                  value={formData.emergency_contact.name}
                  placeholder="Contact Name" 
                  onChange={handleChange} 
                  required 
                  className="w-full mb-4 p-2 border rounded" 
                />
                <input 
                  type="text" 
                  name="emergency_contact.relationship" 
                  value={formData.emergency_contact.relationship}
                  placeholder="Relationship" 
                  onChange={handleChange} 
                  required 
                  className="w-full mb-4 p-2 border rounded" 
                />
                <input 
                  type="text" 
                  name="emergency_contact.number" 
                  value={formData.emergency_contact.number}
                  placeholder="Contact Number" 
                  onChange={handleChange} 
                  required 
                  className="w-full mb-4 p-2 border rounded" 
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Preferred Language</label>
                <select 
                  name="preferred_language" 
                  value={formData.preferred_language}
                  onChange={handleChange} 
                  className="w-full p-2 border rounded"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Health Insurance Details</label>
                <input 
                  type="text" 
                  name="health_insurance_provider" 
                  value={formData.health_insurance_provider}
                  placeholder="Insurance Provider" 
                  onChange={handleChange} 
                  className="w-full mb-4 p-2 border rounded" 
                />
                <input 
                  type="text" 
                  name="health_insurance_policy" 
                  value={formData.health_insurance_policy}
                  placeholder="Policy Number" 
                  onChange={handleChange} 
                  className="w-full mb-4 p-2 border rounded" 
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="research_participation"
                    checked={formData.research_participation}
                    onChange={(e) => setFormData(prev => ({
                      ...prev, 
                      research_participation: e.target.checked
                    }))} 
                    className="mr-2" 
                  />
                  <span>Interested in Research Participation</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {activeSection > 1 && (
              <button 
                type="button" 
                onClick={prevSection} 
                className="bg-gray-300 text-gray-700 p-2 rounded"
              >
                Previous
              </button>
            )}
            
            {activeSection < 4 ? (
              <button 
                type="button" 
                onClick={nextSection} 
                className="ml-auto bg-blue-500 text-white p-2 rounded"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="ml-auto bg-green-500 text-white p-2 rounded"
              >
                Submit Form
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;