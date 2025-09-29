// src/pages/Public/OrderHistory/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderInfo from '../../../hooks/OrderHistory/useOrderInfo.js';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orders, loading, error, fetchOrders, clearError } = useOrderInfo();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    
    const status = order.paymentMethod?.toLowerCase() === 'efectivo' ? 'pendiente' : 'completado';
    return status === filter;
  });

  const handleOrderClick = (order) => {
    navigate('/order-detail', { state: { order } });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (paymentMethod) => {
    const isCompleted = paymentMethod?.toLowerCase() === 'transferencia';
    return {
      text: isCompleted ? 'Completado' : 'Pendiente',
      className: isCompleted ? 'status-completed' : 'status-pending'
    };
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
          <div className="no-orders-icon">!</div>
          <h3>Error al cargar pedidos</h3>
          <p>{error}</p>
          <button onClick={() => { clearError(); fetchOrders(); }} className="retry-btn">
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container">
      <div className="page-header">
        <h1 className="page-title">Tus Pedidos</h1>
      </div>

      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-tab ${filter === 'completado' ? 'active' : ''}`}
            onClick={() => setFilter('completado')}
          >
            Completados
          </button>
          <button 
            className={`filter-tab ${filter === 'pendiente' ? 'active' : ''}`}
            onClick={() => setFilter('pendiente')}
          >
            Pendientes
          </button>
        </div>
      </div>

      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">[ ]</div>
            <h3>No se encontraron pedidos</h3>
            <p>
              {filter === 'all' 
                ? 'No tienes pedidos registrados aún'
                : `No hay pedidos con estado "${filter}"`
              }
            </p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const status = getStatusBadge(order.paymentMethod);
            return (
              <div 
                key={order._id} 
                className="order-card"
                onClick={() => handleOrderClick(order)}
              >
                <div className="order-header">
                  <span className="order-number">
                    Pedido n°: {order._id?.slice(-6).toUpperCase()}
                  </span>
                  <span className={`status-badge ${status.className}`}>
                    {status.text}
                  </span>
                </div>

                <div className="order-content">
                  <div className="order-info">
                    <div className="info-item">
                      <span className="info-label">Fecha:</span>
                      <span className="info-value">
                        {formatDate(order.createdAt || order.dateOrders)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">
                        {order.addressClient || 'No especificada'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Método de pago:</span>
                      <span className="info-value">
                        {order.paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia'}
                      </span>
                    </div>
                  </div>

                  <div className="order-total">
                    <span className="total-label">Precio Total</span>
                    <span className="total-amount">
                      ${order.total ? parseFloat(order.total).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default OrderHistory;