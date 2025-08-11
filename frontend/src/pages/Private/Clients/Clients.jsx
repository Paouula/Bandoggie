import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./Clients.css";
import ClientsBanner from "../../../img/BannerPrivate/ClientsBanner.png";
import BannerPrivate from "../../../components/Private/BannerPrivate/BannerPrivate.jsx";
import ListClients from "../../../components/Private/Clients/ListClients.jsx";
import ClientModal from "../../../components/Private/Clients/ClientsModal/ClientsModal.jsx";
import { Filter } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";

import useFetchUsers from "../../../hooks/Clients/useFetchUsers.js";
import Loading from "../../../components/LoadingScreen/LoadingScreen.jsx";

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Por defecto");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientType, setClientType] = useState("");
  const [viewMode, setViewMode] = useState("both");
  const [clients, setClients] = useState([]);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(null);

  const { handleGetClientes, handleGetVets } = useFetchUsers();

  const loadClients = async () => {
    try {
      const data = await handleGetClientes();
      setClients(data);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los clientes");
    }
  };

  const loadVets = async () => {
    try {
      const data = await handleGetVets();
      setVets(data);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los veterinarios");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await Promise.all([loadClients(), loadVets()]);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // MAPEO CORREGIDO PARA CLIENTES MINORISTAS
  const mappedClients = clients.map((client) => ({
    id: client._id,
    name: client.name, 
    Image: client.image, 
    email: client.email, 
    phone: client.phone, 
    birthday: client.birthday, 
    
    
    avatar: client.image,
    nameClients: client.name,
    emailClients: client.email,
    phoneClients: client.phone,
    dateOfBirthday: client.dateOfBirth,
  }));

  // MAPEO CORREGIDO PARA VETERINARIOS/MAYORISTAS
  const mappedVets = vets.map((vet) => ({
    id: vet._id,
    name: vet.name, 
    logo: vet.image, 
    nameVet: vet.name, 
    locationVet: vet.address,
    locationsVet: vet.address, 
    nitVet: vet.nit, 
  }));

  const handleOpenModal = (client, type) => {
    setSelectedClient(client);
    setClientType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setClientType("");
    setModalOpen(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {loading && (
        <div className="loading-overlay">
          <Loading message="Cargando clientes..." />
        </div>
      )}

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
                onChange={(e) => setFilterBy(e.target.value)}
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
                onChange={(e) => setViewMode(e.target.value)}
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
          clientesMayoristas={mappedVets}
          clientesMinoristas={mappedClients}
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