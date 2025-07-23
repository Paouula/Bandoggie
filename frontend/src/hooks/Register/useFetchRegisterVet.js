import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config.js';

//Hook para registro de veterinarias
const useFetchRegisterVet = () => {
  const endpoint = 'registerVet';

  // Función para registrar veterinarias
  const handleRegister = async (nameVet, email, password, locationVet, nitVet) => {
    try {
      const data = await API_FETCH_JSON(endpoint, {
        method: 'POST',
        body: { nameVet, email, password, locationVet, nitVet },
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