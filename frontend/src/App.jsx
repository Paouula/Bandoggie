import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// Proveedor de autenticación
import { AuthProvider } from "./Context/AuthContext.jsx";

// Archivo principal de navegación
import Navegation from "./components/Navegation.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Router>  
        <Navegation />
        
      </Router>
    </AuthProvider>
  );
}
