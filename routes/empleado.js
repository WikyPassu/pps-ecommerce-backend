const express = require("express");
const router = express.Router();
const EmpleadoController = require("../controllers/empleado.controller");

router.post("/agregar", EmpleadoController.agregarEmpleado);
router.put("/modificar", EmpleadoController.modificarEmpleado);
router.delete("/eliminar", EmpleadoController.eliminarEmpleado);
router.get("/traerTodos", EmpleadoController.traerEmpleados);
router.get("/login", EmpleadoController.login);

module.exports = router;