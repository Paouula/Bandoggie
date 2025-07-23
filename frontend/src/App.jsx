import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import Navegation from "./components/Navegation.jsx";
import Nav from "./components/Public/NavBar/NavBar.jsx";

import AuthenticatedNavBar from "./components/Public/NavBar/NavBar.jsx";
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";


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
    const shouldHideNav = authRoutes.some(
      (route) => currentPath === route || currentPath.startsWith(route + "/")
    );
    const isAdminRoute = adminRoutes.some(route => 
      currentPath.startsWith(route)
    );
    setIsOpen(!shouldHideNav && !isAdminRoute);
  }, [location.pathname]);

  const renderNavbar = () => {
    if (!isOpen) return null;
    if (!authCokie || !user) return <Nav />;
    if (user.userType === 'employee') return null;
    if (user.userType === 'vet' || user.userType === 'client') return <AuthenticatedNavBar />;
    return <Nav />;
  };

  return (
    <>
      {renderNavbar()}
      <div className="container" style={{ textAlign: "center" }}>
        <Navegation />
      </div>
    </>
  );
}

export default AppContent;