import { useState, useEffect, useCallback } from 'react';
import { API_FETCH_JSON } from '../../config';

const useOrderInfo = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  // Endpoints
  const endpoint = 'orders';
  const endpointPayment = 'orders/payment';
  const endpointDateRange = 'orders/date-range';
  const endpointStats = 'orders/stats';

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
      const data = await API_FETCH_JSON(endpoint);
      setOrders(data);
      setFilteredOrders(data);
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener las órdenes');
    } finally {
      setLoading(false);
    }
  }, []);

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
      const data = await API_FETCH_JSON(`${endpoint}/${id}`);
      setOrder(data);
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener la orden');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener órdenes por método de pago (desde API)
  const fetchOrdersByPaymentMethod = useCallback(async (paymentMethod) => {
    if (!paymentMethod) {
      setError('Método de pago requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON(`${endpointPayment}/${paymentMethod}`);
      setOrders(data);
      setFilteredOrders(data);
      setCurrentFilter('payment');
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener órdenes por método de pago');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener órdenes por rango de fechas (desde API)
  const fetchOrdersByDateRange = useCallback(async (startDate, endDate) => {
    if (!startDate || !endDate) {
      setError('Fechas de inicio y fin requeridas');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON(
        `${endpointDateRange}?startDate=${startDate}&endDate=${endDate}`
      );
      setOrders(data);
      setFilteredOrders(data);
      setCurrentFilter('date');
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener órdenes por rango de fechas');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener estadísticas de órdenes
  const fetchOrdersStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON(endpointStats);
      setStats(data);
      return data;
    } catch (error) {
      return handleApiError(error, 'Error al obtener estadísticas de órdenes');
    } finally {
      setLoading(false);
    }
  }, []);

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
    filterOrders,    
    clearFilters,   
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