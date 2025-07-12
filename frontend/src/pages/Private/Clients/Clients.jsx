import React, { useState } from 'react';
import './Clients.css';
import ClientsBanner from '../../../img/BannerPrivate/ClientsBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import ListClients from '../../../components/Private/Clients/ListClients.jsx';
import ClientModal from '../../../components/Private/Clients/ClientsModal/ClientsModal.jsx';
import { Filter } from 'lucide-react';
import SearchIcon from '@mui/icons-material/Search';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('Por defecto');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientType, setClientType] = useState('');
  const [viewMode, setViewMode] = useState('both');

  const clientesMayoristas = [
  {
    id: 1,
    name: 'Veterinaria Suroeste',
    logo: 'https://i.pinimg.com/736x/55/e4/4a/55e44a2d69e78a235dc4ce88f0d01f38.jpg',
    nameVet: 'Veterinaria Suroeste S.A.S',
    locationsVet: 'Calle 45 #23-67, San Salvador',
    nitVet: '900.123.456-7'
  },
  {
    id: 2,
    name: 'Vet Patitas Pet',
    logo: 'https://i.pinimg.com/736x/55/e4/4a/55e44a2d69e78a235dc4ce88f0d01f38.jpg',
    nameVet: 'Clínica Veterinaria Patitas Pet Ltda.',
    locationsVet: 'Avenida 80 #45-23, San Salvador',
    nitVet: '900.789.123-4'
  }
];

const clientesMinoristas = [
  {
    id: 1,
    name: 'Mario Navarro',
    avatar: 'https://i.pinimg.com/736x/f0/e9/05/f0e905fb19ef0e1c5db1970a7d65d1cb.jpg',
    nameClients: 'Mario Andrés Navarro García',
    emailClients: 'mario.navarro@email.com',
    phoneClients: '7589 2564',
    dateOfBirthday: '1985-03-15',
  },
  {
    id: 2,
    name: 'Joel Ramirez',
    avatar: 'https://i.pinimg.com/736x/f0/e9/05/f0e905fb19ef0e1c5db1970a7d65d1cb.jpg',
    nameClients: 'Joel Alexander Ramírez López',
    emailClients: 'joel.ramirez@email.com',
    phoneClients: '7128 2800',
    dateOfBirthday: '1990-07-22',
  }
];


  const handleOpenModal = (client, type) => {
    setSelectedClient(client);
    setClientType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setClientType('');
    setModalOpen(false);
  };

  return (
    <>
      <BannerPrivate
        title="Clientes"
        subtitle="Lista de los clientes registrados, mayoristas y minoristas"
        mainImage={ClientsBanner}
      />

      <div className="container-clients">
        {/* Filtros y búsqueda */}
        <div className="headerControls">
          <div className="controlsLeft">
            <div className="filterControl">
              <Filter className="icon" />
              <span className="filterText">Filtrar</span>
              <span className="separator">|</span>
              <select
                className="select"
                value={filterBy}
                onChange={e => setFilterBy(e.target.value)}
              >
                <option>Por defecto</option>
                <option>Alfabético</option>
                <option>Más reciente</option>
              </select>
            </div>
            <div className="viewModeControl">
              <span className="filterText">Ver:</span>
              <select
                className="select"
                value={viewMode}
                onChange={e => setViewMode(e.target.value)}
              >
                <option value="both">Ambos</option>
                <option value="mayorista">Solo Mayoristas</option>
                <option value="minorista">Solo Minoristas</option>
              </select>
            </div>
          </div>
          <div className="searchContainer">
            <input
              className="searchInput"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </div>
        </div>

        {/* Lista clientes */}
          <ListClients
          viewMode={viewMode}
          searchTerm={searchTerm}
          filterBy={filterBy}
          onOpenModal={handleOpenModal}
          clientesMayoristas={clientesMayoristas}
          clientesMinoristas={clientesMinoristas}
        />

        {/* Modal para ver más*/}
        {modalOpen && selectedClient && (
          <ClientModal
            selectedClient={selectedClient}
            clientType={clientType}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default ClientsPage;
