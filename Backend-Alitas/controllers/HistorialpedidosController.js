const pool = require("../db/db");


const getAllHistory = async (req, res) => {
    try {
      console.log("Obteniendo historial de pedidos...");
      const results = await pool.query("SELECT * FROM historial_pedidos");
      console.log("Historial de pedidos obtenido:", results.rows);
      res.json(results.rows);
    } catch (error) {
      console.error("Error al obtener historial de pedidos:", error.message);
      res.status(500).send("Error interno del servidor");
    }
  };


  module.exports = {
    getAllHistory,
  };
  