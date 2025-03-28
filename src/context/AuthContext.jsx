import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [patientDataAvailable, setPatientDataAvailable] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // patient data
    const patientData = localStorage.getItem('patientData');
    if (patientData) {
      setPatientDataAvailable(true);
    } else {
      setPatientDataAvailable(false);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPatientDataAvailable(false);
    localStorage.removeItem('patientData');
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    showLogin,
    setShowLogin,
    patientDataAvailable,
    setPatientDataAvailable,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
