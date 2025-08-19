// routes/emailRoutes.js
import { Router } from 'express';
import emailController from '../controllers/emailController.js';

const router = Router();

// POST /api/send-banking-email - Enviar email con datos bancarios
router.post('/send-banking-email', emailController.sendBankingEmail);

// POST /api/send-email - Enviar email genérico
router.post('/send-email', emailController.sendGenericEmail);

// GET /api/verify-email-config - Verificar configuración de email
router.get('/verify-email-config', emailController.verifyEmailConfig);

export default router;