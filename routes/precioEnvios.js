const express = require("express");
const router = express.Router();
const PrecioEnviosController = require("../controllers/precioEnvios.controller");

router.post("/agregar", PrecioEnviosController.agregarPrecioEnvios);
router.put("/modificar", PrecioEnviosController.modificarPrecioEnvios);
router.delete("/eliminar", PrecioEnviosController.eliminarPrecioEnvios);
router.get("/traerTodos", PrecioEnviosController.traerPrecioEnvios);

module.exports = router;