const pool = require('../db/db');

const obtenerPedidos = async (req, res) => {
  try {
    // Obtener pedidos desde la base de datos
    const { rows } = await pool.query('SELECT * FROM pedidos');

    // Ejemplo de respuesta, ajusta según tus necesidades
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const crearPedido = async (req, res) => {
  const { idCliente, nombre_cliente, productos, total } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insertar un nuevo pedido
    const nuevoPedido = await client.query(
      'INSERT INTO pedidos (id_cliente, fecha, estado) VALUES ($1, CURRENT_TIMESTAMP, $2) RETURNING id_pedido',
      [idCliente, 'Pendiente']
    );

    const idPedido = nuevoPedido.rows[0].id_pedido;

    // Realizar la inserción en el historial_pedidos a través de la función de trigger

    await client.query('COMMIT');

    res.status(201).json({ mensaje: 'Pedido creado exitosamente', idPedido });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
};


const modificarPedido = async (req, res) => {
  const { idPedido } = req.params;
  const { nuevoEstado } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Modificar el estado del pedido
    const result = await client.query(
      'UPDATE pedidos SET estado = $1 WHERE id_pedido = $2 RETURNING *',
      [nuevoEstado, idPedido]
    );

    await client.query('COMMIT');

    if (result.rows.length > 0) {
      res.status(200).json({ mensaje: 'Pedido modificado exitosamente' });
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al modificar el pedido:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
};

const eliminarPedido = async (req, res) => {
  const { idPedido } = req.params;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Eliminar el pedido
    await client.query(
      'DELETE FROM pedidos WHERE id_pedido = $1',
      [idPedido]
    );

    await client.query('COMMIT');
    res.status(200).json({ mensaje: 'Pedido eliminado exitosamente' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al eliminar el pedido:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
};

module.exports = {
  obtenerPedidos,
  crearPedido,
  modificarPedido,
  eliminarPedido
};
