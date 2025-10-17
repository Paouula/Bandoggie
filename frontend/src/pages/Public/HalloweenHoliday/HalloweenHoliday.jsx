import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import useDataHalloweenProducts from '../../../components/Public/Holiday/HalloweenHoliday/hooks/useDataHalloweenProducts.jsx';
import ListHalloweenProducts from '../../../components/Public/Holiday/HalloweenHoliday/ListHalloweenHoliday.jsx';
import './HalloweenHoliday.css';
import { Toaster } from 'react-hot-toast';

// Img Banner
import DogHalloween from '../../../img/HalloweenHoliday/DogHalloween.png';

const HalloweenPetStore = () => {

  const { HalloweenProducts, loading, error } = useDataHalloweenProducts();

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="halloween-store">
      <Toaster position="top-right" />
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday 
        title="Halloween"
        description="¡Dale un toque aterrador y adorable a tu peludo con nuestras bandanas de Halloween!"
        buttonText="Comprar"
        dogImage={DogHalloween}
        backgroundColor="#D371D8"
        textColor="#f5f5f5"
        titleColor="#f5f5f5"
        buttonTextColor="#000000"
      />
      <ListHalloweenProducts HalloweenProducts={HalloweenProducts} />
    </div>
  );
};

export default HalloweenPetStore;
