import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import IC_cuenta from "../../../img/NavBar/user.png";
import IC_carrito from "../../../img/NavBar/ShoppingCart.png";
import LogoBandoggie from "../../../img/NavBar/LogoBandoggie.png";
import { useAuth } from "../../../Context/AuthContext.jsx";

// Importa tus modales
import LoginModal from "../../LoginModal/Login.jsx";
import ChooseAccountTypeModal from "../../RegisterModal/ChooseAccount.jsx";
import RegisterModal from "../../RegisterModal/Register.jsx";
import RegisterVetModal from "../../RegisterModal/RegisterVet.jsx";
import VerificationCodeModal from "../../RegisterModal/VerificationCode.jsx";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showChoose, setShowChoose] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterVet, setShowRegisterVet] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const {
    user,
    loadingUser,
    pendingVerification,
    setPendingVerification,
    loadingVerification,
    verificationInfo,
    updateVerificationInfo, // 🆕 Usar la función persistente
    clearVerificationInfo,   // 🆕 Función para limpiar
  } = useAuth();

  const shouldShowVerificationModal =
    !loadingVerification && pendingVerification;

  const showNavSession = () => {
    if (loadingUser) return false;
    return !user;
  };

  return (
    <>
      {/* Modales */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          openChoose={() => {
            setShowLogin(false);
            setShowChoose(true);
          }}
        />
      )}
      {showChoose && (
        <ChooseAccountTypeModal
          onClose={() => setShowChoose(false)}
          openLogin={() => {
            setShowChoose(false);
            setShowLogin(true);
          }}
          openRegisterUser={() => {
            setShowChoose(false);
            setShowRegister(true);
          }}
          openRegisterVet={() => {
            setShowChoose(false);
            setShowRegisterVet(true);
          }}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          openLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onRegisterSuccess={(email, role) => {
            console.log("✅ RegisterModal - onRegisterSuccess:", { email, role });
            setShowRegister(false);
            // 🆕 Usar updateVerificationInfo para persistir los datos
            updateVerificationInfo({ email, role });
            setPendingVerification(true);
          }}
          openChoose={() => {
            setShowRegister(false);
            setShowChoose(true);
          }}
        />
      )}

      {showRegisterVet && (
        <RegisterVetModal
          onClose={() => setShowRegisterVet(false)}
          openLogin={() => {
            setShowRegisterVet(false);
            setShowLogin(true);
          }}
          onRegisterSuccess={(email, role) => {
            console.log("✅ RegisterVetModal - onRegisterSuccess:", { email, role });
            setShowRegisterVet(false);
            // 🆕 Usar updateVerificationInfo para persistir los datos
            updateVerificationInfo({ email, role });
            setPendingVerification(true);
          }}
          openChoose={() => {
            setShowRegisterVet(false);
            setShowChoose(true);
          }}
        />
      )}

      {shouldShowVerificationModal && (
        <VerificationCodeModal
          email={verificationInfo.email}
          role={verificationInfo.role}
          onClose={() => {
            console.log("🚪 Cerrando modal de verificación");
            clearVerificationInfo(); // 🆕 Limpiar datos al cerrar
          }}
          openLogin={() => {
            console.log("🚪 Abriendo login desde verificación");
            clearVerificationInfo(); // 🆕 Limpiar datos al ir al login
            setShowLogin(true);
          }}
        />
      )}

      {/* Barra superior */}
      {showNavSession() && (
        <>
          <div className="navbar-top-bar">
            <a className="navbar-top-space"> - </a>
          </div>

          <div className="navbar-session-bar">
            <span
              className="navbar-session-link"
              onClick={() => setShowLogin(true)}
            >
              Iniciar sesión
            </span>
            <span className="navbar-divider">/</span>
            <span
              className="navbar-session-link"
              onClick={() => setShowChoose(true)}
            >
              Crear cuenta
            </span>
          </div>

          <div className="navbar-separator-line"></div>
        </>
      )}

      {/* Barra de navegación */}
      <nav className="navbar-main">
        <a className="navbar-brand" href="/">
          <img src={LogoBandoggie} alt="Logo" className="navbar-logo" />
        </a>

        {/* Botón toggle para responsive */}
        <button
          className="navbar-toggle"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
        </button>

        <div
          className={`navbar-nav-container ${
            isNavOpen ? "navbar-nav-open" : ""
          }`}
        >
          <div className="navbar-nav-links">
            <Link className="navbar-nav-link" to="/main">
              Inicio
            </Link>
            <Link className="navbar-nav-link" to="/Bandanas">
              Bandanas
            </Link>
            <Link className="navbar-nav-link" to="/necklaces">
              Collares
            </Link>
            <Link className="navbar-nav-link" to="/accessories">
              Accesorios
            </Link>
            <Link className="navbar-nav-link" to="/Holidays">
              Festividades
            </Link>
            <Link className="navbar-nav-link" to="/OrderHistory">
              Historial de pedidos
            </Link>
          </div>

          <div className="navbar-right-section">
            <div className="navbar-search-container">
              <input
                type="text"
                className="navbar-search-input"
                placeholder="Buscar..."
              />
              <button type="submit" className="navbar-search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="navbar-icons-container">
              <a class="nav-item " href="/Cuenta" data-discover="true">
                <img src={IC_cuenta} alt="Cuenta" className="navbar-icon" />
              </a>
              <a class="nav-item " href="/Carrito" data-discover="true">
                <img src={IC_carrito} alt="Carrito" className="navbar-icon" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;