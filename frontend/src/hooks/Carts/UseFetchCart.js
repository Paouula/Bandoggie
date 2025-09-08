// Hook específico para emails bancarios SIN TOKEN
const useFetchCartEmail = () => {
    
    // Enviar email bancario simplificado con fetch directo
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

            // FETCH DIRECTO SIN TOKEN - para usuarios invitados
            const response = await fetch('/api/cart/send-simple-banking-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailPayload)
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Error HTTP: ${response.status}`);
            }

            // Parsear la respuesta exitosa
            const data = await response.json();

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