import { Router } from "express";
import ordersController from '../controllers/ordersControllers.js';

const router = Router();

// Estadísticas y filtros (IMPORTANTE: estas rutas deben ir ANTES de las rutas con parámetros)
router.get('/stats', ordersController.getOrdersStats);                         // GET /api/Orders/stats
router.get('/payment/:paymentMethod', ordersController.getOrdersByPaymentMethod); // GET /api/Orders/payment/:paymentMethod
router.get('/date-range', ordersController.getOrdersByDateRange);             // GET /api/Orders/date-range

// Operaciones CRUD básicas
router.get('/', ordersController.getOrders);           // GET /api/Orders - Obtener todas las órdenes
router.post('/', ordersController.createOrder);        // POST /api/Orders - Crear nueva orden
router.get('/:id', ordersController.getOrderById);     // GET /api/Orders/:id - Obtener orden por ID
router.put('/:id', ordersController.updateOrder);      // PUT /api/Orders/:id - Actualizar orden por ID
router.delete('/:id', ordersController.deleteOrder);   // DELETE /api/Orders/:id - Eliminar orden por ID

export default router;