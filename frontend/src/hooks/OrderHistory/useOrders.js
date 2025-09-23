// src/hooks/Orders/useOrders.js
import { useState, useCallback } from 'react';
import { API_FETCH_JSON } from '../../config';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para mapear datos del backend al formato del frontend
  const mapOrderData = useCallback((backendOrder) => {
    console.log('Datos originales del backend:', backendOrder); // Para debug
    
    // Trabajar solo con los datos que están disponibles en el modelo actual
    const productsList = backendOrder.listProducts || [];
    const firstProduct = productsList[0] || 'Producto sin nombre';
    
    // Extraer información de la dirección
    const addressParts = backendOrder.addressClient ? backendOrder.addressClient.split(',') : [];
    const mainAddress = addressParts[0]?.trim() || backendOrder.addressClient || '';
    const reference = addressParts.slice(1).join(',').trim() || 'Sin referencia';

    // Determinar estado basado en el método de pago (usando el campo del modelo actual)
    const getStatus = () => {
      if (backendOrder.paymentMethod === 'efectivo') return 'Pendiente';
      if (backendOrder.paymentMethod === 'transferencia') return 'Enviado';
      return 'Pendiente';
    };

    return {
      id: backendOrder._id,
      status: getStatus(),
      date: backendOrder.dateOrders || backendOrder.createdAt,
      paymentMethod: backendOrder.paymentMethod,
      product: {
        name: firstProduct,
        image: '', // No disponible sin populate
        size: 'N/A', // No disponible en estructura actual
        quantity: productsList.length || 1,
        color: '#87ceeb', // Color por defecto
        price: backendOrder.total || 0
      },
      delivery: {
        city: 'Ciudad', // Extraer de addressClient si es posible
        region: 'Región',
        address: mainAddress,
        reference: reference
      },
      customer: {
        firstName: 'Cliente', // No disponible sin populate
        lastName: '',
        phone: 'No disponible',
        email: ''
      },
      // Datos adicionales de la estructura real
      subtotal: backendOrder.subTotal || 0,
      total: backendOrder.total || 0,
      products: productsList,
      _original: backendOrder
    };
  }, []);

  // Obtener todas las órdenes
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API_FETCH_JSON('orders');
      const ordersArray = Array.isArray(response) ? response : [];
      const mappedOrders = ordersArray.map(mapOrderData);
      
      setOrders(mappedOrders);
      return mappedOrders;
      
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      setOrders([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mapOrderData]);

  // Obtener orden por ID
  const fetchOrderById = useCallback(async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API_FETCH_JSON(`orders/${orderId}`);
      const mappedOrder = mapOrderData(response);
      
      return mappedOrder;
      
    } catch (err) {
      console.error('Error fetching order by ID:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mapOrderData]);

  // Crear nueva orden
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API_FETCH_JSON('orders', {
        method: 'POST',
        body: orderData
      });
      
      return response;
      
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar orden
  const updateOrder = useCallback(async (orderId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API_FETCH_JSON(`orders/${orderId}`, {
        method: 'PUT',
        body: updateData
      });
      
      return response;
      
    } catch (err) {
      console.error('Error updating order:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar orden
  const deleteOrder = useCallback(async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API_FETCH_JSON(`orders/${orderId}`, {
        method: 'DELETE'
      });
      
      // Actualizar lista local removiendo la orden eliminada
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      return response;
      
    } catch (err) {
      console.error('Error deleting order:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar órdenes por método de pago
  const fetchOrdersByPaymentMethod = useCallback(async (paymentMethod) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API_FETCH_JSON(`orders/payment/${paymentMethod}`);
      const ordersArray = Array.isArray(response) ? response : [];
      const mappedOrders = ordersArray.map(mapOrderData);
      
      setOrders(mappedOrders);
      return mappedOrders;
      
    } catch (err) {
      console.error('Error fetching orders by payment method:', err);
      setError(err.message);
      setOrders([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mapOrderData]);

  // Obtener estadísticas
  const fetchOrdersStats = useCallback(async () => {
    try {
      const response = await API_FETCH_JSON('orders/stats');
      return response;
    } catch (err) {
      console.error('Error fetching orders stats:', err);
      throw err;
    }
  }, []);

  // Limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Filtros locales (no requieren llamada API)
  const filterOrders = useCallback((ordersList, filter, searchTerm = '') => {
    return ordersList.filter(order => {
      const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter.toLowerCase();
      const matchesSearch = !searchTerm || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.includes(searchTerm);
      
      return matchesFilter && matchesSearch;
    });
  }, []);

  return {
    // Estado
    orders,
    loading,
    error,
    
    // Funciones principales
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    fetchOrdersByPaymentMethod,
    fetchOrdersStats,
    
    // Utilidades
    filterOrders,
    clearError
  };
};

export default useOrders;