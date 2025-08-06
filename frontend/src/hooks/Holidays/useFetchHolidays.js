import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config';

const useFetchHolidays = () => {
    const endpoint = 'holiday';

    const handleGetHolidays = async () => {
        try {
            const data = await API_FETCH_JSON(endpoint);
            return data;
        } catch (error) {
            toast.error('Error al obtener las festividades');
            console.error(error);
        }
    };

    const handlePostHoliday = async ( holidayData ) => {
        try {
            const data = await API_FETCH_JSON(endpoint, {
                method: 'POST',
                body:  holidayData ,
            });

            toast.success('Festividad creada exitosamente');
            return data;

        } catch (error) {
            toast.error('Error al crear la festividad');
            console.error(error);
        }
    };
    return { handleGetHolidays, handlePostHoliday };
};

export default useFetchHolidays;
