const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/producto.controller");

router.post("/agregar", ProductoController.agregarProducto);
router.put("/modificar", ProductoController.modificarProducto);
router.delete("/eliminar", ProductoController.eliminarProducto);
router.get("/buscar", ProductoController.buscarProductos);
router.get("/traerTodos", ProductoController.traerProductos);

module.exports = router;