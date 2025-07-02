import React from "react";
import "./BannerPrivate.css";
import PawYellow from "../../img/Empleados/PawYellow.png";
import PawPink from "../../img/Empleados/PawPink.png";
import PawBlue from "../../img/Empleados/PawBlue.png";

const BannerPrivate = ({ title, subtitle, mainImage }) => {
  return (
    <section className="employees-section">
      <div className="floating-circle-1"></div>
      <div className="floating-circle-2"></div>
      <div className="floating-circle-3"></div>
      <div className="floating-circle-4"></div>
      <div className="floating-circle-5"></div>

      <div className="container-emp">
        <div className="left-side">
          <div className="paw-icons">
            <div className="paw-circle yellow">
              <img src={PawYellow} alt="Paw Icon" className="paw-icon" />
            </div>
            <div className="paw-circle pink">
              <img src={PawPink} alt="Paw Icon" className="paw-icon" />
            </div>
            <div className="paw-circle blue">
              <img src={PawBlue} alt="Paw Icon" className="paw-icon" />
            </div>
          </div>
          <div className="main-image">
            <img src={mainImage} alt="Header principal" />
          </div>
        </div>

        <div className="right-side">
          <h1 className="title-emp">{title}</h1>
          <p className="header-emp">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default BannerPrivate;
