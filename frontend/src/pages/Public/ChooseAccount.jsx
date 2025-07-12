import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Choose.css"; 
import { Link } from 'react-router-dom';
import logo from "../../img/LogoBandoggie.png";

const ChooseAccountType = () => {
  const navigate = useNavigate();

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="choose-container">
      <div className="choose-logo">
        <img src={logo} alt="Huellitas" />
      </div>
      <hr />
      <h2 className="choose-title">¿Qué tipo de cuenta deseas crear?</h2>

      <div className="choose-options">
        <div
          className="choose-card"
          onClick={() => handleSelect("/register")}
        >
          <h3>Usuario Normal</h3>
          <p>Compra productos personalizados a tu gusto</p>
        </div>

        <div
          className="choose-card"
          onClick={() => handleSelect("/register-vet")}
        >
          <h3>Veterinaria</h3>
          <p>Compra productos al por mayor para tu negocio</p>
        </div>
      </div>
      <div className="choose-footer">
        <Link className="small-link" to="/login">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>

      <div className="choose-decoration"></div>
    </div>
  );
};

export default ChooseAccountType;
