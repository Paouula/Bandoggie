import { useState, useEffect } from 'react';

const useDataClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalClients, setTotalClients] = useState(0);

  const API_BASE = 'http://localhost:4000/api/clients';

 //get 
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setClients(data);
      setTotalClients(data.length);
      
      console.log('Clientes obtenidos exitosamente:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener clientes';
      setError(errorMessage);
      console.error('Error fetching clients:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

 //post
  const createClient = async (clientData, imageFile = null) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', clientData.name || '');
      formData.append('email', clientData.email || '');
      formData.append('phone', clientData.phone || '');
      formData.append('birthday', clientData.birthday || '');
      formData.append('password', clientData.password || '');
      
      // Agregar imagen si existe
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(API_BASE, {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const newClient = await response.json();
      
      // Actualizar estado local
      setClients(prevClients => [...prevClients, newClient]);
      setTotalClients(prev => prev + 1);
      
      console.log('Cliente creado exitosamente:', newClient);
      return { success: true, data: newClient };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al crear cliente';
      setError(errorMessage);
      console.error('Error creating client:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // put
  const updateClient = async (clientId, clientData, imageFile = null) => {
    setLoading(true);
    setError(null);

    try {
      // Validar ID
      if (!clientId) {
        throw new Error('ID del cliente es requerido');
      }

      const formData = new FormData();
      if (clientData.name) formData.append('name', clientData.name);
      if (clientData.email) formData.append('email', clientData.email);
      if (clientData.phone) formData.append('phone', clientData.phone);
      if (clientData.birthday) formData.append('birthday', clientData.birthday);
      if (clientData.password) formData.append('password', clientData.password);
      
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_BASE}/${clientId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const updatedClient = result.updatedClient;
      
      // Actualizar estado local
      setClients(prevClients => 
        prevClients.map(client => 
          client._id === clientId ? updatedClient : client
        )
      );
      
      console.log('Cliente actualizado exitosamente:', updatedClient);
      return { success: true, data: updatedClient };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al actualizar cliente';
      setError(errorMessage);
      console.error('Error updating client:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // delete
  const deleteClient = async (clientId) => {
    setLoading(true);
    setError(null);

    try {
      // Validar ID
      if (!clientId) {
        throw new Error('ID del cliente es requerido');
      }

      const response = await fetch(`${API_BASE}/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Actualizar estado local
      setClients(prevClients => 
        prevClients.filter(client => client._id !== clientId)
      );
      setTotalClients(prev => prev - 1);
      
      console.log('Cliente eliminado exitosamente:', result.message);
      return { success: true, data: result };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar cliente';
      setError(errorMessage);
      console.error('Error deleting client:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Buscar clientes por término
  const searchClients = (searchTerm) => {
    if (!searchTerm.trim()) return clients;
    
    return clients.filter(client => 
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm)
    );
  };

  // Filtrar clientes
  const filterClients = (filterBy) => {
    let filteredClients = [...clients];
    
    switch (filterBy) {
      case 'Alfabético':
        return filteredClients.sort((a, b) => 
          a.name?.localeCompare(b.name) || 0
        );
      case 'Más reciente':
        return filteredClients.sort((a, b) => 
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      case 'Por defecto':
      default:
        return filteredClients;
    }
  };

  // cliente por ID
  const getClientById = (clientId) => {
    return clients.find(client => client._id === clientId);
  };

  // Validar datos del cliente
  const validateClientData = (clientData) => {
    const errors = [];
    
    if (!clientData.name?.trim()) {
      errors.push('El nombre es requerido');
    }
    
    if (!clientData.email?.trim()) {
      errors.push('El email es requerido');
    } else if (!/\S+@\S+\.\S+/.test(clientData.email)) {
      errors.push('El email no es válido');
    }
    
    if (!clientData.phone?.trim()) {
      errors.push('El teléfono es requerido');
    }
    
    if (!clientData.password?.trim()) {
      errors.push('La contraseña es requerida');
    } else if (clientData.password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return errors;
  };

  const clearError = () => {
    setError(null);
  };

  // Recargar 
  const refreshClients = () => {
    return fetchClients();
  };


  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClients();
  }, []);

  return {
    // Estados
    clients,
    loading,
    error,
    totalClients,
    
    //cruds
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    
    // Funciones 
    searchClients,
    filterClients,
    getClientById,
    validateClientData,
    clearError,
    refreshClients,
  };
};

export default useDataClients;