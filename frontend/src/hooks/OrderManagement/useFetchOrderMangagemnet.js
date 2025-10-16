import { useState, useEffect, useCallback } from 'react';



const useFetchOrderManagement = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========== MAPEO DE DATOS ==========
  
  // Mapear estado del backend al frontend (Kanban)
  const mapEstadoToKanban = (estado) => {
    const mapeo = {
      'pendiente': 'todo',
      'en_proceso': 'indev',
      'completado': 'done',
      'cancelado': 'cancelado'
    };
    return mapeo[estado] || 'todo';
  };

  // Mapear estado del Kanban al backend
  const mapKanbanToEstado = (kanbanState) => {
    const mapeo = {
      'todo': 'pendiente',
      'indev': 'en_proceso',
      'done': 'completado',
      'cancelado': 'cancelado'
    };
    return mapeo[kanbanState] || 'pendiente';
  };

  // Normalizar tarea del backend para el frontend
  const normalizarTarea = (tarea) => ({
    ...tarea,
    id: tarea._id || tarea.id,
    nombre: tarea.titulo || tarea.nombre,
    estado: mapEstadoToKanban(tarea.estado)
  });

  // ========== FUNCIONES CRUD ==========

  // Obtener todas las tareas/órdenes
  const fetchTareas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/ordenes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const tareasNormalizadas = data.map(normalizarTarea);
      setTareas(tareasNormalizadas);
      return tareasNormalizadas;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al obtener las tareas';
      setError(errorMessage);
      console.error('Error fetching tareas:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nueva tarea
  const crearTarea = useCallback(async (nuevaTareaData) => {
    if (!nuevaTareaData.titulo || nuevaTareaData.titulo.trim() === '') {
      setError('El título de la tarea es obligatorio');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const dataToSend = {
        titulo: nuevaTareaData.titulo,
        descripcion: nuevaTareaData.descripcion || '',
        estado: nuevaTareaData.estado || 'pendiente',
        prioridad: nuevaTareaData.prioridad || 'media',
        fechaLimite: nuevaTareaData.fechaLimite,
        asignadoA: nuevaTareaData.asignadoA,
        orden: nuevaTareaData.orden || 0
      };

      const response = await fetch(`${API_BASE_URL}/ordenes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      const nuevaTarea = normalizarTarea(data.data || data);
      
      // Actualizar estado local
      setTareas(prevTareas => [...prevTareas, nuevaTarea]);
      
      return nuevaTarea;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear la tarea';
      setError(errorMessage);
      console.error('Error creating tarea:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar tarea (incluyendo cambio de estado en Kanban)
  const actualizarTarea = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/ordenes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      const tareaActualizada = normalizarTarea(data);
      
      // Actualizar estado local
      setTareas(prevTareas =>
        prevTareas.map(tarea => (tarea._id === id || tarea.id === id) ? tareaActualizada : tarea)
      );
      
      return tareaActualizada;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar la tarea';
      setError(errorMessage);
      console.error('Error updating tarea:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cambiar estado de tarea (para drag & drop de Kanban)
  const cambiarEstadoTarea = useCallback(async (id, newKanbanState) => {
    const estadoBackend = mapKanbanToEstado(newKanbanState);
    
    // Actualización optimista del UI
    setTareas(prevTareas =>
      prevTareas.map(tarea =>
        (tarea._id === id || tarea.id === id)
          ? { ...tarea, estado: mapEstadoToKanban(estadoBackend) }
          : tarea
      )
    );

    try {
      await actualizarTarea(id.toString(), { estado: estadoBackend });
    } catch (error) {
      // Si falla, revertir el cambio optimista
      await fetchTareas();
      throw error;
    }
  }, [actualizarTarea, fetchTareas]);

  // Eliminar tarea
  const eliminarTarea = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/ordenes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      // Actualizar estado local
      setTareas(prevTareas => prevTareas.filter(tarea => tarea._id !== id && tarea.id !== id));
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar la tarea';
      setError(errorMessage);
      console.error('Error deleting tarea:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ========== FUNCIONES AUXILIARES ==========

  // Obtener tareas por estado (para las columnas de Kanban)
  const getTareasPorEstado = useCallback((estado) => {
    return tareas.filter(tarea => tarea.estado === estado);
  }, [tareas]);

  // Contar tareas por estado
  const contarTareasPorEstado = useCallback((estado) => {
    return getTareasPorEstado(estado).length;
  }, [getTareasPorEstado]);

  // ========== EFFECT: CARGAR DATOS AL MONTAR ==========

  useEffect(() => {
    fetchTareas();
  }, []);

  // ========== RETORNO DEL HOOK ==========

  return {
    // Estado
    tareas,
    loading,
    error,
    
    // Funciones CRUD
    fetchTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea,
    
    // Funciones auxiliares
    getTareasPorEstado,
    contarTareasPorEstado,
    
    // Mapeo de estados
    mapEstadoToKanban,
    mapKanbanToEstado,
  };
};

export default useFetchOrderManagement;