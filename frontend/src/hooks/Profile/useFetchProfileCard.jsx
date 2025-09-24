import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config';

// Hook para obtener y manejar los datos del usuario autenticado
const useFetchProfileCard = () => {
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

  // Endpoints
  const endpointLogin = 'auth/login';
  const endpointVerify = 'auth/verify';
  const endpointProfile = 'auth/me';
  const endpointUpdate = 'auth/me/update';
  const endpointLogout = 'auth/logout';

  // Función para obtener el token de autenticación
  const getAuthToken = useCallback(() => {
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  }, []);

  // Función para hacer peticiones autenticadas usando API_FETCH_JSON
  const authenticatedFetch = useCallback(async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };
    try {
      return await API_FETCH_JSON(endpoint, {
        ...options,
        headers
      });
    } catch (error) {
      if (error.message === 'Sesión expirada' || error.message === 'Token inválido') {
        clearAuthData();
      }
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
      const data = await API_FETCH_JSON(endpointVerify, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return data;
    } catch (err) {
      console.error("Error verifying token:", err);
      return null;
    }
  }, []);

  // Obtener datos del usuario autenticado
  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = getAuthToken();
      if (!token) {
        setIsAuthenticated(false);
        clearAuthData();
        return;
      }

      // Primero verificar el token
      const tokenVerification = await verifyToken(token);
      if (!tokenVerification) {
        clearAuthData();
        return;
      }

      // Intentar obtener datos del usuario desde el endpoint de perfil
      let userData = null;
      try {
        const profileResponse = await authenticatedFetch(endpointProfile);
        userData = profileResponse.user || profileResponse;
      } catch (profileError) {
        userData = tokenVerification.user || tokenVerification;
      }

      if (userData) {
        const mappedUserData = mapUserData(userData);
        setUserInfo(mappedUserData);
        setIsAuthenticated(true);
      } else {
        clearAuthData();
      }
    } catch (error) {
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

    // Campos comunes
    if (data.email && data.email.trim()) filteredData.email = data.email.trim();
    if (data.phone && data.phone.trim()) filteredData.phone = data.phone.trim();
    if (data.address && data.address.trim()) filteredData.address = data.address.trim();

    if (data.userType === "client") {
      if (data.name && data.name.trim()) filteredData.name = data.name.trim();
      if (data.birthday) filteredData.birthday = data.birthday;
    } else if (data.userType === "vet") {
      if (data.name && data.name.trim()) {
        filteredData.name = data.name.trim();
        filteredData.nameVet = data.name.trim();
      }
      if (data.locationVet && data.locationVet.trim()) filteredData.locationVet = data.locationVet.trim();
      if (data.nitVet && data.nitVet.trim()) filteredData.nitVet = data.nitVet.trim();
    } else if (data.userType === "employee") {
      if (data.name && data.name.trim()) filteredData.name = data.name.trim();
    }

    Object.keys(filteredData).forEach(key => {
      if (!filteredData[key]) delete filteredData[key];
    });

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

      const response = await authenticatedFetch(endpointUpdate, {
        method: 'PUT',
        body: dataToSend
      });

      if (response && (
        response.message?.includes('actualizado') ||
        response.message?.includes('éxito') ||
        response.message?.includes('correctamente') ||
        response.success
      )) {
        if (response.user) {
          const mappedUserData = mapUserData(response.user);
          setUserInfo(mappedUserData);
        } else {
          setUserInfo(prev => ({ ...prev, ...dataToSend }));
        }
        toast.success('Datos actualizados correctamente');
        return true;
      } else {
        const errorMsg = response.message || 'Error al actualizar los datos';
        toast.error(errorMsg);
        return false;
      }
    } catch (error) {
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
      const data = await API_FETCH_JSON(endpointLogin, {
        method: "POST",
        body: credentials
      });

      const storage = rememberMe ? localStorage : sessionStorage;
      if (data.token) storage.setItem("authToken", data.token);

      if (data.user) {
        const mappedUserData = mapUserData(data.user);
        setUserInfo(mappedUserData);
        setIsAuthenticated(true);
        toast.success('¡Bienvenido!');
      } else {
        await fetchUserData();
      }

      return true;
    } catch (err) {
      const errorMsg = err.message || "Error al iniciar sesión";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [mapUserData, fetchUserData]);

  // Cerrar sesión
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      try {
        await authenticatedFetch(endpointLogout, { method: 'POST' });
      } catch (_) {}
      clearAuthData();
      toast.success('Sesión cerrada correctamente');
    } catch (_) {
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [authenticatedFetch, clearAuthData]);

  // Cambiar inputs del formulario
  const handleInputChange = useCallback((field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  // Refrescar datos del usuario
  const refreshUserData = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Cargar datos al montar
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          fetchUserData();
        } else {
          clearAuthData();
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchUserData, clearAuthData]);

  // Escuchar eventos personalizados
  useEffect(() => {
    const handleAuthSuccess = () => {
      setTimeout(() => fetchUserData(), 100);
    };
    const handleAuthLogout = () => {
      clearAuthData();
    };

    window.addEventListener('authSuccess', handleAuthSuccess);
    window.addEventListener('authLogout', handleAuthLogout);

    return () => {
      window.removeEventListener('authSuccess', handleAuthSuccess);
      window.removeEventListener('authLogout', handleAuthLogout);
    };
  }, [fetchUserData, clearAuthData]);

  return {
    userInfo,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    handleInputChange,
    updateUserData,
    refreshUserData,
    clearAuthData,
    getAuthToken,
    fetchUserData
  };
};

export default useFetchProfileCard;