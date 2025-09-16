import express from 'express';
import emailController from '../controllers/emailController.js';

const router = express.Router();

// POST /api/send-simple-banking-email - Enviar email bancario simplificado
router.post('/send-simple-banking-email', emailController.sendSimpleBankingEmail);

export default router;
