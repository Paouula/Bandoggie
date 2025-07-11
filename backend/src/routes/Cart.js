import { Router } from "express";
import CartController from "../controllers/cartController.js";

const router = Router();

// Obtener todos los carritos
router.get("/", CartController.getAll);

// Obtener un carrito por ID
router.get("/:id", CartController.getById);

// Crear un nuevo carrito
router.post("/", CartController.create);

// Actualizar un carrito
router.put("/:id", CartController.update);

// Eliminar un carrito
router.delete("/:id", CartController.delete);

export default router;