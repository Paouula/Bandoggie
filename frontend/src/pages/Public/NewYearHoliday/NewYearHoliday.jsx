import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import useDataNewYearProducts from '../../../components/Public/Holiday/NewYearHoliday/hooks/useDataNewYearProduct.jsx';
import ListNewYearProducts from '../../../components/Public/Holiday/NewYearHoliday/ListNewYearProduct.jsx';
import './NewYearHoliday.css';
// Imagen del banner
import DogNewYear from '../../../img/NewYearHoliday/DogNewYear.png';
import { Toaster } from 'react-hot-toast';

const NewYearPetStore = () => {

  // Usa el hook para obtener los productos
  const { NewYearProducts, loading, error } = useDataNewYearProducts();

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="newyear-store">
      <Toaster position="top-right" />
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday 
        title="Año Nuevo"
        description="¡Recibe el nuevo año con estilo! Descubre nuestras bandanas brillantes y festivas para tu mascota."
        buttonText="Comprar"
        dogImage={DogNewYear}
        backgroundColor="#0B132B"
        textColor="#ffffff"
        titleColor="#FFD700"
        buttonTextColor="#000000"
      />
      
        <ListNewYearProducts NewYearProducts={NewYearProducts} />
      </div>
  );
};

export default NewYearPetStore;
