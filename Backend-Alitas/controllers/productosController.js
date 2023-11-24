const pool = require("../db/db");

const addProducto = async (req, res) => {
  // Ruta para agregar un nuevo producto
  try {
    const { nombre, precio, descripcionproducto} = req.body;

    const results = await pool.query(
      "INSERT INTO Productos (Nombre, Precio) VALUES ($1, $2, $3) RETURNING *",
      [nombre, precio, descripcionproducto] 
    );

    res.json(results.rows[0]);
    console.log("Se insertó el producto con éxito", results.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const getAllProductos = async (req, res) => {
  // Ruta para obtener todos los productos
  try {
    const results = await pool.query("SELECT * FROM Productos");
    res.json(results.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const getProductoById = async (req, res) => {
  // Pedir productos por id específico
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT * FROM Productos WHERE ID_Producto = $1",
      [id]
    );

    if (results.rows.length === 0) {
      console.log("Se encontró el producto");
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(results.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const updateProducto = async (req, res) => {
  // Ruta para actualizar un solo atributo de un producto por su ID
  try {
    const { id } = req.params;
    const { nombre, precio, descripcionproducto } = req.body;

    // Verificar que al menos un atributo haya sido proporcionado
    if (!nombre && !precio && !descripcionproducto) {
      return res.status(400).json({
        error: "Proporcione al menos un atributo para la actualización",
      });
    }

    // Construir objeto con atributos que se van a actualizar
    const updateFields = {};
    if (nombre) updateFields.Nombre = nombre;
    if (precio) updateFields.Precio = precio;
    if (descripcionproducto) updateFields.DescripcionProducto = descripcionproducto;

    const updateQuery = {
      text:
        "UPDATE Productos SET " +
        Object.keys(updateFields)
          .map((key, index) => `${key} = $${index + 1}`)
          .join(", ") +
        " WHERE ID_Producto = $" +
        (Object.keys(updateFields).length + 1) +
        " RETURNING *",
      values: [...Object.values(updateFields), id],
    };

    const results = await pool.query(updateQuery);

    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado para la actualización" });
    }

    res.json(results.rows[0]);
    console.log("Se actualizó el producto con éxito", results.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error interno del servidor");
  }
};

const deleteProducto = async (req, res) => {
  // Ruta para eliminar un producto por su ID
  try {
    const { id } = req.params;

    const deleteQuery = {
      text: "DELETE FROM Productos WHERE ID_Producto = $1 RETURNING *",
      values: [id],
    };

    const results = await pool.query(deleteQuery);

    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado para la eliminación" });
    }

    res.json({
      message: "Producto eliminado con éxito",
      deletedProducto: results.rows[0],
    });
    console.log("Se eliminó el producto con éxito", results.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  addProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};

//funcionando con exito
