import React from 'react';
import './MainPage.css';
import BannerMainPage from '../../../img/MainPage/BannerMainPage.png';
//Iconos Cards
import Messaging from '../../../img/MainPage/Messaging.png';
import Shipped from '../../../img/MainPage/Shipped.png';
import Card from '../../../img/MainPage/Magnetic-Card.png';


function MainPage() {
  return ( 
    <div>
      {/* Sección del Banner */}
      <div className="conteiner-banner">
        <div className="banner-text">
          <h1>BANDOGGIE</h1>
          <p>Lindas y personalizables bandanas para <br />tus peluditos.</p>
          <button>Comprar</button>
        </div>
        <img src={BannerMainPage} alt="BannerMainPage" className="banner-image" />
      </div>

      {/* Sección de Cards */}
      <div className="row">
        <div className="col-sm-3 mb-3 mb-sm-0">
          <div className="card">
            <div className="Icon-Img">
              <img src={Messaging} alt="Messaging" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Servicio al Cliente Perzonalizado</h5>
              <p className="card-text">Brindamos un servicio unico a través de diferentes funcionalidades como chat, correo o contactanos. </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
          <div className="Icon-Img">
              <img src={Shipped} alt="Messaging" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Envío de Productos</h5>
              <p className="card-text">Brindamos un servicio unico a través de diferentes funcionalidades como chat, correo o contactanos.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
          <div className="Icon-Img">
              <img src={Card} alt="Messaging" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Métodos de pagos</h5>
              <p className="card-text">Brindamos un servicio unico a través de diferentes funcionalidades como chat, correo o contactanos. </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

