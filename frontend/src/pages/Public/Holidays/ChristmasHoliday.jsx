import React, { useState } from 'react';
import './ChristmasHoliday.css'
import NavigationHoliday from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import ListChristmasProducts from '../../../components/Public/Holiday/ChristmasHoliday/ListChristmasProducts.jsx';  
import useDataChristmasProducts from '../../../components/Public/Holiday/ChristmasHoliday/hooks/useDataChristmasProducts.jsx'; 
import { Toaster } from 'react-hot-toast';


const ChristmasPetStore = () => {

  // Usa el hook para obtener los productos
  const { ChristmasProducts, loading, error } = useDataChristmasProducts();

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Días Patrios', 'Año Nuevo', 'Cumpleaños'];

  // Función de navegación
  const handleNavigate = (item, index) => {
    const pageRoutes = {
      'Navidad': '/christmas-holiday',
      'Halloween': '/halloween-holiday', 
      'San Valentín': '/valentines-holiday',
      'Días Patrios': '/patriotic-holiday',
      'Año Nuevo': '/new-year-holiday',
      'Cumpleaños': '/birthday-holiday'
    };

    const route = pageRoutes[item];
    console.log(`Navegando a: ${item} - Ruta: ${route}`);
  };

  return (
    <div className="christmas-store">
      <Toaster position="top-right" />
      {/* Componente de nav */}
      <NavigationHoliday 
        breadcrumbs={breadcrumbs}
        currentPage="Navidad"
        onNavigate={handleNavigate}
      />
      
      {/* Componente*/}
      <BannerHoliday />
      
      <div className="main-content">
        
        {/* Muestra el loading o el error si existen */}
        {loading && <p>Cargando productos...</p>}
        {error && <p>Error: {error}</p>}
        
        {/* Usa el componente ListChristmasProducts para mostrar los productos */}
        <ListChristmasProducts ChristmasProducts={ChristmasProducts} />
      </div>
    </div>
  );
};

export default ChristmasPetStore;
