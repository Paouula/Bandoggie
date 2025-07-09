import CardMayorista from './Cards/CardMayorista';
import CardMinorista from './Cards/CardMinorista';
import Paginacion from '../../Paginacion.jsx';

  const ListClients = ({
    viewMode,
    searchTerm,
    filterBy,
    onOpenModal,
    clientesMayoristas,
    clientesMinoristas,
  }) => {

  const filteredMayoristas = clientesMayoristas.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMinoristas = clientesMinoristas.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={viewMode === 'both' ? 'gridTwoColumns' : 'gridOneColumn'}>
      {viewMode !== 'minorista' && (
        <section className="clientSection">
          <h2 className="sectionTitle">Cliente Mayorista</h2>
          <div className="clientList">
            {filteredMayoristas.map((client) => (
              <CardMayorista key={client.id} client={client} onOpenModal={onOpenModal} />
            ))}
          </div>
          <div className="pagination">
            <Paginacion />
          </div>
        </section>
      )}

      {viewMode !== 'mayorista' && (
        <section className="clientSection">
          <h2 className="sectionTitle">Cliente Minorista</h2>
          <div className="clientList">
            {filteredMinoristas.map((client) => (
              <CardMinorista key={client.id} client={client} onOpenModal={onOpenModal} />
            ))}
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
            color: #1F2937;
            text-align: center;
            }

        .clientList {
            display: flex;
            flex-direction: column;
            gap: 16px;
            }

          `}</style>
    </div>
  );
};

export default ListClients;