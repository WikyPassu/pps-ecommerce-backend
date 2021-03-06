const express = require("express");
const router = express.Router();
const MetodoPagoController = require("../controllers/metodoPago.controller");

router.post("/realizarPago", MetodoPagoController.realizarPago);
router.post("/obtenerComprador", MetodoPagoController.getPayerByPaymentId);
router.post("/obtenerPagosPorEmail", MetodoPagoController.getAllPaymentsByEmail);

module.exports = router;