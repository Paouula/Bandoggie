import express from "express";
import OrderController from "../controllers/OrderController.js";

const router = express.Router();

// ========== RUTAS PARA ÓRDENES DE CLIENTES ==========
router.get("/orders", OrderController.getAll);
router.get("/orders/:id", OrderController.getById);
router.post("/orders/from-cart/:cartId", OrderController.createFromCart);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.delete);

// ========== RUTAS PARA ÓRDENES INTERNAS (KANBAN) ==========
router.post("/ordenes", OrderController.crearOrdenInterna);
router.get("/ordenes", OrderController.obtenerOrdenesInternas);
router.put("/ordenes/:id", OrderController.actualizarOrdenInterna);
router.delete("/ordenes/:id", OrderController.eliminarOrdenInterna);

export default router;