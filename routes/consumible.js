const express = require("express");
const router = express.Router();
const ConsumibleController = require("../controllers/consumible.controller");

router.post("/agregar", ConsumibleController.agregarConsumible);
router.put("/modificar", ConsumibleController.modificarConsumible);
router.delete("/eliminar", ConsumibleController.eliminarConsumible);
router.get("/traerTodos", ConsumibleController.traerConsumibles);
router.put("/actualizar", ConsumibleController.actualizarConsumible);

module.exports = router;