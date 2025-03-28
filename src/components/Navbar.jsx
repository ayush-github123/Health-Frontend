import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Globe, LogIn, LogOut, Home, MessageCircle, AlertTriangle } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, handleLogout, setShowLogin } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if script already exists to prevent multiple additions
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement("script");
        script.id = 'google-translate-script';
        script.type = "text/javascript";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: "en", 
        includedLanguages: "en,hi,es,fr,de,zh", 
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, "google_translate_element");
    };

    addGoogleTranslateScript();
  }, []);

  // Function to handle language change
  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    const googleTranslateSelect = document.querySelector(".goog-te-combo");
    if (googleTranslateSelect) {
      googleTranslateSelect.value = lang;
      googleTranslateSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-200 transition duration-300"
        >
          <Globe className="w-7 h-7" />
          <span>Healthcare AI</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className="hover:text-gray-200 transition duration-300"
              >
                Dashboard
              </Link>
            )}

            <Link 
              to="/chatbot" 
              className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chatbot</span>
            </Link>

            <Link 
              to="/emergency" 
              className="flex items-center space-x-1 bg-red-600 px-3 py-1 rounded-full hover:bg-red-700 transition duration-300"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency</span>
            </Link>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-300" />
            <select 
              value={selectedLanguage} 
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-blue-800 text-white p-2 rounded-md text-sm border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center space-x-2">
            {!isLoggedIn ? (
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 bg-green-600 px-3 py-1 rounded-full hover:bg-green-700 transition duration-300"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-600 px-3 py-1 rounded-full hover:bg-red-700 transition duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Google Translate Hidden Div */}
      <div id="google_translate_element" className="hidden"></div>
    </nav>
  );
};

export default Navbar;