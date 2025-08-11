import express from 'express';
import vetsControllers from '../controllers/vetsControllers.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'public/' });

router.route('/')
.get(vetsControllers.get)

router.route('/:id')
.put(upload.single('image'), vetsControllers.put)
.delete(vetsControllers.delete)

export default router