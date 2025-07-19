import React from 'react';

function CustomButton({ text, color = 'blue', variant = 'info', onClick }) {
  const baseStyle = {
    borderRadius: '9999px',
    padding: '8px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const colorStyles = {
    orange: { backgroundColor: '#f4a942' },
    blue: { backgroundColor: '#2b588f' },
  };

  const buyStyle = {
    backgroundColor: '#f4a942',
    padding: '10px 30px',
    fontSize: '16px',
  };

  let finalStyle = {
    ...baseStyle,
    ...(colorStyles[color] || colorStyles.blue),
  };

  if (variant === 'buy') {
    finalStyle = {
      ...baseStyle,
      ...buyStyle,
    };
  }

  return (
    <button style={finalStyle} onClick={onClick}>
      {text}
    </button>
  );
}

export default CustomButton;
