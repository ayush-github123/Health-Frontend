import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PatientForm from "./pages/PatientForm";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Emergency from "./pages/Emergency";
import Chatbot from "./pages/Chatbot";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppContent = () => {
  const { isLoggedIn, showLogin, setShowLogin, patientDataAvailable } = useAuth();

  return (
    <>
      <Navbar onLogin={() => setShowLogin(true)} />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <Routes>
        <Route path="/" element={<Home onLogin={() => setShowLogin(true)} showLogin={showLogin} />} />
        
        {/* Redirect users based on authentication & form status */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              patientDataAvailable ? <Dashboard /> : <Navigate to="/patient-form" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/patient-form"
          element={isLoggedIn ? <PatientForm /> : <Navigate to="/" />}
        />
        
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot showLogin={showLogin} />} />
        <Route path="/emergency" element={<Emergency />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
