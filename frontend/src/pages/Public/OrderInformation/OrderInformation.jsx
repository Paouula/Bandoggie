// OrderInformation.jsx
import React from 'react';
import './OrderInformation.css';

const OrderInformation = ({ order }) => {
  // Datos por defecto que coinciden exactamente con tu imagen
  const defaultOrder = {
    id: "2025024",
    product: {
      name: "Bandanas celeste con diseño",
      //image: "",
      size: "XL",
      quantity: 3,
      color: "#87CEEB",
      price: 19.99
    },
    pet: {
      name: "Fido"
    },
    delivery: {
      region: "Mejicanos",
      address: "Calle 12, avenida 14",
      reference: "Hospital Zacamil"
    },
    customer: {
      firstName: "María",
      lastName: "Rosales",
      phone: "78964567"
    }
  };

  // Usar los datos proporcionados o los por defecto
  const orderData = order || defaultOrder;

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$ ${numPrice?.toFixed(2) || '0.00'}`;
  };

  // Validar que el objeto order tenga la estructura esperada
  if (!orderData || !orderData.product) {
    return (
      <div className="order-info-card">
        <div className="card-header">
          <h1 className="title">Tus Pedidos</h1>
          <p className="order-id">Pedido n°: {orderData?.id || 'N/A'}</p>
        </div>
        <div className="error-content">
          <p>Error: Datos del pedido incompletos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-info-card">
      {/* Header */}
      <div className="card-header">
        <h1 className="title">Tus Pedidos</h1>
        <p className="order-id">Pedido n°: {orderData.id}</p>
      </div>

      {/* Content */}
      <div className="card-content">
        
        {/* Left: Product Image and Name */}
        <div className="product-section">
          <div className="product-image-wrapper">
            <img 
              src={orderData.product.image} 
              alt={orderData.product.name}
              className="product-img"
              onError={(e) => {
                e.target.src = '/api/placeholder/120/120';
              }}
            />
          </div>
          <p className="product-title">{orderData.product.name}</p>
        </div>

        {/* Center: Order Information */}
        <div className="order-info-section">
          <h2 className="section-heading">Información del Pedido</h2>
          
          <div className="info-grid">
            {/* Pet Name */}
            <div className="info-row full-width">
              <label className="info-label">Nombre de la mascota</label>
              <div className="underlined-field">
                <span className="field-text">{orderData.pet?.name || 'Fido'}</span>
              </div>
            </div>

            {/* Size and Quantity Row */}
            <div className="info-row-split">
              <div className="info-item">
                <label className="info-label">Talla</label>
                <div className="underlined-field">
                  <span className="field-text">{orderData.product.size}</span>
                </div>
              </div>
              <div className="info-item">
                <label className="info-label">Cantidad</label>
                <div className="underlined-field">
                  <span className="field-text">{orderData.product.quantity}</span>
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="color-row">
              <label className="info-label">Color</label>
              <div className="color-container">
                <div 
                  className="color-dot"
                  style={{ backgroundColor: orderData.product.color || '#87CEEB' }}
                ></div>
              </div>
            </div>

            {/* Total Price */}
            <div className="info-row">
              <label className="info-label">Precio Total</label>
              <div className="underlined-field">
                <span className="field-text price-text">{formatPrice(orderData.product.price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Your Information */}
        <div className="customer-section">
          <h2 className="section-heading">Tu Información</h2>
          
          {/* Basic Info Row */}
          <div className="basic-row">
            <div className="basic-item">
              <label className="basic-label">Talla</label>
              <span className="basic-value">{orderData.product.size}</span>
            </div>
            <div className="basic-item">
              <label className="basic-label">Región</label>
              <span className="basic-value">{orderData.delivery.region}</span>
            </div>
          </div>

          {/* Address Fields */}
          <div className="address-group">
            <div className="address-item">
              <label className="address-label">Dirección de Entrega</label>
              <div className="address-field">
                {orderData.delivery.address}
              </div>
            </div>
            
            <div className="address-item">
              <label className="address-label">Punto de Referencia</label>
              <div className="address-field">
                {orderData.delivery.reference}
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="personal-group">
            <div className="name-row">
              <div className="name-item">
                <label className="personal-label">Nombres</label>
                <span className="personal-text">{orderData.customer.firstName}</span>
              </div>
              <div className="name-item">
                <label className="personal-label">Apellidos</label>
                <span className="personal-text">{orderData.customer.lastName}</span>
              </div>
            </div>
            
            <div className="contact-item">
              <label className="personal-label">Teléfono de contacto</label>
              <span className="personal-text phone-text">{orderData.customer.phone}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderInformation;