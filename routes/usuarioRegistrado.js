const express = require("express");
const router = express.Router();
const UsuarioRegistradoController = require("../controllers/usuarioRegistrado.controller");

router.post("/agregar", UsuarioRegistradoController.agregarUsuarioRegistrado);
router.put("/modificar", UsuarioRegistradoController.modificarUsuarioRegistrado);
router.delete("/eliminar", UsuarioRegistradoController.eliminarUsuarioRegistrado);
router.get("/traerTodos", UsuarioRegistradoController.traerUsuariosRegistrados);
router.post("/login", UsuarioRegistradoController.login);

module.exports = router;