import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Nav from './components/NavBar/NavBar.jsx';
import Register from './pages/Register.jsx'; 
import RegisterVet from './pages/RegisterVet.jsx';
import VerificationCode from './pages/VerificationCode.jsx';
import ChooseAccountType from './pages/ChooseAccount.jsx';



function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const authRoutes = ['/login', '/register', '/register-vet', '/verification-code', '/choose-account'];

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    const shouldHideNav = authRoutes.some((route) => currentPath === route || currentPath.startsWith(route + '/'));
    setIsOpen(!shouldHideNav);
  }, [location.pathname]);

  return (
    <>
      {isOpen && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/register-vet" element={<RegisterVet />} />
          <Route path="/choose-account" element={<ChooseAccountType />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;