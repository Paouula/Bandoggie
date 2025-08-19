// src/hooks/OrderInformation/useOrderInfo.js
import { useState, useEffect, useCallback } from 'react';

const useOrderInfo = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  // URL base de la API
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  // Función para manejar errores de la API
  const handleApiError = (error, defaultMessage) => {
    console.error('API Error:', error);
    const message = error.response?.data?.message || error.message || defaultMessage;
    setError(message);
    throw new Error(message);
  };

  // Obtener todas las órdenes
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data); // Inicialmente, filteredOrders es igual a orders
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener las órdenes');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Filtrar órdenes localmente
  const filterOrders = useCallback((filterType, filterValue = null) => {
    setCurrentFilter(filterType);
    
    let filtered = [...orders];
    
    switch (filterType) {
      case 'payment':
        filtered = orders.filter(order => 
          order.paymentMethod?.toLowerCase() === filterValue?.toLowerCase()
        );
        break;
        
      case 'status':
        // Asumiendo que tienes un campo status en tus órdenes
        filtered = orders.filter(order => 
          order.status?.toLowerCase() === filterValue?.toLowerCase()
        );
        break;
        
      case 'date':
        if (filterValue && filterValue.from && filterValue.to) {
          filtered = orders.filter(order => {
            const orderDate = new Date(order.createdAt || order.date);
            return orderDate >= new Date(filterValue.from) && 
                   orderDate <= new Date(filterValue.to);
          });
        }
        break;
        
      case 'search':
        if (filterValue) {
          const searchTerm = filterValue.toLowerCase();
          filtered = orders.filter(order => 
            order._id?.toLowerCase().includes(searchTerm) ||
            order.addressClient?.toLowerCase().includes(searchTerm) ||
            order.paymentMethod?.toLowerCase().includes(searchTerm)
          );
        }
        break;
        
      case 'all':
      default:
        // No filtrar, mostrar todas
        break;
    }
    
    setFilteredOrders(filtered);
    return filtered;
  }, [orders]);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilteredOrders(orders);
    setCurrentFilter('all');
  }, [orders]);

  // Obtener una orden por ID
  const fetchOrderById = useCallback(async (id) => {
    if (!id) {
      setError('ID de orden requerido');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Orden no encontrada');
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOrder(data);
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener la orden');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Obtener órdenes por método de pago (desde API)
  const fetchOrdersByPaymentMethod = useCallback(async (paymentMethod) => {
    if (!paymentMethod) {
      setError('Método de pago requerido');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/orders/payment/${paymentMethod}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
      setCurrentFilter('payment');
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener órdenes por método de pago');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Obtener órdenes por rango de fechas (desde API)
  const fetchOrdersByDateRange = useCallback(async (startDate, endDate) => {
    if (!startDate || !endDate) {
      setError('Fechas de inicio y fin requeridas');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/date-range?startDate=${startDate}&endDate=${endDate}`
      );
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
      setCurrentFilter('date');
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener órdenes por rango de fechas');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Obtener estadísticas de órdenes
  const fetchOrdersStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/orders/stats`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setStats(data);
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener estadísticas de órdenes');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Limpiar orden seleccionada
  const clearOrder = useCallback(() => {
    setOrder(null);
  }, []);

  // Limpiar todas las órdenes
  const clearOrders = useCallback(() => {
    setOrders([]);
    setFilteredOrders([]);
  }, []);

  // Efecto para sincronizar filteredOrders cuando orders cambia
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  return {
    // Estado
    orders,
    filteredOrders, // Órdenes filtradas
    order,
    loading,
    error,
    stats,
    currentFilter,
    
    // Acciones
    fetchOrders,
    filterOrders,    // ← Nueva función de filtrado
    clearFilters,    // ← Nueva función para limpiar filtros
    fetchOrderById,
    fetchOrdersByPaymentMethod,
    fetchOrdersByDateRange,
    fetchOrdersStats,
    clearError,
    clearOrder,
    clearOrders
  };
};

export default useOrderInfo;