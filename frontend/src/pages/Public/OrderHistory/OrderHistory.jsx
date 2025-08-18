// src/pages/Public/OrderHistory/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import OrderCard from '../../../components/OrderCard/OrderCard';
import useOrders from '../../../hooks/OrderHistory/useOrders'; // CORRECCIÓN: Orders con mayúscula
import './OrderHistory.css';

const OrderHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Usar el hook personalizado
  const {
    orders,
    loading,
    error,
    fetchOrders,
    filterOrders,
    clearError
  } = useOrders();

  // Cargar órdenes al montar el componente
  useEffect(() => {
    fetchOrders().catch(err => {
      console.error('Error loading orders:', err);
    });
  }, [fetchOrders]);

  // Filtrar órdenes según criterios
  const filteredOrders = filterOrders(orders, filter, searchTerm);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Búsqueda ya se maneja en tiempo real con filteredOrders
  };

  const handleRetry = () => {
    clearError();
    fetchOrders();
  };

  // Calcular estadísticas basadas en todas las órdenes cargadas
  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'Completado').length,
    pending: orders.filter(o => o.status === 'Pendiente').length,
    shipped: orders.filter(o => o.status === 'Enviado').length
  };

  if (loading && orders.length === 0) {
    return (
      <main className="main-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando historial de pedidos...</p>
        </div>
      </main>
    );
  }

  if (error && orders.length === 0) {
    return (
      <main className="main-container">
        <div className="no-orders">
          <div className="no-orders-icon">⚠️</div>
          <h3>Error al cargar pedidos</h3>
          <p>{error}</p>
          <button 
            onClick={handleRetry}
            style={{
              marginTop: '1rem',
              padding: '0.8rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container">
      <div className="page-header">
        <h1 className="page-title">Historial de Pedidos</h1>
        <p className="page-subtitle">
          Gestiona y revisa todos los pedidos realizados
        </p>
      </div>

      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-tab ${filter === 'completado' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completado')}
          >
            Completados
          </button>
          <button 
            className={`filter-tab ${filter === 'pendiente' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pendiente')}
          >
            Pendientes
          </button>
          <button 
            className={`filter-tab ${filter === 'enviado' ? 'active' : ''}`}
            onClick={() => handleFilterChange('enviado')}
          >
            Enviados
          </button>
        </div>

        <div className="search-filter">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por ID, producto o cliente..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Pedidos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pendientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.shipped}</div>
          <div className="stat-label">Enviados</div>
        </div>
      </div>

      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h3>No se encontraron pedidos</h3>
            <p>
              {searchTerm 
                ? `No hay pedidos que coincidan con "${searchTerm}"`
                : filter === 'all' 
                  ? 'No tienes pedidos registrados aún'
                  : `No hay pedidos con estado "${filter}"`
              }
            </p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>

      {filteredOrders.length > 0 && (
        <div className="pagination">
          <button className="pagination-btn" disabled>
            ← Anterior
          </button>
          <span className="pagination-info">
            Mostrando {filteredOrders.length} de {orders.length} pedidos
          </span>
          <button className="pagination-btn" disabled>
            Siguiente →
          </button>
        </div>
      )}
    </main>
  );
};

export default OrderHistory;