// pedidosRoutes.js
const express = require("express");
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Definir rutas para operaciones relacionadas con pedidos

// Rutas de pedidos
router.get('/', pedidosController.obtenerPedidos);
router.get('/:id', pedidosController.obtenerPedidoPorId);
router.post('/', pedidosController.crearPedido);
router.patch("/:id", pedidosController.modificarPedido);
router.delete("/:id", pedidosController.eliminarPedido);
// Otras rutas relacionadas con pedidos, si es necesario

module.exports = router;
