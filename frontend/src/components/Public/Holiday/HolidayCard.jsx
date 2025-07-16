import React from 'react';

const HolidayCard = ({ holiday, onClick }) => {
  const cardStyle = {
    width: '288px',
    minWidth: '288px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: 'scale(1)',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
  };

  const containerHoverStyle = {
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const imageContainerStyle = {
    height: '192px',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    overflow: 'hidden',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const titleContainerStyle = {
    padding: '24px',
    textAlign: 'center',
  };

  const titleStyle = {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '28px',
    margin: '0',
  };

  const getBgColor = (bgColorClass) => {
    const colorMap = {
      'bg-red-400': '#f87171',
      'bg-orange-400': '#fb923c',
      'bg-pink-400': '#f472b6',
      'bg-blue-400': '#60a5fa',
      'bg-green-400': '#4ade80',
      'bg-purple-400': '#c084fc',
    };
    return colorMap[bgColorClass] || '#9ca3af';
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      style={{
        ...cardStyle,
        ...(isHovered ? cardHoverStyle : {}),
      }}
      onClick={() => onClick(holiday.name)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{
          ...containerStyle,
          ...(isHovered ? containerHoverStyle : {}),
        }}
      >
        {/* Imagen de la mascota */}
        <div 
          style={{
            ...imageContainerStyle,
            backgroundColor: getBgColor(holiday.bgColor),
          }}
        >
          <img 
            src={holiday.image} 
            alt={`Mascota para ${holiday.name}`}
            style={imageStyle}
          />
        </div>
        
        {/* Título */}
        <div style={titleContainerStyle}>
          <h3 style={titleStyle}>{holiday.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default HolidayCard;