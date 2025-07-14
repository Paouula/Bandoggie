import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation, } from "react-router-dom";
import "./App.css";
import Navegation from "./components/Navegation.jsx";
import Nav from "./components/Public/NavBar/NavBar.jsx";


function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  //const [count, setCount] = useState(0); // <-- contador agregado

  const authRoutes = [,
    "/verification-code",
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

        <Navegation />

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
