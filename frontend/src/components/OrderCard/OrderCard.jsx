import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order, onClick, isExpanded }) => {
  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$${numPrice.toFixed(2)}`;
  };

  // Extraer datos del carrito
  const cart = typeof order.idCart === 'object' ? order.idCart : null;
  const client = cart?.idClient || {};
  const products = cart?.products || [];
  const total = cart?.total || 0;
  const cartStatus = cart?.status || 'N/A';

  // Extraer primer producto
  const firstProduct = products[0] || {};
  const productData = typeof firstProduct.idProduct === 'object' 
    ? firstProduct.idProduct 
    : {};
  
  const productName = productData.name || 'Producto';
  const productImage = productData.image || productData.images?.[0] || 
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop';

  // Información del pedido
  const addressParts = order.addressClient?.split(',') || [];
  const mainAddress = addressParts.slice(0, 2).join(', ').trim() || 'Sin dirección';
  const reference = addressParts.slice(2).join(', ').trim() || 'Sin referencia';

  // Información del cliente
  const firstName = client.firstName || client.names || 'Cliente';
  const lastName = client.lastName || client.surnames || '';
  const phone = client.phone || client.phoneNumber || 'No disponible';
  const email = client.email || 'No disponible';

  // Información del producto
  const quantity = firstProduct.quantity || 1;
  const size = firstProduct.talla || 'N/A';
  const color = productData.color || '#87CEEB';

  // Método de pago
  const paymentMethodDisplay = order.paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia';

  // Fecha de la orden
  const orderDate = order.createdAt 
    ? new Date(order.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Fecha no disponible';

  return (
    <div 
      className={`order-card-compact ${isExpanded ? 'expanded' : ''}`}
      onClick={onClick}
    >
      <div className="card-header-compact">
        <span className="order-id-compact">
          Pedido N°: {order._id?.slice(-6).toUpperCase() || 'N/A'}
        </span>
        {!isExpanded && (
          <span className="price-preview">{formatPrice(total)}</span>
        )}
      </div>

      {!isExpanded ? (
        <div className="card-content-compact">
          <div className="product-preview">
            <img 
              src={productImage}
              alt={productName}
              className="product-img-small"
            />
            <div>
              <h4 className="product-name-small">{productName}</h4>
              <p style={{ 
                fontSize: '0.85rem', 
                color: '#666', 
                marginTop: '0.25rem' 
              }}>
                {orderDate}
              </p>
            </div>
          </div>

          <div className="info-grid-compact">
            <div className="info-section-compact">
              <h5 className="section-title-compact">Información del Pedido</h5>
              <div className="info-row-compact">
                <span className="label-compact">Productos</span>
                <span className="value-compact">{products.length} artículo(s)</span>
              </div>
              <div className="info-row-split">
                <div className="info-col-compact">
                  <span className="label-compact">Talla</span>
                  <span className="value-compact">{size}</span>
                </div>
                <div className="info-col-compact">
                  <span className="label-compact">Cantidad</span>
                  <span className="value-compact">{quantity}</span>
                </div>
              </div>
              <div className="info-row-compact">
                <span className="label-compact">Estado</span>
                <span className="value-compact" style={{
                  color: cartStatus === 'Paid' ? '#059669' : '#f59e0b'
                }}>
                  {cartStatus === 'Paid' ? 'Pagado' : 'Pendiente'}
                </span>
              </div>
            </div>

            <div className="info-section-compact">
              <h5 className="section-title-compact">Tu información</h5>
              <div className="info-row-split">
                <div className="info-col-compact">
                  <span className="label-compact">Nombres</span>
                  <span className="value-compact">{firstName}</span>
                </div>
                <div className="info-col-compact">
                  <span className="label-compact">Apellidos</span>
                  <span className="value-compact">{lastName}</span>
                </div>
              </div>
              <div className="info-row-compact">
                <span className="label-compact">Dirección de Entrega</span>
                <span className="value-compact">{mainAddress}</span>
              </div>
            </div>

            <div className="price-box-compact">
              <span className="price-label-compact">Precio Total</span>
              <span className="price-value-compact">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-content-expanded">
          <div className="product-section-expanded">
            <img 
              src={productImage}
              alt={productName}
              className="product-img-expanded"
            />
            <div>
              <h4 className="product-name-expanded">{productName}</h4>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#666', 
                marginTop: '0.5rem' 
              }}>
                Fecha del pedido: {orderDate}
              </p>
            </div>
          </div>

          <div className="info-detailed-grid">
            <div className="info-column-expanded">
              <h5 className="column-title-expanded">Información del Pedido</h5>
              
              <div className="field-group">
                <span className="field-label-expanded">Total de Productos</span>
                <div className="field-value-box">
                  {products.length} artículo(s)
                </div>
              </div>

              <div className="field-row-split">
                <div className="field-group">
                  <span className="field-label-expanded">Talla</span>
                  <div className="field-value-box">{size}</div>
                </div>
                <div className="field-group">
                  <span className="field-label-expanded">Cantidad</span>
                  <div className="field-value-box">{quantity}</div>
                </div>
              </div>

              <div className="field-group">
                <span className="field-label-expanded">Estado del Carrito</span>
                <div className="field-value-box" style={{
                  backgroundColor: cartStatus === 'Paid' ? '#dcfce7' : '#fef3c7',
                  color: cartStatus === 'Paid' ? '#15803d' : '#92400e',
                  fontWeight: '600'
                }}>
                  {cartStatus === 'Paid' ? 'Pagado' : 'Pendiente'}
                </div>
              </div>

              <div className="field-group color-field">
                <div style={{ flex: 1 }}>
                  <span className="field-label-expanded">Color</span>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginTop: '0.5rem'
                  }}>
                    <div 
                      className="color-circle-expanded"
                      style={{ backgroundColor: color }}
                    />
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      textTransform: 'uppercase'
                    }}>
                      {color}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-column-expanded">
              <h5 className="column-title-expanded">Tu información</h5>

              <div className="field-group">
                <span className="field-label-expanded">Dirección de Entrega</span>
                <div className="field-value-box">{mainAddress}</div>
              </div>

              <div className="field-group">
                <span className="field-label-expanded">Punto de Referencia</span>
                <div className="field-value-box">{reference}</div>
              </div>

              <div className="field-row-split">
                <div className="field-group">
                  <span className="field-label-expanded">Nombres</span>
                  <div className="field-value-box">{firstName}</div>
                </div>
                <div className="field-group">
                  <span className="field-label-expanded">Apellidos</span>
                  <div className="field-value-box">{lastName}</div>
                </div>
              </div>

              <div className="field-group">
                <span className="field-label-expanded">Teléfono de contacto</span>
                <div className="field-value-box phone">{phone}</div>
              </div>

              <div className="field-group">
                <span className="field-label-expanded">Email</span>
                <div className="field-value-box">{email}</div>
              </div>

              <div className="field-group">
                <span className="field-label-expanded">Método de Pago</span>
                <div className="field-value-box">
                  {paymentMethodDisplay}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de todos los productos */}
          {products.length > 1 && (
            <div style={{ marginBottom: '2rem' }}>
              <h5 style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid #e5e7eb'
              }}>
                Productos en este pedido
              </h5>
              <div style={{ 
                display: 'grid', 
                gap: '1rem' 
              }}>
                {products.map((prod, index) => {
                  const prodData = typeof prod.idProduct === 'object' 
                    ? prod.idProduct 
                    : {};
                  return (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <img 
                        src={prodData.image || prodData.images?.[0] || productImage}
                        alt={prodData.name || 'Producto'}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: '600', 
                          color: '#374151',
                          marginBottom: '0.25rem'
                        }}>
                          {prodData.name || 'Producto'}
                        </div>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280'
                        }}>
                          Talla: {prod.talla || 'N/A'} | Cantidad: {prod.quantity || 1}
                        </div>
                      </div>
                      <div style={{ 
                        fontWeight: '700', 
                        color: '#059669',
                        fontSize: '1rem'
                      }}>
                        {formatPrice(prod.subtotal || 0)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="price-box-expanded">
            <div>
              <div className="price-label-expanded">Estado</div>
              <div className="price-secondary" style={{
                color: cartStatus === 'Paid' ? '#15803d' : '#d97706'
              }}>
                {cartStatus === 'Paid' ? 'Pagado' : 'Pendiente'}
              </div>
            </div>
            <div>
              <div className="price-label-expanded">Precio Total</div>
              <div className="price-value-expanded">{formatPrice(total)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;