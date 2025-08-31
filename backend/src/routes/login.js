import express from 'express';
import loginController from '../controllers/loginControllers.js';

const router = express.Router();

// Login
router.post('/', loginController.login);

// Obtener perfil autenticado
router.get("/auth/me", loginController.getAuthenticatedUser);

// Actualizar perfil
router.put("/auth/me/update", loginController.updateProfile);

export default router;
