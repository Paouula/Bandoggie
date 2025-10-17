import React from 'react';

const Button = ({onClick}) => {
  const buttonStyle = {
    backgroundColor: 'white',
    color: '#000000', // negro fuerte
    border: '2px solid black',
    borderRadius: '9999px',
    padding: '8px 40px', // más alargado (horizontal) y delgado (vertical)
    fontSize: '15px',
    fontWeight: '600', // letras más fuertes
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
  };

  const hoverStyle = {
    backgroundColor: 'black',
    color: 'white',
  };

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <button
      style={isHovering ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      Ver más
    </button>
  );
}

export default Button;

