import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import Navegation from "./components/Navegation.jsx";
import Nav from "./components/Public/NavBar/NavBar.jsx";

import AuthenticatedNavBar from "./components/Public/NavBar/NavBar.jsx";
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";

import Login from "./pages/Public/Login.jsx";
import Register from "./pages/Public/Register.jsx";
import RegisterVet from "./pages/Public/RegisterVet.jsx";
import VerificationCode from "./pages/Public/VerificationCode.jsx";
import ChooseAccountType from "./pages/Public/ChooseAccount.jsx";
import RequestCode from "./pages/Public/PasswordRecovery/RequestCode.jsx";
import VerifyCode from "./pages/Public/PasswordRecovery/verifyCode.jsx";
import NewPassword from "./pages/Public/PasswordRecovery/newPassword.jsx";
import Reviews from "./pages/Public/Reviews.jsx";


function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const { authCokie, user } = useAuth();

  const authRoutes = [
    "/verification-code",
    "/request-code", 
    "/verify-code",
    "/new-password",
    "/reviews", 
  ];

  const adminRoutes = ["/admin"];

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    
    // No mostrar navbar en rutas de autenticación
    const shouldHideNav = authRoutes.some(
      (route) => currentPath === route || currentPath.startsWith(route + "/")
    );
    
    // No mostrar navbar público en rutas de admin
    const isAdminRoute = adminRoutes.some(route => 
      currentPath.startsWith(route)
    );
    
    setIsOpen(!shouldHideNav && !isAdminRoute);
  }, [location.pathname]);

  // Función para determinar qué navbar mostrar
  const renderNavbar = () => {
    // Si no debe mostrar navbar, no renderizar nada
    if (!isOpen) return null;

    // Si no está autenticado, mostrar navbar público
    if (!authCokie || !user) {
      return <Nav />;
    }

    // Si es empleado, no mostrar navbar (usa el privado en las rutas)
    if (user.userType === 'employee') {
      return null;
    }

    // Si es vet o client, mostrar navbar autenticado
    if (user.userType === 'vet' || user.userType === 'client') {
      return <AuthenticatedNavBar />;
    }

    // Por defecto, navbar público
    return <Nav />;
  };

  return (
    <>
      {renderNavbar()}
      <div className="container" style={{ textAlign: "center" }}>
        <div>
          {/* Logos opcionales */}
          {/*<img src={reactLogo} alt="React Logo" width="80" />
          <img src={viteLogo} alt="Vite Logo" width="80" />*/}
        </div>
        {/* Contador simple */}
        {/*<button onClick={() => setCount(count + 1)} style={{ margin: "10px" }}>
          Contador: {count}
        </button>*/}

        
        <Navegation />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/register-vet" element={<RegisterVet />} />
          <Route path="/choose-account" element={<ChooseAccountType />} />
          <Route path="/request-code" element={<RequestCode />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}