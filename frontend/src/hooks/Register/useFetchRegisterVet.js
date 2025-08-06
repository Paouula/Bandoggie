import { toast } from 'react-hot-toast';
// Importamos la función API_FETCH_JSON desde el archivo config.js
/*API_FETCH_JSON es una función que maneja las solicitudes HTTP de manera global del proyecto
En su interior, configura la URL base y los encabezados necesarios para las solicitudes.*/
import { API_FETCH_JSON } from '../../config.js';

//Hook para registro de veterinarias
const useFetchRegisterVet = () => {
  const endpoint = 'registerVet';

  // Función para registrar veterinarias
  const handleRegister = async (registerVetData) => {
    try {
      const data = await API_FETCH_JSON(endpoint, {
        method: 'POST',
        body: registerVetData,
      });

      toast.success('Se ha registrado correctamente. Por favor, verifica tu correo electrónico.');
      return data;

    } catch (error) {
      toast.error(error.message || 'Error en el registro');
      throw error;
    }
  };
  
  //Función para verificar el correo electrónico
  // Esta función se usa para verificar el correo electrónico después del registro
  const verifyEmail = async (verificationCode) => {
    try {
      const data = await API_FETCH_JSON(`${endpoint}/verifyCodeEmail`, {
        method: 'POST',
        body: { verificationCode },
      });

      return data;

    } catch (error) {
      toast.error(error.message || 'Error al verificar el correo');
      throw error;
    }
  };

  // Retorna las funciones para ser usadas en los componentes
  return { handleRegister, verifyEmail };
};


export default useFetchRegisterVet;