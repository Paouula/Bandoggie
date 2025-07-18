import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationButton = ({ direction, onClick, disabled }) => {
  const buttonStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 10,
    opacity: disabled ? 0.5 : 1,
  };

  const buttonHoverStyle = {
    backgroundColor: '#f9fafb',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    color: '#4b5563',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      style={{
        ...buttonStyle,
        ...(isHovered && !disabled ? buttonHoverStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {direction === 'left' ? (
        <ChevronLeft style={iconStyle} />
      ) : (
        <ChevronRight style={iconStyle} />
      )}
    </button>
  );
};

export default NavigationButton;