// src/pages/Private/OrderHistory/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import OrderCard from '../../../components/OrderCard/OrderCard';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo - reemplazar con API call
  const mockOrders = [
    {
      id: '2025024',
      status: 'Completado',
      date: '2025-01-30',
      product: {
        name: 'Bandanas celeste con diseño',
        image: '/src/assets/images/bandana-celeste.jpg',
        size: 'XL',
        quantity: 3,
        color: '#87ceeb',
        price: 12.99
      },
      delivery: {
        city: 'San Salvador',
        region: 'Mexicanos',
        address: 'Calle 12, avenida 14',
        reference: 'Hospital Zacamil'
      },
      customer: {
        firstName: 'María',
        lastName: 'Rosales',
        phone: '76054567'
      }
    },
    {
      id: '2025023',
      status: 'Pendiente',
      date: '2025-02-01',
      product: {
        name: 'Collar de cuero premium',
        image: '/src/assets/images/collar-cuero.jpg',
        size: 'M',
        quantity: 1,
        color: '#8B4513',
        price: 25.99
      },
      delivery: {
        city: 'San Salvador',
        region: 'Centro',
        address: 'Av. Roosevelt, Casa 123',
        reference: 'Frente al parque'
      },
      customer: {
        firstName: 'Carlos',
        lastName: 'Mendoza',
        phone: '78123456'
      }
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = order.id.includes(searchTerm) || 
                         order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <main className="main-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando historial de pedidos...</p>
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
            Todos ({orders.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'completado' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completado')}
          >
            Completados ({orders.filter(o => o.status === 'Completado').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'pendiente' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pendiente')}
          >
            Pendientes ({orders.filter(o => o.status === 'Pendiente').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'enviado' ? 'active' : ''}`}
            onClick={() => handleFilterChange('enviado')}
          >
            Enviados ({orders.filter(o => o.status === 'Enviado').length})
          </button>
        </div>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Buscar por número de pedido, producto o cliente..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">
            🔍
          </button>
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">Total Pedidos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${orders.reduce((sum, order) => sum + order.product.price, 0).toFixed(2)}
          </div>
          <div className="stat-label">Ingresos Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {orders.filter(o => o.status === 'Completado').length}
          </div>
          <div className="stat-label">Completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {orders.filter(o => o.status === 'Pendiente').length}
          </div>
          <div className="stat-label">Pendientes</div>
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
                : 'No hay pedidos para mostrar en este filtro'
              }
            </p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>

      <div className="pagination">
        <button className="pagination-btn" disabled>
          ← Anterior
        </button>
        <span className="pagination-info">
          Página 1 de 1
        </span>
        <button className="pagination-btn" disabled>
          Siguiente →
        </button>
      </div>
    </main>
  );
};

export default OrderHistory;