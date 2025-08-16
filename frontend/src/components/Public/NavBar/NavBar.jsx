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

// Importa el componente del carrito
import ShoppingCartApp from "../../../pages/Public/Cart/Cart.jsx";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showChoose, setShowChoose] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterVet, setShowRegisterVet] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showCart, setShowCart] = useState(false);
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

  // Función para manejar el clic en el carrito
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  // Función para cerrar el carrito
  const handleCloseCart = () => {
    setShowCart(false);
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

      {/* Modal del Carrito */}
      {showCart && (
        <div className="cart-modal-overlay" onClick={handleCloseCart}>
          <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cart-modal-close" onClick={handleCloseCart}>
              ×
            </button>
            <ShoppingCartApp onClose={handleCloseCart} />
          </div>
        </div>
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
            <Link className="navbar-nav-link" to="/main">Inicio</Link>
            <Link className="navbar-nav-link" to="/Bandanas">Bandanas</Link>
            <Link className="navbar-nav-link" to="/necklaces">Collares</Link>
            <Link className="navbar-nav-link" to="/accessories">Accesorios</Link>
            <Link className="navbar-nav-link" to="/Holidays">Festividades</Link>
            <Link className="navbar-nav-link" to="/aboutus">Sobre nosotros</Link>
            <Link className="navbar-nav-link" to="/OrderHistory">Historial de pedidos</Link>
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
              <a href="/profile">
                <img src={IC_cuenta} alt="Cuenta" className="navbar-icon" />
              </a>
              <a 
                className="nav-item" 
                href="#"
                onClick={handleCartClick}
                data-discover="true"
                style={{ cursor: 'pointer' }}
              >
                <img src={IC_carrito} alt="Carrito" className="navbar-icon" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* CSS adicional para el modal del carrito */}
      <style jsx>{`
        .cart-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }

        .cart-modal-content {
          background: white;
          border-radius: 12px;
          max-width: 95vw;
          max-height: 95vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .cart-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          z-index: 2001;
          transition: background-color 0.2s;
        }

        .cart-modal-close:hover {
          background: #4b5563;
        }

        @media (max-width: 768px) {
          .cart-modal-content {
            max-width: 100vw;
            max-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}

export default NavBar;