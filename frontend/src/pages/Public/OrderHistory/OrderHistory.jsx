import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useOrderInfo from '../../../hooks/OrderHistory/useOrders';
import OrderCard from '../../../components/OrderCard/OrderCard';
import './OrderHistory.css';

const OrderHistory = () => {
  const { user } = useAuth();
  const { orders, loading, error, fetchOrders, clearError } = useOrderInfo();
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 EFECTO PARA CARGAR ÓRDENES Y ESCUCHAR EVENTOS
  useEffect(() => {
    console.log('📦 OrderHistory montado, cargando órdenes...');
    fetchOrders();
    
    // Escuchar evento cuando se crea una nueva orden
    const handleOrderCreated = () => {
      console.log('🔔 Evento orderCreated detectado, recargando...');
      setTimeout(() => {
        fetchOrders();
      }, 1500);
    };
    
    window.addEventListener('orderCreated', handleOrderCreated);
    
    return () => {
      window.removeEventListener('orderCreated', handleOrderCreated);
    };
  }, [fetchOrders]);

  // 🐛 EFECTO PARA DEBUG
  useEffect(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 DEBUG - OrderHistory State');
    console.log('👤 Usuario actual:', user);
    console.log('📧 Email del usuario:', user?.email);
    console.log('📦 Total órdenes cargadas:', orders.length);
    
    if (orders.length > 0) {
      console.log('📋 Estructura de primera orden:', {
        _id: orders[0]._id,
        idCart: orders[0].idCart,
        customerEmail: orders[0].customerEmail,
        customerName: orders[0].customerName,
        PaymentMethod: orders[0].PaymentMethod
      });
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }, [orders, user]);

  // 🔘 FUNCIÓN PARA MANEJAR CLICK EN CARD
  const handleCardClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // 🔍 FILTRAR ÓRDENES DEL USUARIO ACTUAL (POR EMAIL)
  const userOrders = orders.filter(order => {
    // Verificar que el usuario esté autenticado y tenga email
    if (!user || !user.email) {
      console.log('⚠️ No hay usuario autenticado o sin email');
      return false;
    }
    
    // Opción 1: Comparar con customerEmail (datos de la orden)
    const customerEmail = order.customerEmail?.toLowerCase();
    const userEmail = user.email.toLowerCase();
    
    if (customerEmail === userEmail) {
      console.log('✅ Match por customerEmail:', customerEmail);
      return true;
    }
    
    // Opción 2: Comparar con email del cliente en idCart
    if (order.idCart && typeof order.idCart === 'object') {
      const client = order.idCart.idClient;
      if (typeof client === 'object' && client !== null) {
        const clientEmail = client.email?.toLowerCase();
        if (clientEmail === userEmail) {
          console.log('✅ Match por idCart.idClient.email:', clientEmail);
          return true;
        }
      }
    }
    
    return false;
  });

  console.log('📊 Órdenes filtradas para el usuario:', userOrders.length);

  // 🔍 APLICAR BÚSQUEDA SOBRE LAS ÓRDENES DEL USUARIO
  const filteredOrders = userOrders.filter(order => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    
    // Buscar en diferentes campos
    const orderId = order._id?.toLowerCase() || '';
    const address = order.addressClient?.toLowerCase() || '';
    const payment = order.PaymentMethod?.toLowerCase() || '';
    const customerName = order.customerName?.toLowerCase() || '';
    
    // Buscar en productos del carrito si está poblado
    let productsMatch = false;
    if (order.idCart && typeof order.idCart === 'object') {
      const products = order.idCart.products || [];
      productsMatch = products.some(p => {
        const productName = p.idProduct?.name?.toLowerCase() || '';
        return productName.includes(search);
      });
    }
    
    return orderId.includes(search) || 
           address.includes(search) || 
           payment.includes(search) ||
           customerName.includes(search) ||
           productsMatch;
  });

  // 🧹 FUNCIÓN PARA LIMPIAR BÚSQUEDA
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // 🔒 VERIFICAR AUTENTICACIÓN (OPCIONAL - puedes quitarlo si quieres que todos vean todas las órdenes)
  if (!user) {
    return (
      <main className="main-container">
        <div className="no-orders">
          <div className="no-orders-icon">🔒</div>
          <h3>Acceso Restringido</h3>
          <p>Por favor, inicia sesión para ver el historial de pedidos</p>
          <button 
            onClick={() => window.location.href = '/mainPage'} 
            className="retry-btn"
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Ir al Inicio
          </button>
        </div>
      </main>
    );
  }

  // ⏳ ESTADO DE CARGA
  if (loading && orders.length === 0) {
    return (
      <main className="main-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p style={{ color: '#333', marginTop: '1rem' }}>
            Cargando historial de pedidos...
          </p>
        </div>
      </main>
    );
  }

  // ⚠️ ESTADO DE ERROR
  if (error && orders.length === 0) {
    return (
      <main className="main-container">
        <div className="no-orders">
          <div className="no-orders-icon">⚠️</div>
          <h3>Error al cargar pedidos</h3>
          <p>{error}</p>
          <button 
            onClick={() => { 
              clearError(); 
              fetchOrders(); 
            }} 
            className="retry-btn"
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  // 📊 Calcular estadísticas solo para órdenes del usuario
  const totalOrders = userOrders.length;
  const pendingOrders = userOrders.filter(o => o.idCart?.status === 'Pending').length;
  const paidOrders = userOrders.filter(o => o.idCart?.status === 'Paid').length;
  const transferenciaOrders = userOrders.filter(o => o.PaymentMethod?.toLowerCase() === 'transferencia').length;
  const efectivoOrders = userOrders.filter(o => o.PaymentMethod?.toLowerCase() === 'efectivo').length;

  // 🎨 RENDER PRINCIPAL
  return (
    <main className="main-container">
      {/* Header con estadísticas */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Historial de Pedidos</h1>
          <p className="page-subtitle">
            {totalOrders === 0 
              ? 'No hay pedidos aún'
              : `Total de pedidos: ${totalOrders}`
            }
          </p>
        </div>
        
        {/* Botón de recarga manual */}
        <button
          onClick={() => {
            console.log('🔄 Recarga manual iniciada');
            clearError();
            fetchOrders();
          }}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          🔄 Actualizar
        </button>
      </div>

      {/* Estadísticas en cards */}
      {totalOrders > 0 && (
        <div className="orders-stats">
          <div className="stat-card">
            <div className="stat-number">{totalOrders}</div>
            <div className="stat-label">Total Pedidos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{pendingOrders}</div>
            <div className="stat-label">Pendientes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{paidOrders}</div>
            <div className="stat-label">Pagados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{transferenciaOrders}</div>
            <div className="stat-label">Transferencia</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{efectivoOrders}</div>
            <div className="stat-label">Efectivo</div>
          </div>
        </div>
      )}

      {/* Barra de búsqueda */}
      {totalOrders > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            position: 'relative', 
            maxWidth: '600px', 
            margin: '0 auto'
          }}>
            <input
              type="text"
              placeholder="Buscar por ID, nombre, dirección o producto..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1rem',
                border: '2px solid #e1e1e1',
                borderRadius: '25px',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                title="Limpiar búsqueda"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#dc3545',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            )}
            <div style={{
              position: 'absolute',
              right: searchTerm ? '50px' : '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              pointerEvents: 'none'
            }}>
              🔍
            </div>
          </div>
          {searchTerm && (
            <p style={{ 
              textAlign: 'center', 
              marginTop: '0.75rem',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Mostrando {filteredOrders.length} de {userOrders.length} pedidos
            </p>
          )}
        </div>
      )}

      {/* Lista de órdenes */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h3>No se encontraron pedidos</h3>
            <p>
              {searchTerm 
                ? `No hay pedidos que coincidan con "${searchTerm}"`
                : totalOrders === 0
                  ? 'No tienes pedidos registrados aún'
                  : 'No se encontraron pedidos'
              }
            </p>
            {searchTerm && (
              <button 
                onClick={handleClearSearch} 
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Renderizar las cards */}
            {filteredOrders.map(order => (
              <OrderCard 
                key={order._id} 
                order={order}
                onClick={() => handleCardClick(order._id)}
                isExpanded={expandedOrderId === order._id}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default OrderHistory;