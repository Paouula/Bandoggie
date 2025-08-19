import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import useDataBirthdayProducts from '../../../components/Public/Holiday/BirthdayHliday/hooks/useDataBirthdayProducts.jsx';
import ListBirthdayProducts from '../../../components/Public/Holiday/BirthdayHliday/ListBirthdayProducts.jsx';
import './BirthdayHoliday.css';
// Imagen del banner
import DogBirthday from '../../../img/BirthdayHoliday/DogBirthday.png';

const BirthdayPetStore = () => {

// Usa el hook para obtener los productos
  const { BirthdayProducts, loading, error } = useDataBirthdayProducts();

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="birthday-store">
      <Navigation breadcrumbs={breadcrumbs} />

      <BannerHoliday 
        title="¡Feliz Cumpleaños!"
        description="Celebra el día más especial de tu mascota con nuestras bandanas llenas de color y alegría."
        buttonText="Comprar"
        dogImage={DogBirthday}
        backgroundColor="#FFC0CB"
        textColor="#4b0082"
        titleColor="#ffffff"
        buttonTextColor="#000000"
      />

        <ListBirthdayProducts BirthdayProducts={BirthdayProducts} />
      </div>
  );
};

export default BirthdayPetStore;
