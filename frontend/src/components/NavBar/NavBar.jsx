import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom'; 
import LogoBandoggie from '../../img/NavBar/LogoBandoggie.png'

function NavBar() {
  return ( 
    <>
<nav className="navbar navbar-expand-lg navbar-light">
  <a className="navbar-brand" href="/">
    <img src={LogoBandoggie} alt="Logo" className="logo" />
  </a>

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

  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/">Inicio</a>
      <a className="nav-item nav-link" href="#">Bandanas</a>
      <a className="nav-item nav-link" href="#">Collares</a>
      <a className="nav-item nav-link" href="#">Accesorios</a>
      <a className="nav-item nav-link" href="#">Festividades</a>
    </div>

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
  </div>
</nav>


    </>
  );
}

export default NavBar;