import express from "express"
import categoriesControllers from "../controllers/categoriesControllers.js"

const router = express.Router();

router 
.route("/")
.get(categoriesControllers.getcategorias)
.post(categoriesControllers.createcategorias);

router
.route("/:id")
.put(categoriesControllers.updatecategorias)
.delete(categoriesControllers.deletecategorias);

export default router;