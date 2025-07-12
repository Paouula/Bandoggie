import express from "express";
import EmpleadosControllers from "../controllers/EmpleadosControllers.js";

const router = express.Router();

router 
.route("/")
.get(EmpleadosControllers.getempleados)
.post(EmpleadosControllers.createempleados);

router
.route("/:id")
.put(EmpleadosControllers.updateempleados)
.delete(EmpleadosControllers.deleteempleados);

export default router;