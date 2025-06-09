import React from 'react';
import './MainPage.css';
import BannerMainPage from '../../img/MainPage/BannerMainPage.png';

function MainPage() {
  return ( 
    <div className="conteiner-banner">
      <div className="banner-text">
        <h1>BANDOGGIE</h1>
        <p>Lindas y personalizables bandanas para <br />tus peluditos.</p>
        <button>Comprar</button>
      </div>

      <img src={BannerMainPage} alt="BannerMainPage" className="banner-image" />
    </div>
  );
}

export default MainPage;
