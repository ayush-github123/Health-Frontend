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
import BlogPage from "./blog/BlogPage";
import BlogDetails from "./blog/BlogDetails";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/" />;
};

const AppContent = () => {
  const { isLoggedIn, showLogin, setShowLogin, patientDataAvailable } = useAuth();

  return (
    <>
      <Navbar onLogin={() => setShowLogin(true)} />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <Routes>
        <Route path="/" element={<Home onLogin={() => setShowLogin(true)} showLogin={showLogin} />} />
        
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={patientDataAvailable ? <Dashboard /> : <Navigate to="/patient-form" />} />}
        />
        <Route path="/patient-form" element={<ProtectedRoute element={<PatientForm />} />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot showLogin={showLogin} />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/emergency" element={<Emergency />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
