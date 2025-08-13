import React from 'react';
import './ClientCards.css';

const CardMayorista = ({ client, onOpenModal }) => (
  <div className="clientCard">
    <div className="clientHeader">
      <div className="clientLogo">
        <img src={client.logo} alt={client.nameVet} className="client-logo-img" />
      </div>
      <div className="clientInfo">
        <h3 className="clientName">{client.nameVet}</h3>
        <div className="clientDetails">
          <p className="detailItem"><span className="detailLabel">Nombre:</span> {client.nameVet}</p>
          <p className="detailItem"><span className="detailLabel">NIT:</span> {client.nitVet}</p>
          <p className="detailItem"><span className="detailLabel">Ubicación:</span> {client.locationVet}</p>
        </div>
      </div>
    </div>
    <div className="buttonContainer">
      <button className="viewMoreButton" onClick={() => onOpenModal(client, 'mayorista')}>
        Ver más
      </button>
    </div>
  </div>
);

export default CardMayorista;
