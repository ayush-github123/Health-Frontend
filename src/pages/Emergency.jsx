import React from 'react';

const Emergency = () => {
  const handleCallEmergency = () => {
    alert('"Feature will be implemented...."');
  };

  return (
    <div className="bg-red-500 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">EMERGENCY HELP</h1>
      <button
        className="bg-white text-red-500 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-100 focus:outline-none focus:shadow-outline"
        onClick={handleCallEmergency}
      >
        Call Emergency
      </button>
      <p className="mt-4 text-white">CONTACT THE NEAREST HOSPITAL NOW!</p>
    </div>
  );
};

export default Emergency;
