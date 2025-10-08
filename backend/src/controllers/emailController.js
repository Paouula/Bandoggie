 import { sendMail, HTMLSimpleBankingEmail } from '../utils/bankingEmails.js';
import validator from 'validator';

// Crear el objeto emailController
const emailController = {};

// Método simplificado para envío de email bancario
emailController.sendSimpleBankingEmail = async (req, res) => {
  try {
    console.log('📧 Iniciando envío de email bancario simplificado...');
    console.log('📥 Request body:', req.body);
    
    const { customerName, email, totalAmount, orderNumber } = req.body;

    // Validaciones mejoradas
    if (!customerName || !email || !totalAmount) {
      console.error('❌ Datos faltantes:', { customerName, email, totalAmount });
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos: customerName, email, totalAmount'
      });
    }

    // Validar email
    if (!validator.isEmail(email)) {
      console.error('❌ Email inválido:', email);
      return res.status(400).json({
        success: false,
        error: 'Formato de email inválido'
      });
    }

    // Validar totalAmount
    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      console.error('❌ Monto inválido:', totalAmount);
      return res.status(400).json({
        success: false,
        error: 'El monto debe ser un número mayor a cero'
      });
    }

    console.log('📤 Enviando email a:', email);
    console.log('💰 Monto:', amount);
    console.log('📋 Referencia:', orderNumber);

    // Generar referencia corta si no existe
    const shortReference = orderNumber || `REF${Date.now().toString().slice(-6)}`;

    // Texto plano del email (MEJORADO)
    const textContent = `
Hola ${customerName},

¡Gracias por tu compra en BanDoggie!

DATOS PARA TRANSFERENCIA BANCARIA:
=====================================
Banco: Banco Agrícola
Tipo de cuenta: Cuenta de Ahorro
Número de cuenta: 3680297372
Titular: XIOMARA CASTILLO
Monto a transferir: $${amount.toFixed(2)}

Número de referencia: ${shortReference}

INSTRUCCIONES:
- Realiza la transferencia por el monto exacto
- Conserva el comprobante de transferencia
- Una vez realizada, nos comunicaremos contigo para coordinar la entrega
- Tiempo de procesamiento: 24-48 horas hábiles

¡Gracias por confiar en BanDoggie!

---
© 2024 BanDoggie - Cuidamos a tu mejor amigo
    `.trim();

    // Generar HTML del email
    console.log('🎨 Generando template HTML...');
    const htmlContent = HTMLSimpleBankingEmail(customerName, amount, shortReference);
    
    console.log('📮 Configuración del email preparada');
    console.log('📧 Destinatario:', email);
    console.log('📝 Asunto: Datos para transferencia bancaria - BanDoggie');
    console.log('🎨 HTML generado:', htmlContent.length, 'caracteres');

    // Enviar el email usando la función importada
    const info = await sendMail(
      email,
      'Datos para transferencia bancaria - BanDoggie',
      textContent,
      htmlContent
    );

    console.log('✅ Email enviado exitosamente:', {
      messageId: info.messageId,
      to: email,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Email con datos bancarios enviado correctamente',
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
      reference: shortReference
    });

  } catch (error) {
    console.error('❌ Error enviando email bancario:', error);
    
    let errorMessage = 'Error interno del servidor';
    let statusCode = 500;

    // Manejo específico de errores de nodemailer
    if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticación con Gmail. Verificar credenciales.';
      statusCode = 401;
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Error de conexión con el servidor de Gmail';
      statusCode = 503;
    } else if (error.responseCode === 550) {
      errorMessage = 'Email del destinatario no válido o rechazado';
      statusCode = 400;
    } else if (error.message && error.message.includes('HTMLSimpleBankingEmail')) {
      errorMessage = 'Error en el template del email';
      statusCode = 500;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// EXPORTACIÓN POR DEFECTO - ESTO ES CRUCIAL
export default emailController;