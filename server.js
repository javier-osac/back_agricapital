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

// Conectar a la base de datos
client
  .connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((err) => {
    console.error("Error al conectar a PostgreSQL", err.stack);
    process.exit(1); // Salir si no se puede conectar
  });

// Importar las rutas
const productsRoutes = require("./routes/products")(client); // Verifica que la ruta sea correcta
app.use("/api/products", productsRoutes); // Usar el router aquí

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
app.get("/debug", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Falló la consulta", message: error.message });
  }
});

