import { sendMail, HTMLBankingEmail } from '../utils/BankingEmail.js';
import validator from 'validator';

const emailController = {};

// Controlador para enviar email con datos bancarios
emailController.sendBankingEmail = async (req, res) => {
  try {
    console.log('ðŸ“§ Iniciando envÃ­o de email bancario...');
    const { orderData } = req.body;

    // Validar que vengan los datos de la orden
    if (!orderData || !orderData.customerInfo || !orderData.customerInfo.email) {
      console.error('âŒ Datos de orden incompletos:', { orderData });
      return res.status(400).json({
        success: false,
        error: 'Datos de orden incompletos'
      });
    }

    // Validar formato de email
    if (!validator.isEmail(orderData.customerInfo.email)) {
      console.error('âŒ Formato de email invÃ¡lido:', orderData.customerInfo.email);
      return res.status(400).json({
        success: false,
        error: 'Formato de email invÃ¡lido'
      });
    }

    console.log('ðŸ“¤ Enviando email bancario a:', orderData.customerInfo.email);
    console.log('ðŸ“‹ Orden:', orderData.orderNumber);

    // Enviar el email usando el util
    const info = await sendMail(
      orderData.customerInfo.email,
      'Datos para transferencia bancaria - BanDoggie',
      `Hola ${orderData.customerInfo.nombre}, aquÃ­ estÃ¡n los datos para tu transferencia bancaria. NÃºmero de orden: ${orderData.orderNumber}. Total: $${orderData.total.toFixed(2)}`,
      HTMLBankingEmail(orderData)
    );

    console.log('âœ… Email bancario enviado exitosamente:', {
      messageId: info.messageId,
      to: orderData.customerInfo.email,
      orderNumber: orderData.orderNumber,
      timestamp: new Date().toISOString()
    });

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Email con datos bancarios enviado correctamente',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('âŒ Error enviando email bancario:', error);

    // Manejo especÃ­fico de errores
    let errorMessage = 'Error interno del servidor';
    let statusCode = 500;

    if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticaciÃ³n con Gmail. Verificar credenciales.';
      statusCode = 401;
      console.error('ðŸ” Error de autenticaciÃ³n - Verificar EMAIL_USER y EMAIL_PASS');
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Error de conexiÃ³n con el servidor de Gmail';
      statusCode = 503;
      console.error('ðŸŒ Error de conexiÃ³n - Verificar internet/firewall');
    } else if (error.responseCode === 550) {
      errorMessage = 'Email del destinatario no vÃ¡lido o rechazado';
      statusCode = 400;
      console.error('ðŸ“§ Email rechazado:', error.response);
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Controlador para enviar email genÃ©rico
emailController.sendGenericEmail = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    // Validar datos requeridos
    if (!to || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos: to, subject'
      });
    }

    // Validar formato de email
    if (!validator.isEmail(to)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de email invÃ¡lido'
      });
    }

    console.log('ðŸ“¤ Enviando email genÃ©rico a:', to);
    console.log('ðŸ“‹ Asunto:', subject);
    
    // Enviar el email usando el util
    const info = await sendMail(to, subject, text || '', html || '');

    console.log('âœ… Email genÃ©rico enviado exitosamente:', {
      messageId: info.messageId,
      to: to,
      subject: subject,
      timestamp: new Date().toISOString()
    });

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('âŒ Error enviando email genÃ©rico:', error);

    // Manejo especÃ­fico de errores
    let errorMessage = 'Error interno del servidor';
    let statusCode = 500;

    if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticaciÃ³n con Gmail. Verificar credenciales.';
      statusCode = 401;
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Error de conexiÃ³n con el servidor de Gmail';
      statusCode = 503;
    } else if (error.responseCode === 550) {
      errorMessage = 'Email del destinatario no vÃ¡lido o rechazado';
      statusCode = 400;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Controlador para verificar configuraciÃ³n de email
emailController.verifyEmailConfig = async (req, res) => {
  try {
    console.log('ðŸ” Verificando configuraciÃ³n de email...');
    
    // Intentar enviar un email de prueba a nosotros mismos
    const testInfo = await sendMail(
      process.env.ADMIN_EMAIL || 'test@test.com',
      'Test - VerificaciÃ³n de configuraciÃ³n BanDoggie',
      'Este es un email de prueba para verificar la configuraciÃ³n.',
      '<p>âœ… <strong>ConfiguraciÃ³n de Gmail vÃ¡lida</strong><br>El sistema de emails estÃ¡ funcionando correctamente.</p>'
    );
    
    console.log('âœ… ConfiguraciÃ³n de Gmail vÃ¡lida');
    
    res.status(200).json({
      success: true,
      message: 'ConfiguraciÃ³n de Gmail vÃ¡lida',
      timestamp: new Date().toISOString(),
      testMessageId: testInfo.messageId
    });
  } catch (error) {
    console.error('âŒ Error en configuraciÃ³n de Gmail:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error en configuraciÃ³n de Gmail',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default emailController;