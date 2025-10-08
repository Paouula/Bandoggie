import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Elementos gráficos
import Element from '../../../img/MainPage/Element.png';
import Element2 from '../../../img/MainPage/Element2.png';
import Vector from '../../../img/MainPage/VectorMainPage.png';

// Imagen Banner por defecto
import DogCH from '../../../img/ChristmasHoliday/DogCH.png';

const Banner = ({ 
  title = "Navidad", 
  description = "Lindas y personalizables bandanas para tus peluditos con temática navideña",

  dogImage = DogCH,
  backgroundColor = "#default",
  textColor = "#default",
  titleColor = "#default"
}) => {
  const heroStyles = backgroundColor !== "#default" ? { backgroundColor } : {};
  const titleStyles = titleColor !== "#default" ? { color: titleColor } : {};
  const descriptionStyles = textColor !== "#default" ? { color: textColor } : {};
  const buttonStyles = textColor !== "#default" ? { color: textColor } : {};

  return (
    <div className="hero" style={heroStyles}>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title" style={titleStyles}>{title}</h1>
          <p className="hero-description" style={descriptionStyles}>
            {description}
          </p>

        </div>
        
        {/* Imagen del perro con animación */}
        <div className="hero-image">
          <div className="hero-image-container">
            <img src={dogImage} alt="Dog" className="DogCH bounce-dog" />
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