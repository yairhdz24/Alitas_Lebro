const express = require("express");
const app = express();
const cors = require("cors");
const productosRoutes = require("./src/productosRoutes");
const clientesRoutes = require("./src/clientesRoutes");
const pedidosRoutes = require("./src/pedidosRoutes");

app.use(cors());
app.use(express.json());

// Configurar rutas
app.use("/productos", productosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Servidor conectado en el puerto:", port);
});












