// emailController.js
import nodemailer from 'nodemailer';
import { config } from '../config.js'; // Ajusta según tu estructura

const emailController = {};

// Configuración del transportador de email
const createTransporter = () => {
  try {
    // Configuración para Gmail (puedes cambiar según tu proveedor)
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: config.email?.user || process.env.EMAIL_USER, // tu-email@gmail.com
        pass: config.email?.password || process.env.EMAIL_PASSWORD // tu-contraseña-de-aplicación
      },
      // Para otros proveedores como Outlook, Yahoo, etc:
      /*
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
      */
    });
  } catch (error) {
    console.error('Error creating email transporter:', error);
    throw error;
  }
};

// Enviar email con datos bancarios
emailController.sendBankingEmail = async (req, res) => {
  try {
    const { to, subject, html, orderInfo } = req.body;

    // Validaciones
    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: to, subject, html'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      });
    }

    console.log(`📧 Preparando envío de email a: ${to}`);

    // Crear transportador
    const transporter = createTransporter();

    // Verificar conexión
    await transporter.verify();
    console.log('✅ Conexión de email verificada');

    // Configurar email
    const mailOptions = {
      from: {
        name: 'BanDoggie',
        address: config.email?.user || process.env.EMAIL_USER
      },
      to: to,
      subject: subject,
      html: html,
      // Email alternativo en texto plano
      text: `
Hola ${orderInfo?.customerName || 'Cliente'},

Tu pedido ha sido registrado exitosamente.

Datos para transferencia bancaria:
- Banco: Banco Agrícola
- Tipo de cuenta: Cuenta de Ahorro
- Número de cuenta: 3680297372
- Titular: XIOMARA CASTILLO
- Monto a transferir: $${orderInfo?.total || '0.00'}

Número de orden: ${orderInfo?.orderNumber || 'N/A'}

Una vez realices la transferencia, nos comunicaremos contigo para coordinar la entrega.

¡Gracias por confiar en BanDoggie!
Cuidamos a tu mejor amigo con amor 🐾
      `
    };

    // Enviar email
    const info = await transporter.sendEmail(mailOptions);
    
    console.log('✅ Email enviado exitosamente:', info.messageId);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      data: {
        messageId: info.messageId,
        to: to,
        orderNumber: orderInfo?.orderNumber,
        sentAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Error enviando email:', error);

    // Respuesta de error
    res.status(500).json({
      success: false,
      message: 'Error al enviar el email',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Enviar email genérico
emailController.sendGenericEmail = async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: {
        name: 'BanDoggie',
        address: config.email?.user || process.env.EMAIL_USER
      },
      to: to,
      subject: subject,
      html: html,
      text: text
    };

    const info = await transporter.sendEmail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      data: {
        messageId: info.messageId,
        to: to,
        sentAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error enviando email genérico:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el email',
      error: error.message
    });
  }
};

// Verificar configuración de email
emailController.verifyEmailConfig = async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();

    res.status(200).json({
      success: true,
      message: 'Configuración de email verificada correctamente',
      config: {
        service: 'gmail',
        user: config.email?.user || process.env.EMAIL_USER,
        configured: !!(config.email?.user || process.env.EMAIL_USER)
      }
    });

  } catch (error) {
    console.error('Error verificando configuración de email:', error);
    res.status(500).json({
      success: false,
      message: 'Error en la configuración de email',
      error: error.message
    });
  }
};

export default emailController;