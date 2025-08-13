import React, { useState } from 'react';
import './MainPage.css';
import BannerMainPage from '../../../img/BannerPrivate/MainPageBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';


function MainPagePrivate () {

   return (
    <>
      <BannerPrivate
        title="¡Bienvenida!"
        subtitle="¿Qué deseas hacer hoy?"
        mainImage={BannerMainPage}
      />

    </>
  );
};

export default MainPagePrivate;