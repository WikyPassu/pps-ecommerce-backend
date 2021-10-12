const express = require("express");
const router = express.Router();
const ReseniaController = require("../controllers/resenia.controller");

router.post("/agregar", ReseniaController.agregarResenia);
router.put("/modificar", ReseniaController.modificarResenia);
router.delete("/eliminar", ReseniaController.eliminarResenia);

module.exports = router;