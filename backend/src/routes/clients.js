import express from 'express';
import clientsControl from '../controllers/clientsControllers.js';

const router = express.Router();

router.route('/').get(clientsControl.get).post(clientsControl.post);

router.route('/:id').put(clientsControl.put).delete(clientsControl.delete);

export default router