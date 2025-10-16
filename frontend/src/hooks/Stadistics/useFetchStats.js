import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config';

// Hook para manejar las estadísticas del dashboard
const useFetchStats = () => {
  // Declaro el endpoint
  const endpoint = 'stats';

  // Obtener todas las estadísticas
  const handleGetStats = async () => {
    try {
      const data = await API_FETCH_JSON(endpoint);
      return data;
    } catch (error) {
      toast.error('Error al obtener las estadísticas');
      console.error('Error en handleGetStats:', error);
      throw error;
    }
  };

  return {
    handleGetStats,
  };
};

export default useFetchStats;