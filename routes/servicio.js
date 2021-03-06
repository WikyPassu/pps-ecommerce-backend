const express = require("express");
const router = express.Router();
const ServicioController = require("../controllers/servicio.controller");

router.post("/agregar", ServicioController.agregarServicio);
router.put("/modificar", ServicioController.modificarServicio);
router.delete("/eliminar", ServicioController.eliminarServicio);
router.post("/buscar", ServicioController.buscarServicios);
router.get("/traerTodos", ServicioController.traerServicios);
router.get("/traerMasVendido", ServicioController.traerMasVendido);
router.get("/traerMasVendidos", ServicioController.traerMasVendidos);

module.exports = router;