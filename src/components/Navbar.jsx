import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Globe, LogIn, LogOut, Home, MessageCircle, AlertTriangle } from 'lucide-react';
import { FaBlog } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, handleLogout, setShowLogin } = useAuth();

  useEffect(() => {
    // Add custom styling for Google Translate
    const style = document.createElement('style');
    style.innerHTML = `
      /* Clean up Google Translate dropdown styling */
      .goog-te-gadget {
        color: white !important;
        font-family: inherit !important;
      }
      
      .goog-te-gadget-simple {
        background-color: transparent !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        padding: 5px 8px !important;
        border-radius: 4px !important;
        display: inline-flex !important;
        align-items: center !important;
      }
      
      .goog-te-menu-value {
        color: white !important;
        font-size: 14px !important;
        font-family: inherit !important;
      }
      
      .goog-te-menu-value span {
        color: white !important;
        margin-right: 3px !important;
      }
      
      .goog-te-gadget img {
        display: none !important;
      }
      
      /* Hide unnecessary elements */
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      
      body {
        top: 0px !important;
      }
    `;
    document.head.appendChild(style);

    // Initialize Google Translate
    if (window.googleTranslateElementInit) return; // prevents re-initializing
  
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,fr,es,zh,de',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };
  
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-200 transition duration-300"
        >
          <Globe className="w-7 h-7" />
          <span>Health Bridge</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-gray-200 transition duration-300">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {isLoggedIn && (
              <Link to="/dashboard" className="hover:text-gray-200 transition duration-300">
                Dashboard
              </Link>
            )}

            <Link to="/chatbot" className="flex items-center space-x-1 hover:text-gray-200 transition duration-300">
              <MessageCircle className="w-5 h-5" />
              <span>Chatbot</span>
            </Link>

            <Link to="/emergency" className="flex items-center space-x-1 bg-red-600 px-3 py-1 rounded-full hover:bg-red-700 transition duration-300">
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency</span>
            </Link>
          </div>

          <Link to="/blogs" className="flex items-center space-x-1 hover:text-gray-200 transition duration-300">
            <FaBlog />
            <span>Blog</span>
          </Link>
          
          {/* Properly styled translation element */}
          <div className="flex items-center bg-blue-800 bg-opacity-50 px-2 py-1 rounded-lg border border-blue-600">
            <div id="google_translate_element"></div>
          </div>

          {/* Auth Buttons */}
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
    </nav>
  );
};

export default Navbar;