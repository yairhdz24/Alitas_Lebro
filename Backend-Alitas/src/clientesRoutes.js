// // clientesRoutes.js

const express = require("express");
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Definir rutas para operaciones relacionadas con clientes
router.post("/", clientesController.createCliente);
router.get("/", clientesController.getAllClientes);
router.get("/:id", clientesController.getClientesId);
router.patch("/:id", clientesController.updateCliente);
router.delete("/:id", clientesController.deleteCliente);
// Otros endpoints según sea necesario

module.exports = router;
