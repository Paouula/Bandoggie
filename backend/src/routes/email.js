import express from 'express';
import emailController from '../controllers/emailController.js';

const router = express.Router();

// POST /api/send-banking-email - Enviar email con datos bancarios
router.route('/send-banking-email').post(emailController.sendBankingEmail);

// POST /api/send-email - Enviar email genÃ©rico
router.route('/send-email').post(emailController.sendGenericEmail);

// GET /api/verify-email-config - Verificar configuraciÃ³n de email
router.route('/verify-email-config').get(emailController.verifyEmailConfig);

export default router;