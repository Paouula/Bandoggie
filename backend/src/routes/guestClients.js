import express from "express";
import guestClientsController from "../controllers/guestClientsController.js";

const router = express.Router();

router
  .route("/")
  .get(guestClientsController.getAllGuestClients)
  .post(guestClientsController.insertGuestClients);

router
  .route("/:id")
  .put(guestClientsController.updateGuestClients)
  .delete(guestClientsController.deleteGuestClients);

export default router;