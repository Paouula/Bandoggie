import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import useDataValentinesProducts from '../../../components/Public/Holiday/ValentinesHoliday/hooks/useDataValentinesProducts.jsx';
import ListValentinesProducts from '../../../components/Public/Holiday/ValentinesHoliday/hooks/ListValentinesProducts.jsx';
import './ValentineHoliday.css';
import { Toaster } from 'react-hot-toast';

// Imagen del banner
import DogValentine from '../../../img/ValentineHoliday/DogValentine.png';

const ValentinePetStore = () => {
  
    const { ValentinesProducts, loading, error } = useDataValentinesProducts();

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="valentine-store">
      <Toaster position="top-right" />
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday 
        title="San Valentín"
        description="Celebra el amor con nuestras adorables bandanas temáticas para tu peludo. "
        buttonText="Comprar"
        dogImage={DogValentine}
        backgroundColor="#ff4d88"
        textColor="#fff0f5"
        titleColor="#ffffff"
        buttonTextColor="#000000"
      />
      
        
        <ListValentinesProducts ValentinesProducts={ValentinesProducts} />
      </div>
  );
};

export default ValentinePetStore;
