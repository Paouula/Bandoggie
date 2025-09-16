import React from 'react';
import './FooterPublic.css';
import LogoFooter from '../../../img/Footer/LogoFooter.png';
import CollarFooter from '../../../img/Footer/CollarFooter.png';

function FooterPublic() {
  return (
<footer className="text-white text-center text-lg-start">
  <div className="container p-4">
    <div className="row">

      {/* Columna de texto con logo */}
      <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
        <h5 className="title">
          <img src={LogoFooter} alt="BANDOGGIE Logo" className="icono-footer" />
        </h5>
        <p>
          Somos una tienda pensada en la realización y venta de accesorios (¡especialmente bandanas!) 
          para el estilo y confort de tus mejores amigos peludos.
        </p>
      </div>

      {/* Columnas de links */}
      <div className="col-lg-2 col-6">
        <h5 className="title">Sobre BANDOGGIE</h5>
        <ul className="list-unstyled">
          <li><a href="/aboutus" className="text-white">Sobre nosotros</a></li>
          <li><a href="/aboutus" className="text-white">Misión</a></li>
          <li><a href="/aboutus" className="text-white">Visión</a></li>
          <li><a href="/aboutus" className="text-white">FQA</a></li>
        </ul>
      </div>

      <div className="col-lg-2 col-6 col-siguenos">
        <h5 className="title">Síguenos</h5>
        <ul className="list-unstyled">
          <li><a href="#!" className="text-white">Instagram</a></li>
          <li><a href="#!" className="text-white">Facebook</a></li>
        </ul>
      </div>

      <div className="col-lg-2 col-6 col-contact">
        <h5 className="title">Contacto</h5>
        <ul className="list-unstyled">
          <li><a href="#!" className="text-white no-hover">CHAT</a></li>
          <li><a className="text-white no-hover">Correo: huellitas.petshop2024@gmail.com</a></li>
          <li><a className="text-white no-hover"> WhatsApp:</a></li>
          <li><a className="text-white no-hover">+ 503 7209-7103</a></li>
        </ul>
      </div>


      {/* Imagen de collar */}
      <div className="col-lg-2 col-6 d-flex justify-content-center">
        <img src={CollarFooter} alt="Collar" className="collar-footer" />
      </div>


    </div>
  </div>

  <div className="text-left p-3">
    Bandoggie (2025). Todos los derechos reservados.
  </div>
</footer>
  );
}

export default FooterPublic;
