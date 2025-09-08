// hooks/Profile/useFetchProfileCard.js
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const useFetchUser = () => {
  // Estado del usuario con todos los campos posibles
  const [userInfo, setUserInfo] = useState({
    _id: '',
    userType: null,
    email: '',
    password: '', 
    image: '',
    name: '',
    phone: '',
    address: '',
    birthday: '',      
    locationVet: '',   
    nitVet: ''         
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // 🔧 CORREGIDO: Configuración de la API para Vite
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001/api";

  // Función para obtener el token de autenticación
  const getAuthToken = useCallback(() => {
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  }, []);

  // Función para hacer peticiones autenticadas
  const authenticatedFetch = useCallback(async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      credentials: 'include',
      ...options
    };

    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado o inválido
          clearAuthData();
          throw new Error('Sesión expirada');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error en ${endpoint}:`, error);
      throw error;
    }
  }, [getAuthToken]);

  // Mapear datos según tipo de usuario
  const mapUserData = useCallback((userData) => {
    if (!userData) return null;

    const base = {
      _id: userData._id || userData.id || '',
      userType: userData.userType || null,
      email: userData.email || '',
      password: '',
      image: userData.image || '',
      name: userData.name || userData.nameVet || '',
      phone: userData.phone || '',
      address: userData.address || '',
      birthday: '',
      locationVet: '',
      nitVet: ''
    };

    // Campos específicos para clientes
    if (userData.userType === "client") {
      base.birthday = userData.birthday || '';
    }

    // Campos específicos para veterinarios
    if (userData.userType === "vet") {
      base.locationVet = userData.locationVet || '';
      base.nitVet = userData.nitVet || '';
      // Para veterinarios, el nombre puede venir como nameVet
      base.name = userData.nameVet || userData.name || '';
    }

    return base;
  }, []);

  // Limpiar datos de autenticación
  const clearAuthData = useCallback(() => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserInfo({
      _id: '',
      userType: null,
      email: '',
      password: '',
      image: '',
      name: '',
      phone: '',
      address: '',
      birthday: '',
      locationVet: '',
      nitVet: ''
    });
    setError(null);
  }, []);

  // Verificar si el token es válido
  const verifyToken = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Token inválido");
      }

      const userData = await response.json();
      return userData;
    } catch (err) {
      console.error("Error verifying token:", err);
      return null;
    }
  }, [API_BASE_URL]);

  // Obtener datos del usuario autenticado
  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = getAuthToken();
      
      if (!token) {
        console.log('🔒 No hay token de autenticación');
        setIsAuthenticated(false);
        clearAuthData();
        return;
      }

      // Primero verificar el token
      const tokenVerification = await verifyToken(token);
      if (!tokenVerification) {
        console.log('❌ Token inválido, limpiando datos');
        clearAuthData();
        return;
      }

      // Intentar obtener datos del usuario desde el endpoint de perfil
      let userData = null;
      
      try {
        // Método 1: Endpoint específico de perfil
        const profileResponse = await authenticatedFetch('auth/me');
        userData = profileResponse.user || profileResponse;
      } catch (profileError) {
        console.log('⚠️ Error con endpoint de perfil, intentando con verificación de token');
        // Método 2: Usar datos del token verificado
        userData = tokenVerification.user || tokenVerification;
      }

      if (userData) {
        const mappedUserData = mapUserData(userData);
        console.log('✅ Datos del usuario cargados:', mappedUserData);
        setUserInfo(mappedUserData);
        setIsAuthenticated(true);
      } else {
        console.log('❌ No se encontraron datos de usuario');
        clearAuthData();
      }
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
      
      // Solo mostrar error si no es un 401 (no autenticado)
      if (error.message !== 'Sesión expirada') {
        setError('Error al cargar datos del usuario');
        toast.error('Error al cargar datos del usuario');
      }
      
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [getAuthToken, verifyToken, authenticatedFetch, mapUserData, clearAuthData]);

  // Filtrar datos antes de enviar actualización
  const filterDataForUpdate = useCallback((data) => {
    const filteredData = {};

    // Campos comunes para todos los usuarios
    if (data.email && data.email.trim()) filteredData.email = data.email.trim();
    if (data.phone && data.phone.trim()) filteredData.phone = data.phone.trim();
    if (data.address && data.address.trim()) filteredData.address = data.address.trim();

    // Incluir solo campos relevantes según el tipo de usuario
    if (data.userType === "client") {
      if (data.name && data.name.trim()) filteredData.name = data.name.trim();
      if (data.birthday) filteredData.birthday = data.birthday;
    } else if (data.userType === "vet") {
      if (data.name && data.name.trim()) {
        // Para veterinarios, puede ser name o nameVet según el backend
        filteredData.name = data.name.trim();
        filteredData.nameVet = data.name.trim(); // Enviar ambos por compatibilidad
      }
      if (data.locationVet && data.locationVet.trim()) filteredData.locationVet = data.locationVet.trim();
      if (data.nitVet && data.nitVet.trim()) filteredData.nitVet = data.nitVet.trim();
    } else if (data.userType === "employee") {
      if (data.name && data.name.trim()) filteredData.name = data.name.trim();
    }

    // Eliminar campos vacíos
    Object.keys(filteredData).forEach(key => {
      if (filteredData[key] === undefined || filteredData[key] === null || filteredData[key] === '') {
        delete filteredData[key];
      }
    });

    console.log('📤 Datos filtrados para enviar:', filteredData);
    return filteredData;
  }, []);

  // Actualizar datos del usuario
  const updateUserData = useCallback(async (updatedData) => {
    try {
      const dataToSend = filterDataForUpdate(updatedData);

      if (Object.keys(dataToSend).length === 0) {
        toast.error('No hay cambios para guardar');
        return false;
      }

      console.log('🔄 Actualizando usuario con:', dataToSend);

      const response = await authenticatedFetch('auth/me/update', {
        method: 'PUT',
        body: JSON.stringify(dataToSend)
      });

      if (response && (
        response.message?.includes('actualizado') ||
        response.message?.includes('éxito') ||
        response.message?.includes('correctamente') ||
        response.success
      )) {
        // Actualizar estado local
        if (response.user) {
          const mappedUserData = mapUserData(response.user);
          setUserInfo(mappedUserData);
        } else {
          // Si no devuelve user, actualizar solo los campos que enviamos
          setUserInfo(prevState => ({
            ...prevState,
            ...dataToSend
          }));
        }
        
        toast.success('Datos actualizados correctamente');
        return true;
      } else {
        const errorMsg = response.message || 'Error al actualizar los datos';
        toast.error(errorMsg);
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating user data:', error);
      
      let errorMessage = 'Error al actualizar los datos';
      
      if (error.message === 'Sesión expirada') {
        errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
        clearAuthData();
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return false;
    }
  }, [filterDataForUpdate, authenticatedFetch, mapUserData, clearAuthData]);

  // Iniciar sesión
  const login = useCallback(async (credentials, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      
      // Guardar token
      const storage = rememberMe ? localStorage : sessionStorage;
      if (data.token) {
        storage.setItem("authToken", data.token);
      }

      // Actualizar estado inmediatamente si viene el usuario
      if (data.user) {
        const mappedUserData = mapUserData(data.user);
        setUserInfo(mappedUserData);
        setIsAuthenticated(true);
        toast.success('¡Bienvenido!');
      } else {
        // Si no viene user en la respuesta, cargar datos por separado
        await fetchUserData();
      }

      return true;
    } catch (err) {
      console.error("Error logging in:", err);
      const errorMsg = err.message || "Error al iniciar sesión";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, mapUserData, fetchUserData]);

  // Cerrar sesión
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Intentar notificar al servidor
      try {
        await authenticatedFetch('auth/logout', {
          method: 'POST'
        });
      } catch (logoutError) {
        console.warn('Error notificando logout al servidor:', logoutError);
      }

      // Limpiar datos locales
      clearAuthData();
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error durante logout:', error);
      // Aún así limpiar datos locales
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [authenticatedFetch, clearAuthData]);

  // Cambiar inputs del formulario
  const handleInputChange = useCallback((field, value) => {
    console.log(`📝 Cambiando ${field}:`, value);
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Refrescar datos del usuario
  const refreshUserData = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Escuchar cambios en localStorage para sincronizar entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          // Token añadido/cambiado
          fetchUserData();
        } else {
          // Token eliminado
          clearAuthData();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchUserData, clearAuthData]);

  // Escuchar eventos de autenticación personalizados
  useEffect(() => {
    const handleAuthSuccess = (event) => {
      console.log('🔑 Evento de autenticación detectado:', event.detail);
      // Recargar datos del usuario después del login
      setTimeout(() => {
        fetchUserData();
      }, 100); // Pequeño delay para asegurar que el token se guardó
    };

    const handleAuthLogout = () => {
      console.log('🚪 Evento de logout detectado');
      clearAuthData();
    };

    // Escuchar eventos personalizados
    window.addEventListener('authSuccess', handleAuthSuccess);
    window.addEventListener('authLogout', handleAuthLogout);

    return () => {
      window.removeEventListener('authSuccess', handleAuthSuccess);
      window.removeEventListener('authLogout', handleAuthLogout);
    };
  }, [fetchUserData, clearAuthData]);

  return {
    // Estado
    userInfo,
    isLoading,
    isAuthenticated,
    error,
    
    // Funciones de autenticación
    login,
    logout,
    
    // Funciones de perfil
    handleInputChange,
    updateUserData,
    refreshUserData,
    
    // Funciones utilitarias
    clearAuthData,
    getAuthToken,
    fetchUserData
  };
};

export default useFetchUser;