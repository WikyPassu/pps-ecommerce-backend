const express = require("express");
const router = express.Router();
const TurnoController = require("../controllers/turno.controller");

router.post("/agregar", TurnoController.agregarTurno);
router.put("/modificar", TurnoController.modificarTurno);
router.delete("/eliminar", TurnoController.eliminarTurno);
router.get("/traerTodos", TurnoController.traerTurnos);
router.post("/traerTodosUsuario", TurnoController.traerTurnosUsuario);

module.exports = router;