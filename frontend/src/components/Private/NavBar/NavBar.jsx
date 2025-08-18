import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import "./Navbar.css";
import IC_cuenta from "../../../img/NavBar/user.png";
import LogoBandoggie from "../../../img/NavBar/LogoBandoggie.png";

function PrivateNavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      {/* Barra superior */}
      <div className="navbar-top-bar">
        <a className="navbar-top-space"> - </a>
      </div>

      {/* Sesión */}
      <div className="navbar-session-bar">
        <span className="navbar-session-text">
          Bienvenido, {user?.email}
        </span>
        <span className="navbar-divider">/</span>
        <span 
          className="navbar-session-link"
          onClick={handleLogout}
        >
          Cerrar sesión
        </span>
      </div>

      <div className="navbar-separator-line"></div>

      {/* Barra de navegación */}
      <nav className="navbar-main">
        <Link className="navbar-brand" to="/admin/productos">
          <img src={LogoBandoggie} alt="Logo" className="navbar-logo" />
        </Link>

        {/* Botón toggle responsive */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
        </button>

        <div className={`navbar-nav-container ${isNavOpen ? 'navbar-nav-open' : ''}`}>
          <div className="navbar-nav-links">
            <Link className="navbar-nav-link" to="/admin/productos">Productos</Link>
            <Link className="navbar-nav-link" to="/admin/reseñas">Reseñas</Link>
            <Link className="navbar-nav-link" to="/admin/empleados">Empleados</Link>
            <Link className="navbar-nav-link" to="/admin/clientes">Clientes</Link>
            <Link className="navbar-nav-link" to="/admin/graphics">Gráficas</Link> {/* ✅ agregado aquí */}
          </div>

          <div className="navbar-right-section">
            <div 
              className="navbar-icon-wrapper"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img src={IC_cuenta} alt="Cuenta" className="navbar-icon" />
              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <p>{user?.email}</p>
                    <small>{user?.userType}</small>
                  </div>
                  <hr />
                  <button onClick={() => navigate('/profile')}>Mi Perfil</button>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PrivateNavBar;
