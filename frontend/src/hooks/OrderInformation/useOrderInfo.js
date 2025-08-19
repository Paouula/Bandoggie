// src/hooks/OrderInformation/useOrderInfo.js
import { useState, useCallback } from 'react';

const useOrderInfo = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos mock para simular la respuesta de la API
  const mockOrderData = {
    '2025024': {
      id: '2025024',
      date: '2025-01-15T10:30:00Z',
      status: 'Completado',
      product: {
        id: 'prod-001',
        name: 'Bandanas celeste con diseño',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop&crop=center',
        size: 'XL',
        quantity: 3,
        color: '#87CEEB',
        price: 19.99
      },
      pet: {
        name: 'Fido'
      },
      delivery: {
        region: 'Mejicanos',
        address: 'Calle 12, avenida 14',
        reference: 'Hospital Zacamil'
      },
      customer: {
        firstName: 'María',
        lastName: 'Rosales',
        phone: '76964567',
        email: 'maria.rosales@example.com'
      }
    },
    '2025025': {
      id: '2025025',
      date: '2025-01-16T14:20:00Z',
      status: 'Enviado',
      product: {
        id: 'prod-002',
        name: 'Collar ajustable premium',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop&crop=center',
        size: 'M',
        quantity: 1,
        color: '#FF6B6B',
        price: 24.99
      },
      pet: {
        name: 'Luna'
      },
      delivery: {
        region: 'San Salvador',
        address: 'Colonia Escalón, Pasaje 3, Casa #15',
        reference: 'Frente al Parque Central'
      },
      customer: {
        firstName: 'Carlos',
        lastName: 'Mendoza',
        phone: '72345678',
        email: 'carlos.mendoza@example.com'
      }
    },
    '2025026': {
      id: '2025026',
      date: '2025-01-17T09:15:00Z',
      status: 'Pendiente',
      product: {
        id: 'prod-003',
        name: 'Arnés deportivo reflectante',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop&crop=center',
        size: 'L',
        quantity: 2,
        color: '#4ECDC4',
        price: 35.00
      },
      pet: {
        name: 'Max'
      },
      delivery: {
        region: 'Soyapango',
        address: 'Reparto San José, Block B, Casa 24',
        reference: 'Cerca del mercado municipal'
      },
      customer: {
        firstName: 'Ana',
        lastName: 'García',
        phone: '78901234',
        email: 'ana.garcia@example.com'
      }
    }
  };

  // Simular llamada a API para obtener información del pedido
  const fetchOrder = useCallback(async (orderId) => {
    if (!orderId) {
      setError('ID de pedido requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Buscar el pedido en los datos mock
      const orderData = mockOrderData[orderId.toString()];

      if (!orderData) {
        throw new Error(`No se encontró el pedido con ID: ${orderId}`);
      }

      setOrder(orderData);
      return orderData;

    } catch (err) {
      const errorMessage = err.message || 'Error al buscar el pedido';
      setError(errorMessage);
      setOrder(null);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Limpiar pedido
  const clearOrder = useCallback(() => {
    setOrder(null);
  }, []);

  // Función para verificar si un pedido existe
  const checkOrderExists = useCallback(async (orderId) => {
    try {
      const orderData = mockOrderData[orderId.toString()];
      return !!orderData;
    } catch {
      return false;
    }
  }, []);

  // Obtener estadísticas del pedido
  const getOrderStats = useCallback((orderData) => {
    if (!orderData) return null;

    return {
      totalItems: orderData.product.quantity,
      totalPrice: orderData.product.price * orderData.product.quantity,
      estimatedDelivery: orderData.status === 'Completado' 
        ? 'Entregado' 
        : orderData.status === 'Enviado' 
          ? '2-3 días hábiles' 
          : 'Pendiente de procesamiento',
      canTrack: orderData.status !== 'Pendiente'
    };
  }, []);

  return {
    // Estado
    order,
    loading,
    error,
    
    // Acciones
    fetchOrder,
    clearError,
    clearOrder,
    checkOrderExists,
    getOrderStats
  };
};

export default useOrderInfo;