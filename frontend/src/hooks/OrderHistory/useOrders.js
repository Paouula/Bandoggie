import { useState, useCallback } from 'react';
import { API_FETCH_JSON } from '../../config';

const useOrderInfo = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const handleApiError = (error, defaultMessage) => {
    console.error('API Error:', error);
    const message = error.response?.data?.message || error.message || defaultMessage;
    setError(message);
    return null;
  };

  // GET ALL ORDERS - Obtener todas las órdenes
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON('orders');
      console.log('Orders fetched from API:', data);
      
      const ordersArray = Array.isArray(data) ? data : [];
      setOrders(ordersArray);
      return ordersArray;
    } catch (error) {
      handleApiError(error, 'Error al obtener las órdenes');
      setOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // GET ORDER BY ID - Obtener orden por ID
  const fetchOrderById = useCallback(async (id) => {
    if (!id) {
      setError('ID de orden requerido');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON(`orders/${id}`);
      console.log('Order fetched by ID:', data);
      setOrder(data);
      return data;
    } catch (error) {
      handleApiError(error, 'Error al obtener la orden');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET ORDERS BY PAYMENT METHOD - Obtener órdenes por método de pago
  const fetchOrdersByPaymentMethod = useCallback(async (paymentMethod) => {
    if (!paymentMethod) {
      setError('Método de pago requerido');
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON(`orders/payment/${paymentMethod}`);
      console.log('Orders by payment method:', data);
      
      const ordersArray = Array.isArray(data) ? data : [];
      setOrders(ordersArray);
      return ordersArray;
    } catch (error) {
      handleApiError(error, 'Error al obtener órdenes por método de pago');
      setOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // GET ORDERS BY DATE RANGE - Obtener órdenes por rango de fechas
  const fetchOrdersByDateRange = useCallback(async (startDate, endDate) => {
    if (!startDate || !endDate) {
      setError('Fechas de inicio y fin requeridas');
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON(
        `orders/date-range?startDate=${startDate}&endDate=${endDate}`
      );
      console.log('Orders by date range:', data);
      
      const ordersArray = Array.isArray(data) ? data : [];
      setOrders(ordersArray);
      return ordersArray;
    } catch (error) {
      handleApiError(error, 'Error al obtener órdenes por rango de fechas');
      setOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // GET ORDERS STATS - Obtener estadísticas de órdenes
  const fetchOrdersStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await API_FETCH_JSON('orders/stats');
      console.log('Orders stats:', data);
      setStats(data);
      return data;
    } catch (error) {
      handleApiError(error, 'Error al obtener estadísticas de órdenes');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE ORDER - Crear nueva orden
  const createOrder = useCallback(async (orderData) => {
    if (!orderData.idCart || !orderData.addressClient || !orderData.PaymentMethod) {
      setError('Datos de orden incompletos');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_FETCH_JSON.baseURL || ''}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la orden');
      }

      const data = await response.json();
      console.log('Order created:', data);
      
      // Actualizar la lista de órdenes
      await fetchOrders();
      
      return data.order;
    } catch (error) {
      handleApiError(error, 'Error al crear la orden');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  // UPDATE ORDER - Actualizar orden
  const updateOrder = useCallback(async (id, updateData) => {
    if (!id) {
      setError('ID de orden requerido');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_FETCH_JSON.baseURL || ''}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la orden');
      }

      const data = await response.json();
      console.log('Order updated:', data);
      
      // Actualizar la lista de órdenes
      await fetchOrders();
      
      return data.order;
    } catch (error) {
      handleApiError(error, 'Error al actualizar la orden');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  // DELETE ORDER - Eliminar orden
  const deleteOrder = useCallback(async (id) => {
    if (!id) {
      setError('ID de orden requerido');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_FETCH_JSON.baseURL || ''}/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la orden');
      }

      const data = await response.json();
      console.log('Order deleted:', data);
      
      // Actualizar la lista de órdenes
      await fetchOrders();
      
      return data.order;
    } catch (error) {
      handleApiError(error, 'Error al eliminar la orden');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearOrder = useCallback(() => {
    setOrder(null);
  }, []);

  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return {
    orders,
    order,
    loading,
    error,
    stats,
    fetchOrders,
    fetchOrderById,
    fetchOrdersByPaymentMethod,
    fetchOrdersByDateRange,
    fetchOrdersStats,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
    clearOrder,
    clearOrders
  };
};

export default useOrderInfo;