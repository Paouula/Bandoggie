import React from 'react';
import './ClientCards.css';

const CardMinorista = ({ client, onOpenModal }) => (
  <div className="clientCard">
    <div className="clientHeader">
    <div className="clientAvatar">
      <img src={client.avatar} alt={client.name} className="client-avatar-img" />
    </div>
      <div className="clientInfo">
        <h3 className="clientName">{client.name}</h3>
        <div className="clientDetails">
          <p className="detailItem"><span className="detailLabel">Nombre:</span> {client.nameClients}</p>
          <p className="detailItem"><span className="detailLabel">Email:</span> {client.emailClients}</p>
          <p className="detailItem"><span className="detailLabel">Teléfono:</span> {client.phoneClients}</p>
          <p className="detailItem"><span className="detailLabel">Fecha de nacimiento:</span> {client.dateOfBirthday}</p>
        </div>
      </div>
    </div>
    <div className="buttonContainer">
      <button className="viewMoreButton" onClick={() => onOpenModal(client, 'minorista')}>
        Ver más
      </button>
    </div>
  </div>
);

export default CardMinorista;
