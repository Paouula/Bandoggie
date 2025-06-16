import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Nav from './components/NavBar/NavBar.jsx';
import Register from './pages/Register.jsx'; 


function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const authRoutes = ['/login', '/register'];

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