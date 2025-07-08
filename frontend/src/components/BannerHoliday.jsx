import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Elementos graficos 
import Element from '../img/MainPage/Element.png';
import Element2 from '../img/MainPage/Element2.png';
import Vector from '../img/MainPage/VectorMainPage.png';

// Imagen Banner
import DogCH from '../img/ChristmasHoliday/DogCH.png';

const Banner = () => {
  return (
    <div className="hero">
      {/* Navigation arrows */}
      <button className="hero-nav-button prev">
        <ChevronLeft size={24} />
      </button>
      <button className="hero-nav-button next">
        <ChevronRight size={24} />
      </button>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Navidad</h1>
          <p className="hero-description">
            Lindas y personalizables bandanas para<br />
            tus peluditos con temática navideña
          </p>
          <button className="hero-button">
            Comprar
          </button>
        </div>

        {/* Dog image */}
        <div className="hero-image">
          <div className="hero-image-container">
            <img src={DogCH} alt="DogCH" className="DogCH" />
            <div className="hero-image-inner">
              <img src={Element} alt="Element" className="Element" />
              <img src={Element2} alt="Element2" className="Element2" />
              <img src={Vector} alt="Vector" className="Vector" />
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;