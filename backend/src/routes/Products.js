import express from 'express';
import productsController from '../controllers/productsControllers.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'designImages', maxCount: 10 }
]);

// Rutas principales
router.route('/')
  .get(productsController.getProduct)
  .post(upload, productsController.insertProduct);

// Ruta para obtener producto por ID
router.route('/:id')
  .get(productsController.getProductById)
  .put(upload, productsController.updateProduct)
  .delete(productsController.deleteProduct);

// Rutas para filtrar productos
router.route('/category/:categoryId')
  .get(productsController.getProductsByCategory);

router.route('/holiday/:holidayId')
  .get(productsController.getProductsByHoliday);

export default router;
