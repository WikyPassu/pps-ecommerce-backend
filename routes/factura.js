const express = require("express");
const router = express.Router();
const FacturaController = require("../controllers/factura.controller");

router.post("/agregar", FacturaController.agregarFactura);
router.put("/modificar", FacturaController.modificarFactura);
router.delete("/eliminar", FacturaController.eliminarFactura);
router.get("/traerTodas", FacturaController.traerFacturas);
router.post("/traerTodasUsuario", FacturaController.traerFacturasUsuario);
router.post("/traerTodasTemporada", FacturaController.traerFacturasTemporada);

module.exports = router;