const express = require("express");
const router = express.Router();
const ReseniaController = require("../controllers/resenia.controller");

router.post("/agregar", ReseniaController.agregarResenia);
router.put("/modificar", ReseniaController.modificarResenia);
router.delete("/eliminar", ReseniaController.eliminarResenia);
router.post("/verificarCompraPrevia", ReseniaController.verificarCompraPrevia);

module.exports = router;