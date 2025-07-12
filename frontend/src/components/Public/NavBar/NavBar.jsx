import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import IC_cuenta from "../../../img/NavBar/user.png";
import IC_carrito from "../../../img/NavBar/ShoppingCart.png";
import LogoBandoggie from "../../../img/NavBar/LogoBandoggie.png";

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

  return (
    <>
      {/* MODALES */}
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
          onRegisterSuccess={() => {
            setShowRegister(false);
            setShowVerification(true);
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
          onRegisterSuccess={() => {
            setShowRegisterVet(false);
            setShowVerification(true);
          }}
          openChoose={() => {
            setShowRegisterVet(false);
            setShowChoose(true);
          }}
        />
      )}

      {showVerification && (
        <VerificationCodeModal
          onClose={() => setShowVerification(false)}
          openLogin={() => {
            setShowVerification(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* Barra superior */}
      <div className="top-top-bar">
        <a className="top-space"> - </a>
      </div>

      <div className="top-bar">
        <span className="top-link" onClick={() => setShowLogin(true)}>
          Iniciar sesión
        </span>
        <span className="divider">/</span>
        <span className="top-link" onClick={() => setShowChoose(true)}>
          Crear cuenta
        </span>
      </div>

      <div className="linea-separadora"></div>

      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/">
          <img src={LogoBandoggie} alt="Logo" className="logo" />
        </a>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">
              Inicio
            </a>
            <a className="nav-item nav-link" href="#">
              Bandanas
            </a>
            <a className="nav-item nav-link" href="#">
              Collares
            </a>
            <a className="nav-item nav-link" href="#">
              Accesorios
            </a>
            <a className="nav-item nav-link" href="#">
              Festividades
            </a>
          </div>

          <div className="d-flex align-items-center ms-auto">
            <form className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar..."
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <div className="iconos-header">
              <img src={IC_cuenta} alt="Cuenta" className="icono-header" />
              <img src={IC_carrito} alt="Carrito" className="icono-header" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
