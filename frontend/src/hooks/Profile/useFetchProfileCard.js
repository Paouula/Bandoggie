import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config.js';

const useFetchUser = () => {
  const [userInfo, setUserInfo] = useState({
    _id: '',
    userType: null,
    email: '',
    password: '', // Nunca se devuelve
    image: '',
    name: '',
    phone: '',
    address: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para mapear los datos del backend a nuestro estado
  const mapUserData = (userData) => {
    console.log('=== Mapping User Data ===');
    console.log('Raw user data:', userData);

    const mappedData = {
      _id: userData._id || '',
      userType: userData.userType,
      email: userData.email || '',
      password: '',
      image: userData.image || '',
      name: userData.name || '',
      phone: userData.phone || '',
      address: userData.address || ''
    };

    console.log('Mapped user data:', mappedData);
    console.log('=========================');
    return mappedData;
  };

  // Obtener datos del usuario autenticado
  const fetchUserData = async () => {
    console.log('🔍 Fetching user data...');
    try {
      setIsLoading(true);

      const data = await API_FETCH_JSON('login/auth/me', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });

      console.log('✅ API Response:', data);

      if (data && data.user) {
        const mappedUserData = mapUserData(data.user);
        setUserInfo(mappedUserData);
        setIsAuthenticated(true);
        console.log('✅ User authenticated successfully');
      } else {
        console.log('❌ No user data found');
        setIsAuthenticated(false);
        resetUserInfo();
      }
    } catch (error) {
      console.error('❌ Error fetching user data:', error);

      if (error.status !== 401) {
        toast.error('Error al cargar datos del usuario');
      }

      setIsAuthenticated(false);
      resetUserInfo();
    } finally {
      setIsLoading(false);
    }

    console.log('🏁 Fetch completed');
  };

  // Resetear estado
  const resetUserInfo = () => {
    setUserInfo({
      _id: '',
      userType: null,
      email: '',
      password: '',
      image: '',
      name: '',
      phone: '',
      address: ''
    });
  };

  // Filtrar datos antes de enviar
  const filterDataForUpdate = (data) => {
    const filteredData = { ...data };

    delete filteredData.password;
    delete filteredData._id;
    delete filteredData.userType;
    delete filteredData.image; // imagen se maneja aparte

    // Quitar vacíos
    Object.keys(filteredData).forEach(key => {
      if (
        filteredData[key] === undefined ||
        filteredData[key] === null ||
        filteredData[key] === ''
      ) {
        delete filteredData[key];
      }
    });

    return filteredData;
  };

  // Actualizar datos del usuario
  const updateUserData = async (updatedData) => {
    try {
      const dataToSend = filterDataForUpdate(updatedData);

      console.log('🔄 Updating user data via: login/auth/me');
      console.log('🔄 Filtered data to send:', dataToSend);

      const data = await API_FETCH_JSON('login/auth/me', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      });

      console.log('Update response:', data);

      if (data.message && (
        data.message.includes('actualizado') ||
        data.message.includes('éxito') ||
        data.message.includes('correctamente')
      )) {
        setUserInfo(prevState => ({
          ...prevState,
          ...updatedData
        }));
        toast.success('Datos actualizados correctamente');
        return true;
      } else {
        console.warn('Respuesta inesperada:', data);
        toast.error('Error al actualizar los datos');
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating user data:', error);
      toast.error(`Error al actualizar los datos: ${error.message || 'Error desconocido'}`);
      return false;
    }
  };

  // Cambiar inputs del formulario
  const handleInputChange = (field, value) => {
    console.log(`📝 Updating field: ${field} = ${value}`);
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Logout
  const logout = async () => {
    try {
      await API_FETCH_JSON('login/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsAuthenticated(false);
      resetUserInfo();
      toast.success('Sesión cerrada correctamente');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshUserData = () => {
    console.log(' Refreshing user data...');
    fetchUserData();
  };

  return {
    userInfo,
    isLoading,
    isAuthenticated,
    handleInputChange,
    updateUserData,
    refreshUserData,
    logout
  };
};

export default useFetchUser;