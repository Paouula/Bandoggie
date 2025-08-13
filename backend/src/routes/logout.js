import express from 'express';
import logoutControl from '../controllers/logoutControllers.js';

const router = express.Router();

router.post('/', logoutControl.logout);

export default router;
