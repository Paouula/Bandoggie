import React, { useState, useRef } from 'react';
import HolidayCard from './HolidayCard';
import NavigationButton from './NavigationButton';

//Imagenes 
import DogNavideño from '../../img/MainPage/Dog.png';
import DogHalloween from '../../img/MainPage/Dog2.png';
import DogValetin from '../../img/MainPage/Dog3.png';
import DogPatria from '../../img/MainPage/Dog4.png';
import DogPascuas from '../../img/MainPage/Dog5.png';
import DogAñonuevo from '../../img/MainPage/Dog6.png';

const HolidayCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const holidays = [
    { 
      name: 'Navidad', 
      bgColor: 'bg-red-400',
      image: DogNavideño 
    },
    { 
      name: 'Halloween', 
      bgColor: 'bg-orange-400',
      image: DogHalloween
    },
    { 
      name: 'San Valentín', 
      bgColor: 'bg-pink-400',
      image: DogValetin
    },
    { 
      name: 'Días Patrios', 
      bgColor: 'bg-blue-400',
      image: DogPatria
    },
    { 
      name: 'Año Nuevo', 
      bgColor: 'bg-red-400',
      image: DogAñonuevo
    },
    { 
      name: 'Pascuas', 
      bgColor: 'bg-orange-400',
      image: DogPascuas
    }
  ];

  const handleCardClick = (holidayName) => {
    console.log(`Navegando a: ${holidayName}`);
    // Aquí irían las rutas a las páginas correspondientes
    // Ejemplo: window.location.href = `/festividades/${holidayName.toLowerCase().replace(' ', '-')}`;
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 304; // Ancho de la card (288px) + gap (16px)
      const currentScrollLeft = scrollRef.current.scrollLeft;
      const targetScrollLeft = direction === 'left' 
        ? currentScrollLeft - scrollAmount 
        : currentScrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      
      // Actualizar estado de botones después de un breve delay
      setTimeout(checkScrollButtons, 300);
    }
  };

  const containerStyle = {
   
    padding: '64px 0',
  };

  const maxWidthStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
  };

  const carouselContainerStyle = {
    position: 'relative',
    marginBottom: '48px',
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
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const titleContainerStyle = {
    textAlign: 'center',
  };

  const titleStyle = {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: '36px',
    lineHeight: '40px',
    margin: '0',
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
      <div style={titleContainerStyle}>
          <h2 style={titleStyle}>Nuestras Categorías</h2>
          <br /><br /><br />
        </div>
        {/* Contenedor principal con scroll horizontal */}
        <div style={carouselContainerStyle}>
          {/* Botón izquierdo */}
          <div style={leftButtonStyle}>
            <NavigationButton 
              direction="left" 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            />
          </div>

          {/* Botón derecho */}
          <div style={rightButtonStyle}>
            <NavigationButton 
              direction="right" 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            />
          </div>

          {/* Contenedor de scroll */}
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
        
        {/* Título Superior- centrado */}
        
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HolidayCarousel;
