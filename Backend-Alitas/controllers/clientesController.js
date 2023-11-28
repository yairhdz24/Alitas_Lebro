const pool = require("../db/db");

const getAllClientes = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM clientes");
    res.json(results.rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const getClientesId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT * FROM clientes WHERE id_cliente = $1",
      [id]
    );

    if (results.rows.length === 0) {
      console.log("Se encontró el cliente");
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(results.rows);
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const createCliente = async (req, res) => {
  try {
    const {nombre, telefono } = req.body;

    const result = await pool.query(
      "INSERT INTO clientes (nombre, telefono) VALUES ($1, $2) RETURNING *",
      [ nombre, telefono]
    );

    res.json(result.rows[0]);
    console.log("Cliente se insertó con éxito");
  } catch (error) {
    console.error("Error al crear cliente:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    if (Object.keys(updateFields).length === 0) {
      // No se proporcionaron campos para actualizar
      return res.status(400).json({ error: "Ningún campo proporcionado para actualizar" });
    }

    // Construir dinámicamente la cláusula SET y los valores
    const setClauses = Object.keys(updateFields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(updateFields);
    values.push(id);

    // Construir la consulta SQL con la cláusula SET dinámica
    const query = `UPDATE clientes SET ${setClauses} WHERE id_cliente = $${values.length} RETURNING *`;

    // Ejecutar la consulta
    const updatedClient = await pool.query(query, values);

    if (updatedClient.rows.length > 0) {
      res.json(updatedClient.rows[0]);
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClient = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = $1 RETURNING *",
      [id]
    );

    if (deletedClient.rows.length > 0) {
      res.json({
        message: "Cliente eliminado con éxito",
        deletedCliente: deletedClient.rows[0],
      });
    } else {
      res.status(404).json({ error: "Cliente no encontrado para la eliminación" });
    }
  } catch (error) {
    console.error("Error al eliminar cliente:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  getAllClientes,
  getClientesId,
  createCliente,
  updateCliente,
  deleteCliente,
  // ... (otras funciones)
};
