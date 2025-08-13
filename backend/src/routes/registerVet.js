import express from 'express';
import registerVetController from '../controllers/registerVetControllers.js';
import verifyCodeControllers from '../controllers/verifyCodeControllers.js';
import multer from 'multer';

const router = express.Router()
const upload = multer({ dest: 'public/' });

router.post('/', upload.single('image'), registerVetController.register);
router.route('/verifyCodeEmail').post(verifyCodeControllers.verifyEmail);

export default router;
