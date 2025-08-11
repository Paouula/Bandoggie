import CardMayorista from "./Cards/CardMayorista";
import CardMinorista from "./Cards/CardMinorista";
import Paginacion from "../../Pagination.jsx";

const ListClients = ({
  viewMode,
  searchTerm,
  filterBy,
  onOpenModal,
  clientesMayoristas,
  clientesMinoristas,
}) => {
  // Filtrar clientes mayoristas - CORREGIDO: usar nameVet que es lo que viene de la BD
  const filteredMayoristas = clientesMayoristas.filter((client) =>
    (client.nameVet || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar clientes minoristas - CORREGIDO: usar name en lugar de nameClients
  const filteredMinoristas = clientesMinoristas.filter((client) =>
    (client.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={viewMode === "both" ? "gridTwoColumns" : "gridOneColumn"}>
      {viewMode !== "minorista" && (
        <section className="clientSection">
          <h2 className="sectionTitle">Cliente Mayorista</h2>
          <div className="clientList">
            {filteredMayoristas.length > 0 ? (
              filteredMayoristas.map((client) => (
                <CardMayorista
                  key={client.id}
                  client={client}
                  onOpenModal={onOpenModal}
                />
              ))
            ) : (
              <p className="noResults">No se encontraron mayoristas</p>
            )}
          </div>
          <div className="pagination">
            <Paginacion />
          </div>
        </section>
      )}

      {viewMode !== "mayorista" && (
        <section className="clientSection">
          <h2 className="sectionTitle">Cliente Minorista</h2>
          <div className="clientList">
            {filteredMinoristas.length > 0 ? (
              filteredMinoristas.map((client) => (
                <CardMinorista
                  key={client.id}
                  client={client}
                  onOpenModal={onOpenModal}
                />
              ))
            ) : (
              <p className="noResults">No se encontraron minoristas</p>
            )}
          </div>
          <div className="pagination">
            <Paginacion />
          </div>
        </section>
      )}
      <style jsx>{`
        .clientSection {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .mainContent {
          max-width: 1280px;
          margin: 0 auto;
        }
        .sectionTitle {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          text-align: center;
        }

        .clientList {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .noResults {
          text-align: center;
          color: #6b7280;
          font-style: italic;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default ListClients;