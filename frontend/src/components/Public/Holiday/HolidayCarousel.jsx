import React, { useState, useRef } from 'react';

// Importación de imágenes locales
import DogNavideño from '../../../img/MainPage/Dog.png';
import DogHalloween from '../../../img/MainPage/Dog2.png';
import DogValetin from '../../../img/MainPage/Dog3.png';
import DogPatria from '../../../img/MainPage/Dog4.png';
import DogPascuas from '../../../img/MainPage/Dog5.png';
import DogAñonuevo from '../../../img/MainPage/Dog6.png';

// Componente HolidayCard Rediseñado
const HolidayCard = ({ holiday, onClick }) => {
  const cardStyle = {
    minWidth: '280px',
    width: '280px',
    backgroundColor: 'white',
    borderRadius: '24px',
    border: '3px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'transform 0.2s, border-color 0.2s',
    marginTop: '100px',
    position: 'relative',
  };

  const cardHoverStyle = {
    transform: 'translateY(-4px)',
    borderColor: '#d1d5db',
  };

  const imageContainerStyle = {
    position: 'absolute',
    top: '-90px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  };

  const imageStyle = {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // sombra sin borde blanco
  };

  const contentStyle = {
    padding: '20px',
    paddingTop: '110px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '16px',
  };

  const buttonStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: '#F5A02D',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#d88d29', // versión más oscura para hover
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div 
      style={isHovered ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(holiday.name)}
    >
      <div style={imageContainerStyle}>
        <img 
          src={holiday.image} 
          alt={holiday.name}
          style={imageStyle}
        />
      </div>
      
      <div style={contentStyle}>
        <h3 style={titleStyle}>{holiday.name}</h3>
        
        <button 
          style={isButtonHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick(holiday.name);
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Componente NavigationButton
const NavigationButton = ({ direction, onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseColor = '#F5A02D';
  const hoverColor = '#d88d29';
  const disabledColor = '#e5e7eb';

  const buttonStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: disabled ? disabledColor : (isHovered ? hoverColor : baseColor),
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === 'left' ? (
          <polyline points="15 18 9 12 15 6"></polyline>
        ) : (
          <polyline points="9 18 15 12 9 6"></polyline>
        )}
      </svg>
    </button>
  );
};

// Componente Principal HolidayCarousel
const HolidayCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const holidays = [
    { name: 'Navidad', image: DogNavideño },
    { name: 'Halloween', image: DogHalloween },
    { name: 'San Valentín', image: DogValetin },
    { name: 'Días Patrios', image: DogPatria },
    { name: 'Pascuas', image: DogPascuas },
    { name: 'Año Nuevo', image: DogAñonuevo },
  ];

  const handleCardClick = (holidayName) => {
    console.log(`Card clickeada: ${holidayName}`);
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 296;
      const currentScrollLeft = scrollRef.current.scrollLeft;
      const targetScrollLeft = direction === 'left' 
        ? currentScrollLeft - scrollAmount 
        : currentScrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

  const containerStyle = {
    padding: '64px 0',
    backgroundColor: '#f9fafb',
  };

  const maxWidthStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
  };

  const titleContainerStyle = {
    textAlign: 'center',
    marginBottom: '48px',
  };

  const titleStyle = {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: '36px',
    lineHeight: '40px',
    margin: '0',
  };

  const carouselContainerStyle = {
    position: 'relative',
  };

  const leftButtonStyle = {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%) translateX(-16px)',
    zIndex: 20,
  };

  const rightButtonStyle = {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%) translateX(16px)',
    zIndex: 20,
  };

  const scrollContainerStyle = {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    padding: '16px 32px',
    paddingTop: '120px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
        <div style={titleContainerStyle}>
          <h2 style={titleStyle}>Nuestras Festividades</h2>
        </div>

        <div style={carouselContainerStyle}>
          <div style={leftButtonStyle}>
            <NavigationButton 
              direction="left" 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            />
          </div>

          <div style={rightButtonStyle}>
            <NavigationButton 
              direction="right" 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            />
          </div>

          <div 
            ref={scrollRef}
            style={scrollContainerStyle}
            onScroll={checkScrollButtons}
          >
            {holidays.map((holiday, index) => (
              <HolidayCard 
                key={index}
                holiday={holiday}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HolidayCarousel;
