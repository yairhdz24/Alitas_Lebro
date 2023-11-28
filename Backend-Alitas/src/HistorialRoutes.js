const express = require("express");
const router = express.Router();
const HistorialpedidosController = require('../controllers/HistorialpedidosController');

router.get("/", HistorialpedidosController.getAllHistory);


module.exports = router;