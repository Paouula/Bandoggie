import React from 'react';

function Button({ onClick }) {
  const buttonStyle = {
    backgroundColor: 'white',
    color: '#000000',
    border: '2px solid black',
    borderRadius: '9999px',
    padding: '8px 40px',
    fontSize: '15px',
    fontWeight: '600',
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
      onClick={onClick} // opcional
    >
      Ver más
    </button>
  );
}

export default Button;