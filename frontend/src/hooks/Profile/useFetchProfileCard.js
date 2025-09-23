import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config.js';

// Hook para obtener y manejar los datos del usuario autenticado
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
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bandoggie-production.up.railway.app/api"; 

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

    // Función para actualizar datos del usuario
    const updateUserData = async (updatedData) => {
        try {
            const endpoint = `users/${userInfo.userType}/${userInfo.id}`; // Ajustar según tu API
            const data = await API_FETCH_JSON(endpoint, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: updatedData
            });

            if (data.success) {
                setUserInfo(prevState => ({
                    ...prevState,
                    ...updatedData
                }));
                toast.success('Datos actualizados correctamente');
                return true;
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Error al actualizar los datos');
            return false;
        }
    };

    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (field, value) => {
        setUserInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        fetchUserData();
    }, []);

    // Función para refrescar los datos (útil después del login)
    const refreshUserData = () => {
        fetchUserData();
    };

    return {
        userInfo,
        isLoading,
        isAuthenticated,
        handleInputChange,
        updateUserData,
        refreshUserData
    };
};

export default useFetchUser;