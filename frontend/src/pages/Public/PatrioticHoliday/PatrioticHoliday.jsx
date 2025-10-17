import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import useDataPatrioticProducts from '../../../components/Public/Holiday/PatrioticHoliday/hooks/useDataPatrioticProducts.jsx';
import ListPatrioticProducts from '../../../components/Public/Holiday/PatrioticHoliday/hooks/ListPatrioticcProducts.jsx';
import './PatrioticHoliday.css';
import { Toaster } from 'react-hot-toast';


// Imágenes de productos 
import ProductPH from '../../../img/PatrioticHoliday/ProductPH.png';


// Imagen del banner
import DogPatriotic from '../../../img/PatrioticHoliday/DogPatriotic.png';

const PatrioticPetStore = () => {

    // Usa el hook para obtener los productos
  const { PatrioticProducts, loading, error } = useDataPatrioticProducts();

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="patriotic-store">
      <Toaster position="top-right" />
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday
        title="Días Patrios"
        description="Celebra el orgullo salvadoreño con nuestras bandanas patrióticas para tu mejor amigo"
        buttonText="Comprar"
        dogImage={DogPatriotic}
        textColor="#f5f5f5"
        titleColor="#f5f5f5"
        buttonTextColor="#000000"
      />
      
        <ListPatrioticProducts PatrioticProducts={PatrioticProducts} />
</div>
  );
};

export default PatrioticPetStore;
