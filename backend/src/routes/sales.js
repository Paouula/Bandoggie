import express from "express";
import salesChartsControllers from "../controllers/salesChartsController.js";

const router = express.Router();

// Ruta para obtener datos de ventas por categoría (gráfica de barras/pie)
router.get("/category", salesChartsControllers.getSalesChartByCategory);

// Ruta para obtener productos más vendidos (gráfica de barras horizontales)
router.get("/top-products", salesChartsControllers.getTopProductsChart);

// Ruta para obtener timeline de ventas (gráfica de líneas)
// Parámetros query: periodo (day/week/month), startDate, endDate
router.get("/timeline", salesChartsControllers.getSalesTimelineChart);

// Ruta para obtener clientes más frecuentes (gráfica de dona)
router.get("/top-clients", salesChartsControllers.getTopClientsChart);

export default router;