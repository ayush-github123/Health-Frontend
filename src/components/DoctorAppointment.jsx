import React from "react";

const DoctorAppointment = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h3 className="text-blue-600 font-bold">Book an Appointment</h3>
      <input type="date" className="w-full p-2 border rounded mt-2" />
      <input type="time" className="w-full p-2 border rounded mt-2" />
      <select className="w-full p-2 border rounded mt-2">
        <option>Select Doctor</option>
        <option>Dr. A</option>
        <option>Dr. B</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full">
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorAppointment;
