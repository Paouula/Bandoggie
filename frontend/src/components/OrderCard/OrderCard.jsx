// src/components/OrderCard/OrderCard.jsx
import React, { useState } from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-SV', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Validar que el objeto order tenga la estructura esperada
  if (!order || !order.product) {
    return (
      <div className="order-card-professional">
        <div className="order-header-professional">
          <h1 className="main-title">Historial Pedidos</h1>
          <p className="order-id">Pedido n°: {order?.id || 'N/A'}</p>
        </div>
        <div className="error-message">
          <p>Error: Datos del pedido incompletos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-card-professional">
      {/* Header con título y número de pedido */}
      <div className="order-header-professional">
        <p className="order-id">Pedido n°: {order.id}</p>
      </div>

      {/* Contenido principal */}
      <div className="order-main-content">
        
        {/* Columna 1: Producto */}
        <div className="product-column">
          <div className="product-image-container">
            <img 
              src={order.product.image} 
              alt={order.product.name}
              className="product-image-pro"
              onError={(e) => {
                e.target.src = '/api/placeholder/150/150';
              }}
            />
          </div>
          <h3 className="product-name">{order.product.name}</h3>
        </div>

        {/* Columna 2: Información del Pedido */}
        <div className="order-details-column">
          <h3 className="column-title">Información del Pedido</h3>
          
          <div className="details-container">
            <div className="detail-line">
              <span className="label">Nombre de la mascota</span>
              <div className="underline">
                <span className="value">{order.pet?.name || 'Fido'}</span>
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-line half-width">
                <span className="label">Talla</span>
                <div className="underline">
                  <span className="value">{order.product.size}</span>
                </div>
              </div>
              <div className="detail-line half-width">
                <span className="label">Cantidad</span>
                <div className="underline">
                  <span className="value">{order.product.quantity}</span>
                </div>
              </div>
            </div>

            <div className="color-section-pro">
              <span className="label">Color</span>
              <div className="color-indicator-pro">
                <div 
                  className="color-circle-pro"
                  style={{ backgroundColor: order.product.color || '#87CEEB' }}
                ></div>
              </div>
            </div>

            <div className="price-section">
              <span className="label">Precio Total</span>
              <div className="underline">
                <span className="value price-value">{formatPrice(order.product.price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna 3: Información de Entrega y Cliente */}
        <div className="delivery-customer-column">
          
          {/* Información básica */}
          <div className="basic-info-grid">
            <div className="info-item">
              <span className="info-label">Talla</span>
              <span className="info-value">{order.product.size}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Región</span>
              <span className="info-value">{order.delivery.region}</span>
            </div>
          </div>

          {/* Dirección de entrega */}
          <div className="address-group">
            <div className="address-field">
              <span className="field-label">Dirección de Entrega</span>
              <div className="field-box">
                {order.delivery.address}
              </div>
            </div>
            
            <div className="address-field">
              <span className="field-label">Punto de Referencia</span>
              <div className="field-box">
                {order.delivery.reference}
              </div>
            </div>
          </div>

          {/* Información del cliente */}
          <div className="client-info-section">
            <div className="client-name-grid">
              <div className="name-field">
                <span className="field-label">Nombres</span>
                <span className="field-value">{order.customer.firstName}</span>
              </div>
              <div className="name-field">
                <span className="field-label">Apellidos</span>
                <span className="field-value">{order.customer.lastName}</span>
              </div>
            </div>
            
            <div className="contact-field">
              <span className="field-label">Teléfono de contacto</span>
              <span className="field-value contact-value">{order.customer.phone}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Timeline expandible (opcional) */}
      {isExpanded && (
        <div className="order-timeline-pro">
          <h3 className="timeline-title-pro">Seguimiento del Pedido</h3>
          <div className="timeline-pro">
            <div className="timeline-step completed">
              <div className="step-marker"></div>
              <div className="step-content">
                <h5>Pedido Recibido</h5>
                <p>{formatDate(order.date)}</p>
              </div>
            </div>
            
            <div className={`timeline-step ${order.status !== 'Pendiente' ? 'completed' : ''}`}>
              <div className="step-marker"></div>
              <div className="step-content">
                <h5>En Proceso</h5>
                <p>
                  {order.status !== 'Pendiente' 
                    ? 'Pedido confirmado y en preparación'
                    : 'Esperando confirmación'
                  }
                </p>
              </div>
            </div>
            
            <div className={`timeline-step ${order.status === 'Enviado' || order.status === 'Completado' ? 'completed' : ''}`}>
              <div className="step-marker"></div>
              <div className="step-content">
                <h5>Enviado</h5>
                <p>
                  {order.status === 'Enviado' || order.status === 'Completado'
                    ? 'Pedido en camino'
                    : 'Pendiente de envío'
                  }
                </p>
              </div>
            </div>
            
            <div className={`timeline-step ${order.status === 'Completado' ? 'completed' : ''}`}>
              <div className="step-marker"></div>
              <div className="step-content">
                <h5>Entregado</h5>
                <p>
                  {order.status === 'Completado'
                    ? 'Pedido entregado exitosamente'
                    : 'Pendiente de entrega'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;