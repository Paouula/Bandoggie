import React from 'react';
import './MainPage.css';
import { useNavigate } from "react-router-dom";
import BannerMainPage from '../../../img/MainPage/BannerMainPage.png';
import { Toaster } from 'react-hot-toast';


//Componentes
import HolidayCarousel from '../../../components/Public/Holiday/HolidayCarousel.jsx';
import Button from '../../../components/Public/ui/Button.jsx';
import ButtonBanner from '../../../components/Public/ui/ButtonBanner.js';

//Iconos Cards
import Messaging from '../../../img/MainPage/Messaging.png';
import Shipped from '../../../img/MainPage/Shipped.png';
import Card from '../../../img/MainPage/Magnetic-Card.png';

//Elementos graficos categorías
import Element from '../../../img/MainPage/Element.png';
import Element2 from '../../../img/MainPage/Element2.png';
import Element3 from '../../../img/MainPage/Element3.png';
import Element4 from '../../../img/MainPage/Element4.png';
import Element5 from '../../../img/MainPage/Element5.png';
import Vector from '../../../img/MainPage/VectorMainPage.png';

//Img Categorias
import CategoryDog from '../../../img/MainPage/CategoryDog.png';
import CategoryDog2 from '../../../img/MainPage/CategoryDog2.png';
import CategoryDog3 from '../../../img/MainPage/CategoryDog3.png';

function MainPage() {

  const navigate = useNavigate();

const navegarBandanas = () => {
  navigate("/bandanas");
};

const navegarSobreNosotros = () => {
  navigate("/aboutus");
};

const navegarCollares = () => {
  navigate("/collars");
};

const navegarAccesorios = () => {
  navigate("/accessories");
};

  return ( 
    <div>
      <Toaster position="top-right" />
      {/* Sección del Banner */}
      <div className="conteiner-banner">
        <div className="banner-text">
          <h1>BANDOGGIE</h1>
          <p>Lindas y personalizables bandanas para <br />tus peluditos.</p>
          <ButtonBanner
            text="Comprar"
            variant="buy"
            onClick={navegarBandanas}/> 
        </div>
        <img src={BannerMainPage} alt="BannerMainPage" className="banner-image" />
      </div>

      {/* Sección de Cards */}
      <div className="rowCard">
        <div className="col-sm-3 mb-3 mb-sm-0">
          <div className="card">
            <div className="Icon-Img">
              <img src={Messaging} alt="Messaging" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Servicio al Cliente Personalizado</h5>
              <p className="card-text">Brindamos un servicio único a través de diferentes funcionalidades como chat, correo o contáctanos.</p>
              <br />
              <ButtonBanner text="Más Info" color="orange" onClick={navegarSobreNosotros} />
            </div>
          </div>
        </div>

        <div className="col-sm-3 mb-3 mb-sm-0">
          <div className="card">
            <div className="Icon-Img">
              <img src={Shipped} alt="Shipped" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Envío de Productos</h5>
              <p className="card-text">Brindamos un servicio único a través de diferentes funcionalidades como chat, correo o contáctanos.</p>
              <br />
              <ButtonBanner text="Más Info" color="blue" onClick={navegarSobreNosotros} />
            </div>
          </div>
        </div>

        <div className="col-sm-3 mb-3 mb-sm-0">
          <div className="card">
            <div className="Icon-Img">
              <img src={Card} alt="Card" />
            </div>
            <div className="card-body">
              <h5 className="card-title">Métodos de pagos</h5>
              <p className="card-text">Brindamos un servicio único a través de diferentes funcionalidades como chat, correo o contáctanos.</p>
              <br />
              <ButtonBanner text="Más Info" color="orange" onClick={navegarSobreNosotros} />
            </div>
          </div>
        </div>
      </div>


      {/* Sección de Categorías */}
      <div className="layout-container-column">
        <div className="bandanas-wrapper">
          <img src={Element3} alt="Element3" className="Element3" />
          <img src={Vector} alt="Vector" className="Vector" />
          <div className="row-row bandanas-card category-card bandanas">
            <div className="overlay-text">
              <h3>Bandanas</h3>
              <p>Lindas y personalizables<br />bandanas para tus peludos.</p>
              <Button onClick={navegarBandanas} /> {/* Componente */}
            </div>
            <img src={Element} alt="Element" className="Element" />
            <img src={Element2} alt="Element2" className="Element2" />
            <img src={CategoryDog} alt="CategoryDog" className="CategoryDog" />
          </div>
        </div>

        <div className="row-row row-double">
          <div className="category-card collares">
            <div className="overlay-text">
              <h3>Collares</h3>
              <p>Collares de varios diseños<br />para .</p>
              <Button onClick={navegarCollares}/> {/* Componente */}
            </div>
            <img src={Element4} alt="Element4" className="Element4" />
            <img src={CategoryDog2} alt="CategoryDog2" className="CategoryDog2" />
            <img src={Vector} alt="Vector" className="Vector2" />
          </div>

          <div className="category-card accesorios">
            <div className="overlay-text2">
              <h3>Accesorios</h3>
              <p>Accesorios para destacar la<br />lindura de tus animalitos.</p>
              <Button onClick={navegarAccesorios}/>  {/* Componente */}
              <img src={CategoryDog3} alt="CategoryDog3" className="CategoryDog3" />
              <img src={Element5} alt="Element5" className="Element5" />
            </div>
          </div>
        </div>
      </div>


      </div>

  );

  
}

export default MainPage;