import { Router } from "express";
import cartController from "../controllers/cartController.js";

const router = Router();

// Obtener todos los carritos
router.get("/", cartController.getAll);

// Obtener un carrito por ID
router.get("/:id", cartController.getById);

// Crear un nuevo carrito
router.post("/", cartController.create);

// Actualizar un carrito
router.put("/:id", cartController.update);

// Eliminar un carrito
router.delete("/:id", cartController.delete);

export default router;