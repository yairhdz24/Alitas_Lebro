const pool = require("../db/db");

const obtenerPedidos = async (req, res) => {
  try {
    // Obtener pedidos desde la base de datos
    const { rows } = await pool.query("SELECT * FROM pedidos");

    // Ejemplo de respuesta, ajusta según tus necesidades
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT * FROM pedidos WHERE id_pedido = $1",
      [id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error al obtener pedido por ID:", error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const crearPedido = async (req, res) => {
  const { idCliente, productos, total  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Calcular el total sumando el precio de cada producto en el carrito
    // const totalPedido = productos.reduce((total, product) => total + product.price * product.quantity, 0);

    // Insertar un nuevo pedido con el total calculado
    const nuevoPedido = await client.query(
      "INSERT INTO pedidos (id_cliente, fecha, estado, total) VALUES ($1, CURRENT_TIMESTAMP, $2, $3) RETURNING id_pedido",
      [idCliente, "Pendiente", total ]
    );

    const idPedido = nuevoPedido.rows[0].id_pedido;

    // Realizar la inserción en el historial_pedidos a través de la función de trigger

    await client.query("COMMIT");
    console.log("Total recibido en el servidor:", total );
    console.log('Datos del pedido recibidos en el servidor:', req.body);


    res.status(201).json({ mensaje: "Pedido creado exitosamente", idPedido });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    client.release();
  }
};

const modificarPedido = async (req, res) => {
  const { id } = req.params;
  const { nuevoEstado } = req.body;

  try {
    const result = await pool.query(
      "UPDATE pedidos SET estado = $1 WHERE id_pedido = $2 RETURNING *",
      [nuevoEstado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json({ mensaje: "Pedido modificado exitosamente" });
  } catch (error) {
    console.error("Error al modificar el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const eliminarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPedido = await pool.query(
      "DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *",
      [id]
    );

    if (deletedPedido.rows.length > 0) {
      res.json({
        message: "pedido eliminado con éxito",
        deletedPedido: deletedPedido.rows[0],
      });
    } else {
      res.status(404).json({ error: "pedido no encontrado para la eliminación" });
    }
  } catch (error) {
    console.error("Error al eliminar pedido:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  modificarPedido,
  eliminarPedido
};
