import { Router } from "express";
import reviewsController from '../controllers/reviewsControllers.js';
import multer from 'multer';

// Configuración de multer para manejar la subida de imágenes
const upload = multer({ 
  dest: 'uploads/reviews/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

const router = Router();


// Todas las reseñas de un producto por su ID
router.get('/product/:productId', reviewsController.getReviewsByProduct);

// Todas las reseñas de un cliente específico
router.get('/client/:clientId', reviewsController.getReviewsByClient);

// Todas las reseñas con una calificación específica
router.get('/qualification/:qualification', reviewsController.getReviewsByQualification);

// Estadísticas de reseñas de un producto (ej. promedio de calificación)
router.get('/stats/product/:productId', reviewsController.getProductReviewStats);

// Reseñas verificadas
router.get('/verified', reviewsController.getVerifieldReviews);

// Todas las reseñas sin filtros
router.get('/', reviewsController.getReviews);

// Una sola reseña por su ID
router.get('/:id', reviewsController.getReviewById);


// Verificar reseña
router.put('/:id/verify', reviewsController.verifyReview);

// Rechazar reseña
router.put('/:id/reject', reviewsController.rejectReview);


// Crear reseña con imágenes opcionales
router.post('/', upload.array('designImages', 5), reviewsController.insertReview);

// Actualizar reseña
router.put('/:id', reviewsController.updateReview);

// Eliminar reseña
router.delete('/:id', reviewsController.deleteReview);

export default router;
