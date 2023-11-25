// pedidosRoutes.js
const express = require("express");
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Definir rutas para operaciones relacionadas con pedidos

// Rutas de pedidos
router.get('/', pedidosController.obtenerPedidos);
router.post('/', pedidosController.crearPedido);
router.put("/modificar/:idPedido", pedidosController.modificarPedido);
router.delete("/eliminar/:idPedido", pedidosController.eliminarPedido);
// Otras rutas relacionadas con pedidos, si es necesario

module.exports = router;

// prueba