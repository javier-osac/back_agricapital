const express = require("express");

// Exportar una función que recibe `client`
module.exports = (client) => {
  const router = express.Router();

  // Importar las funciones del controlador, pasándole el client
  const { getAllProducts, getProductById } = require("../controllers/products")(client);

  // Definir las rutas
  router.get("/", getAllProducts);
  router.get("/:id", getProductById);

  return router;
};
