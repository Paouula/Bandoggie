import express from "express";
import ordersController from "../controllers/ordersController.js";

const router = express.Router();

router.route("/")
  .get(ordersController.getOrder)
  .post(ordersController.createOrder);


export default router;