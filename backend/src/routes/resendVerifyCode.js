import express from 'express';
import verifyCodeControllers from '../controllers/verifyCodeControllers.js';

const router = express.Router()

router.route('/').post(verifyCodeControllers.resend);

export default router