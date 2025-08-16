import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
