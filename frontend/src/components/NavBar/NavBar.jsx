import React from 'react';
import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import IC_cuenta from '../../img/NavBar/user.png';
import IC_carrito from '../../img/NavBar/ShoppingCart.png';
import LogoBandoggie from '../../img/NavBar/LogoBandoggie.png';

function NavBar() {
  const navigate = useNavigate(); 

  return (
    <>
      {/* Barra azul */}
      <div className="top-top-bar">
        <a className="top-space"> - </a>
      </div>

      {/* Bloque de registro e inicio de sesión */}
      <div className="top-bar">
        <a href="/login" className="top-link">Iniciar sesión</a>
        <span className="divider">/</span>
        <a href="/register" className="top-link">Crear cuenta</a>
      </div>

      <div className="linea-separadora"></div>

      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/">
          <img src={LogoBandoggie} alt="Logo" className="logo" />
        </a>

        {/* Toggle de navegación en responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">Inicio</a>
            <a className="nav-item nav-link" href="/Bandanas">Bandanas</a>
            <a className="nav-item nav-link" href="/Bandanas">Collares</a>
            <a className="nav-item nav-link" href="/Bandanas">Accesorios</a>
            <a className="nav-item nav-link" href="/Holiday">Festividades</a>
            <a className="nav-item nav-link" href="/AboutUs">Sobre Nosotros</a>
          </div>

          {/* Busqueda */}
          <div className="d-flex align-items-center ms-auto">
            <form className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar..."
                aria-label="Buscar"
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>

            {/* Iconos de cuenta y carrito */}
            <div className="iconos-header">
              <div>
                <img
                  src={IC_cuenta}
                  alt="Profile"
                  className="icono-header"
                  onClick={() => navigate('/Profile')}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <img src={IC_carrito} alt="Carrito" className="icono-header" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
