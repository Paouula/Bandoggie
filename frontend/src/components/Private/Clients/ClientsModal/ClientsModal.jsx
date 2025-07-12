import React from 'react';
import './ClientsModal.css';

const ClientModal = ({ selectedClient, clientType, onClose }) => {
  if (!selectedClient) return null;

  const imageSrc =
    clientType === 'mayorista' ? selectedClient.logo : selectedClient.avatar;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h2 className="modalTitle">
            Datos del Cliente {clientType === 'mayorista' ? 'Mayorista' : 'Minorista'}
          </h2>
          <button className="closeButton" onClick={onClose}>×</button>
        </div>

        <div className="modalBody">
          <div className="clientHeaderModal">
            <div className="clientImageModal">
              <img
                src={imageSrc}
                alt={selectedClient.name}
                className="clientImageModalImg"
              />
            </div>
            <div>
              <h3 className="clientNameModal">{selectedClient.name}</h3>
              <p className="clientTypeModal">
                {clientType === 'mayorista' ? 'Cliente Mayorista' : 'Cliente Minorista'}
              </p>
            </div>
          </div>

          {/* Detalles */}
          <div className="modalDetails">
            {clientType === 'mayorista' ? (
              <>
                <div className="detailCard" style={{ backgroundColor: '#EBF8FF' }}>
                  <label className="detailCardLabel">Nombre Completo</label>
                  <p className="detailCardValue">{selectedClient.nameVet}</p>
                </div>
                <div className="detailCard" style={{ backgroundColor: '#F0FDF4' }}>
                  <label className="detailCardLabel">NIT</label>
                  <p className="detailCardValue">{selectedClient.nitVet}</p>
                </div>
                <div className="detailCard detailCardFullWidth" style={{ backgroundColor: '#FAF5FF' }}>
                  <label className="detailCardLabel">Ubicación</label>
                  <p className="detailCardValue">{selectedClient.locationsVet}</p>
                </div>
              </>
            ) : (
              <>
                <div className="detailCard" style={{ backgroundColor: '#EBF8FF' }}>
                  <label className="detailCardLabel">Nombre Completo</label>
                  <p className="detailCardValue">{selectedClient.nameClients}</p>
                </div>
                <div className="detailCard" style={{ backgroundColor: '#F0FDF4' }}>
                  <label className="detailCardLabel">Email</label>
                  <p className="detailCardValue">{selectedClient.emailClients}</p>
                </div>
                <div className="detailCard" style={{ backgroundColor: '#FFFBEB' }}>
                  <label className="detailCardLabel">Teléfono</label>
                  <p className="detailCardValue">{selectedClient.phoneClients}</p>
                </div>
                <div className="detailCard" style={{ backgroundColor: '#FAF5FF' }}>
                  <label className="detailCardLabel">Fecha de Nacimiento</label>
                  <p className="detailCardValue">{selectedClient.dateOfBirthday}</p>
                </div>
              </>
            )}
          </div>

          <div className="modalActions">
            <button className="closeModalButton" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
