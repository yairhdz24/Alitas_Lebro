const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.post("/", productosController.addProducto);
router.get("/", productosController.getAllProductos);
router.get("/:id", productosController.getProductoById);
router.patch("/:id", productosController.updateProducto);
router.delete("/:id", productosController.deleteProducto);

module.exports = router;
