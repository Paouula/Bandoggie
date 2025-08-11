import express from 'express';
import vetsControllers from '../controllers/vetsControllers.js';

const router = express.Router();

router.route('/')
.get(vetsControllers.get)

router.route('/:id')
.put(vetsControllers.put)
.delete(vetsControllers.delete)

export default router