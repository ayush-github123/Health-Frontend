import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 animate-bounce"></div>
      
      {/* Content */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center relative z-10 animate-fade-in">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:bg-blue-700 hover:-translate-y-1"
        >
          <ArrowLeftCircle className="w-5 h-5" /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;