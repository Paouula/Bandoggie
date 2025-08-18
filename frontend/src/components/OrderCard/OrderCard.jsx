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

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePrintOrder = () => {
    const printContent = generatePrintContent();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const generatePrintContent = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedido ${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin: 20px 0; }
          .label { font-weight: bold; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pedido #${order.id}</h1>
          <p>Estado: ${order.status}</p>
          <p>Fecha: ${formatDate(order.date)}</p>
        </div>
        
        <div class="section">
          <h3>Producto</h3>
          <p><span class="label">Nombre:</span> ${order.product.name}</p>
          <p><span class="label">Talla:</span> ${order.product.size}</p>
          <p><span class="label">Cantidad:</span> ${order.product.quantity}</p>
          <p><span class="label">Precio:</span> ${formatPrice(order.product.price)}</p>
        </div>
        
        <div class="info-grid">
          <div class="section">
            <h3>Información de Entrega</h3>
            <p><span class="label">Ciudad:</span> ${order.delivery.city}</p>
            <p><span class="label">Región:</span> ${order.delivery.region}</p>
            <p><span class="label">Dirección:</span> ${order.delivery.address}</p>
            <p><span class="label">Referencia:</span> ${order.delivery.reference}</p>
          </div>
          
          <div class="section">
            <h3>Información del Cliente</h3>
            <p><span class="label">Nombres:</span> ${order.customer.firstName}</p>
            <p><span class="label">Apellidos:</span> ${order.customer.lastName}</p>
            <p><span class="label">Teléfono:</span> ${order.customer.phone}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownloadPDF = () => {
    // Implementación básica de descarga como HTML
    // En un entorno real, usarías una librería como jsPDF
    const content = generatePrintContent();
    const blob = new Blob([content], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pedido-${order.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Validar que el objeto order tenga la estructura esperada
  if (!order || !order.product) {
    return (
      <div className="order-card">
        <div className="order-header">
          <div className="order-number">
            Pedido n°: {order?.id || 'N/A'}
          </div>
          <span className="order-status status-default">
            Error de datos
          </span>
        </div>
        <div className="no-orders">
          <p>Error: Datos del pedido incompletos</p>
        </div>
      </div>
    );
  }

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
              title={isExpanded ? "Contraer" : "Expandir"}
            >
              {isExpanded ? '⬆️' : '⬇️'}
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
              style={{ backgroundColor: order.product.color || '#87ceeb' }}
              title={`Color: ${order.product.color || 'Predeterminado'}`}
            ></div>
          </div>

          <div className="total-price">
            {formatPrice(order.product.price)}
          </div>
        </div>

        <div className="order-info">
          <div className="info-section delivery-info">
            <h3 className="info-title">
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
              <div className="info-item">
                <span className="info-label">Fecha:</span>
                <span className="info-value">{formatDate(order.date)}</span>
              </div>
            </div>
          </div>

          <div className="info-section customer-info">
            <h3 className="info-title">
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
          <h3 className="timeline-title">Seguimiento del Pedido</h3>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>Pedido Recibido</h5>
                <p>{formatDate(order.date)}</p>
              </div>
            </div>
            
            <div className={`timeline-item ${order.status !== 'Pendiente' ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>En Proceso</h5>
                <p>
                  {order.status !== 'Pendiente' 
                    ? 'Pedido confirmado y en preparación'
                    : 'Esperando confirmación de pago'
                  }
                </p>
              </div>
            </div>
            
            <div className={`timeline-item ${order.status === 'Enviado' || order.status === 'Completado' ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h5>Enviado</h5>
                <p>
                  {order.status === 'Enviado' || order.status === 'Completado'
                    ? 'Pedido en camino'
                    : 'Pendiente de envío'
                  }
                </p>
              </div>
            </div>
            
            <div className={`timeline-item ${order.status === 'Completado' ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
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