// src/components/OrderCard/OrderCard.jsx
import React, { useState } from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completado':
        return 'status-completed';
      case 'pendiente':
        return 'status-pending';
      case 'enviado':
        return 'status-shipped';
      case 'cancelado':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Implementar descarga de PDF
    console.log('Descargar PDF del pedido:', order.id);
  };

  return (
    <div className={`order-card ${isExpanded ? 'order-card-expanded' : ''}`}>
      <div className="order-header">
        <div className="order-number">
          Pedido n°: {order.id}
        </div>
        <div className="order-actions">
          <span className={`order-status ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
          <div className="action-buttons">
            <button 
              className="btn-icon"
              onClick={handleToggleExpand}
              title={isExpanded ? 'Contraer' : 'Expandir'}
            >
              {isExpanded ? '▲' : '▼'}
            </button>
            <button 
              className="btn-icon"
              onClick={handlePrintOrder}
              title="Imprimir"
            >
              🖨️
            </button>
            <button 
              className="btn-icon"
              onClick={handleDownloadPDF}
              title="Descargar PDF"
            >
              📄
            </button>
          </div>
        </div>
      </div>

      <div className="order-content">
        <div className="product-section">
          <div className="product-image-container">
            <img 
              src={order.product.image} 
              alt={order.product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjY3ZWVhIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNzY0YmEyIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIHJ4PSIxNSIgZmlsbD0idXJsKCNncmFkKSIvPjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+🐕</3RleHQ+PC9zdmc+';
              }}
            />
            <div className="product-badge">
              {order.product.quantity}x
            </div>
          </div>
          
          <h3 className="product-title">{order.product.name}</h3>
          
          <div className="product-details">
            <div className="detail-item">
              <span className="detail-label">Talla:</span>
              <span className="detail-value">{order.product.size}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Cantidad:</span>
              <span className="detail-value">{order.product.quantity}</span>
            </div>
          </div>

          <div className="color-section">
            <p className="color-label">Color:</p>
            <div 
              className="color-indicator"
              style={{ backgroundColor: order.product.color }}
              title={`Color: ${order.product.color}`}
            ></div>
          </div>

          <div className="total-price">
            {formatPrice(order.product.price)}
          </div>
        </div>

        <div className="order-info">
          <div className="info-section delivery-info">
            <h3 className="info-title">
              <span className="info-icon">📍</span>
              Información de Entrega
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Ciudad:</span>
                <span className="info-value">{order.delivery.city}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Región:</span>
                <span className="info-value">{order.delivery.region}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Dirección:</span>
                <span className="info-value">{order.delivery.address}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Referencia:</span>
                <span className="info-value">{order.delivery.reference}</span>
              </div>
            </div>
          </div>

          <div className="info-section customer-info">
            <h3 className="info-title">
              <span className="info-icon">👤</span>
              Información del Cliente
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Nombres:</span>
                <span className="info-value">{order.customer.firstName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Apellidos:</span>
                <span className="info-value">{order.customer.lastName}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Teléfono:</span>
                <span className="info-value">
                  <a href={`tel:${order.customer.phone}`}>
                    {order.customer.phone}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="order-timeline">
          <h4 className="timeline-title">Estado del Pedido</h4>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>Pedido Confirmado</h5>
                <p>25 de Enero, 10:30 AM</p>
              </div>
            </div>
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>En Producción</h5>
                <p>26 de Enero, 2:15 PM</p>
              </div>
            </div>
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>Enviado</h5>
                <p>28 de Enero, 9:00 AM</p>
              </div>
            </div>
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>Entregado</h5>
                <p>30 de Enero, 3:45 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;