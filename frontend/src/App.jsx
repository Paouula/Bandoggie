import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Nav from "./components/Public/NavBar/NavBar.jsx";
import Login from "./pages/Public/Login.jsx";
import Register from "./pages/Public/Register.jsx";
import RegisterVet from "./pages/Public/RegisterVet.jsx";
import VerificationCode from "./pages/Public/VerificationCode.jsx";
import ChooseAccountType from "./pages/Public/ChooseAccount.jsx";
import RequestCode from "./pages/Public/PasswordRecovery/RequestCode.jsx";
import VerifyCode from "./pages/Public/PasswordRecovery/verifyCode.jsx";
import NewPassword from "./pages/Public/PasswordRecovery/newPassword.jsx";

function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(0); // <-- contador agregado

  const authRoutes = [
    "/login",
    "/register",
    "/register-vet",
    "/verification-code",
    "/choose-account",
    "/request-code",
    "/verify-code",
    "/new-password",
  ];

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const shouldHideNav = authRoutes.some(
      (route) => currentPath === route || currentPath.startsWith(route + "/")
    );
    setIsOpen(!shouldHideNav);
  }, [location.pathname]);

  return (
    <>
      {isOpen && <Nav />}
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
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
