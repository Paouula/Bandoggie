import { API_FETCH_JSON } from '../../config';
import { toast } from 'react-hot-toast';

// Hook específico para emails bancarios SIN TOKEN
const useFetchCartEmail = () => {
    // Endpoint para enviar email bancario
    const endpoint = 'cart/send-simple-banking-email';

    // Enviar email bancario simplificado usando API_FETCH_JSON
    const sendBankingEmail = async (orderData) => {
        try {
            const loadingToast = toast.loading('Enviando datos bancarios...');

            // Solo los datos esenciales para el email
            const emailPayload = {
                customerName: `${orderData.customerInfo.nombre} ${orderData.customerInfo.apellido}`,
                email: orderData.customerInfo.email,
                totalAmount: orderData.total,
                orderNumber: orderData.orderNumber
            };

            console.log('📧 Enviando payload de email:', emailPayload);

            // Usar API_FETCH_JSON para la petición
            const data = await API_FETCH_JSON(endpoint, {
                method: 'POST',
                body: emailPayload
            });

            toast.dismiss(loadingToast);
            toast.success('Email con datos bancarios enviado correctamente');
            
            return {
                success: true,
                message: 'Email enviado correctamente',
                data: data
            };

        } catch (error) {
            console.error('❌ Error enviando email bancario:', error);
            toast.dismiss();
            
            // Manejo específico de errores
            let errorMessage = 'Error al enviar el email con datos bancarios';
            
            if (error.message.includes('401')) {
                errorMessage = 'Error de autenticación del servidor';
            } else if (error.message.includes('503')) {
                errorMessage = 'Error de conexión con el servidor';
            } else if (error.message.includes('400')) {
                errorMessage = 'Datos inválidos';
            } else if (error.message.includes('500')) {
                errorMessage = 'Error interno del servidor';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
            throw error;
        }
    };

    return {
        sendBankingEmail
    };
};