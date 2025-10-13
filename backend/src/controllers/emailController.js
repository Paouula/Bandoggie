import { sendBankingMail } from '../utils/bankingEmails.js';
import validator from 'validator';

const emailController = {};

// ✅ ENVIAR EMAIL BANCARIO DIRECTO CON GMAIL
emailController.sendSimpleBankingEmail = async (req, res) => {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Iniciando envío de email bancario...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📥 Request body:', JSON.stringify(req.body, null, 2));
    
    const { customerName, email, totalAmount, orderNumber } = req.body;

    // Validaciones
    if (!customerName || !email || totalAmount === undefined || totalAmount === null) {
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

    // Validar monto
    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      console.error('❌ Monto inválido:', totalAmount);
      return res.status(400).json({
        success: false,
        error: 'El monto debe ser un número mayor a cero'
      });
    }

    // Generar referencia si no existe
    const shortReference = orderNumber || `ORD-${Date.now().toString().slice(-8)}`;

    console.log('📤 Parámetros validados:');
    console.log('  - Email destino:', email);
    console.log('  - Cliente:', customerName);
    console.log('  - Monto:', `$${amount.toFixed(2)}`);
    console.log('  - Referencia:', shortReference);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // ✅ Llamar a sendBankingMail
    const info = await sendBankingMail(
      email,           // to
      customerName,    // customerName
      amount,          // totalAmount
      shortReference   // orderNumber
    );

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Email enviado exitosamente');
    console.log('  - Message ID:', info.messageId);
    console.log('  - Destinatario:', email);
    console.log('  - Timestamp:', new Date().toISOString());
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    res.status(200).json({
      success: true,
      message: 'Email con datos bancarios enviado correctamente',
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
      reference: shortReference
    });

  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ Error enviando email bancario');
    console.error('  Error:', error.message);
    console.error('  Stack:', error.stack);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    let errorMessage = 'Error interno del servidor';
    let statusCode = 500;

    // Manejo específico de errores de Gmail
    if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticación con Gmail';
      statusCode = 401;
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Error de conexión con Gmail';
      statusCode = 503;
    } else if (error.responseCode === 550) {
      errorMessage = 'Email del destinatario no válido o rechazado';
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export default emailController;