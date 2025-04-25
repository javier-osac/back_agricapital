const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3000;

// Conexión a la base de datos
const client = new Client({
  user: "postgres", // Usuario de PostgreSQL
  host: "localhost",
  database: "agronova", // Nombre de la base de datos
  password: "123456", // Contraseña de PostgreSQL
  port: 5432, // Puerto por defecto
});

client
  .connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((err) => {
    console.error("Error al conectar a PostgreSQL", err.stack);
    process.exit(1); // Salir si no se puede conectar
  });

// Importar las rutas
const productsRoutes = require("./routes/productRoutes");
app.use("/api/products", productsRoutes);

// Endpoint GET para obtener todos los productos
app.get("/api/products", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products");
    res.json(result.rows); // Devolver los productos como respuesta en formato JSON
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ error: "Hubo un error al obtener los productos" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
