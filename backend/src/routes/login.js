import express from 'express';
import loginController from '../controllers/loginControllers.js';

const router = express.Router();

router.post('/', loginController.login);
router.get("/auth/me", loginController.getAuthenticatedUser);

export default router;