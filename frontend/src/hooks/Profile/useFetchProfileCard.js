import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config.js';

const useFetchUser = () => {
  // Aquí se encuentran campos tanto de clientes como de veterinarias
  const [userInfo, setUserInfo] = useState({
    _id: '',
    userType: null,
    email: '',
    password: '', // Nunca se devuelve
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
  const endpoint = ["login", "logout"];

  // Mapear datos según tipo de usuario - MEJORADO
  const mapUserData = (userData) => {
    const base = {
      _id: userData._id || '',
      userType: userData.userType || null,
      email: userData.email || '',
      password: '',
      image: userData.image || '',
      name: userData.name || '',
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
    }

    return base;
  };

  // Obtener datos del usuario autenticado - MEJORADO
  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      const response = await API_FETCH_JSON(`${endpoint[0]}/auth/me`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });

      // Verificar si es una respuesta exitosa
      if (response && response.user) {
        const mappedUserData = mapUserData(response.user);
        console.log('✅ Datos del usuario cargados:', mappedUserData);
        setUserInfo(mappedUserData);
        setIsAuthenticated(true);
      } else {
        console.log('❌ No se encontraron datos de usuario');
        setIsAuthenticated(false);
        resetUserInfo();
      }
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
      
      // Solo mostrar error si no es un 401 (no autenticado)
      if (error.status !== 401) {
        toast.error('Error al cargar datos del usuario');
      }
      
      setIsAuthenticated(false);
      resetUserInfo();
    } finally {
      setIsLoading(false);
    }
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
      address: '',
      birthday: '',
      locationVet: '',
      nitVet: ''
    });
  };

  // Filtrar datos antes de enviar - MEJORADO
  const filterDataForUpdate = (data) => {
    const filteredData = {};

    // Campos comunes para todos los usuarios
    if (data.email) filteredData.email = data.email;
    if (data.phone) filteredData.phone = data.phone;
    if (data.address) filteredData.address = data.address;

    // Incluir solo campos relevantes según el tipo de usuario
    if (data.userType === "client") {
      if (data.name) filteredData.name = data.name;
      if (data.birthday) filteredData.birthday = data.birthday;
    } else if (data.userType === "vet") {
      // Para veterinarios, enviar el nombre como 'nameVet' si es necesario
      if (data.name) filteredData.name = data.name; // El backend decidirá si usar nameVet
      if (data.locationVet) filteredData.locationVet = data.locationVet;
      if (data.nitVet) filteredData.nitVet = data.nitVet;
    } else if (data.userType === "employee") {
      if (data.name) filteredData.name = data.name;
    }

    // Eliminar campos vacíos, pero mantener cadenas vacías válidas para algunos campos
    Object.keys(filteredData).forEach(key => {
      if (filteredData[key] === undefined || filteredData[key] === null) {
        delete filteredData[key];
      }
    });

    console.log('📤 Datos a enviar:', filteredData);
    return filteredData;
  };

  // Actualizar datos del usuario - MEJORADO
  const updateUserData = async (updatedData) => {
    try {
      const dataToSend = filterDataForUpdate(updatedData);

      console.log('🔄 Actualizando usuario con:', dataToSend);

      const response = await API_FETCH_JSON(`${endpoint[0]}/auth/me/update`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      });

      if (response && response.message && (
        response.message.includes('actualizado') ||
        response.message.includes('éxito') ||
        response.message.includes('correctamente')
      )) {
        // Actualizar estado local con los datos devueltos por el servidor
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
        toast.error(response.message || 'Error al actualizar los datos');
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating user data:', error);
      
      let errorMessage = 'Error al actualizar los datos';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return false;
    }
  };

  // Cambiar inputs del formulario
  const handleInputChange = (field, value) => {
    console.log(`📝 Cambiando ${field}: ${value}`);
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Logout - MEJORADO
  const logout = async () => {
    try {
      await API_FETCH_JSON(`${endpoint[1]}`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error durante logout:', error);
    } finally {
      setIsAuthenticated(false);
      resetUserInfo();
      toast.success('Sesión cerrada correctamente');
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Función para refrescar datos
  const refreshUserData = () => {
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