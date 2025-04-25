// routes/products.js
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador
const { getAllProducts, getProductById } = require("../controllers/products");

// Definir las rutas
router.get("/", getAllProducts); // Obtener todos los productos
router.get("/:id", getProductById); // Obtener producto por ID

// Exportar el router
module.exports = router;
