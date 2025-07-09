import express from 'express';
import reviewsController from '../controllers/reviewsController.js';

const router = express.Router();

// Rutas principales
router.route('/')
.get(reviewsController.getReviews)
.post(reviewsController.insertReview);

// Ruta para obtener reseña por ID
router.route('/:id')
.get(reviewsController.getReviewById)
.put(reviewsController.updateReview)
.delete(reviewsController.deleteReview);

// Rutas para filtrar reseñas
router.route('/product/:productId')
.get(reviewsController.getReviewsByProduct);

router.route('/client/:clientId')
.get(reviewsController.getReviewsByClient);

router.route('/qualification/:qualification')
.get(reviewsController.getReviewsByQualification);

// Ruta para estadísticas de reseñas por producto
router.route('/stats/product/:productId')
.get(reviewsController.getProductReviewStats);

export default router;