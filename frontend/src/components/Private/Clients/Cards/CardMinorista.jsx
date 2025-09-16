import React from "react";
import "./ClientCards.css";

const CardMinorista = ({ client, onOpenModal }) => (
  <div className="clientCard">
    <div className="clientHeader">
      <div className="clientAvatar">
        <img
          src={client.Image}
          alt={client.name}
          className="client-avatar-img"
        />
      </div>
      <div className="clientInfo">
        <h3 className="clientName">{client.name}</h3>
        <div className="clientDetails">
          <p className="detailItem">
            <span className="detailLabel">Nombre:</span> {client.name}
          </p>
          <p className="detailItem">
            <span className="detailLabel">Email:</span> {client.email}
          </p>
          <p className="detailItem">
            <span className="detailLabel">Teléfono:</span> {client.phone}
          </p>
          <p className="detailItem">
            <span className="detailLabel">Fecha de nacimiento:</span>{" "}
            {new Date(client.birthday).toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>
    </div>
    <div className="buttonContainer">
      <button
        className="viewMoreButton"
        onClick={() => onOpenModal(client, "minorista")}
      >
        Ver más
      </button>
    </div>
  </div>
);

export default CardMinorista;
