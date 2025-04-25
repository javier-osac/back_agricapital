const { Client } = require("pg");

// Conexión a PostgreSQL para crear la base de datos
const createDatabase = async () => {
  const client = new Client({
    user: "postgres", // Usuario por defecto de PostgreSQL
    host: "localhost",
    port: 5432, // Puerto por defecto de PostgreSQL
    password: "123456", // Reemplaza con tu contraseña de PostgreSQL
  });

  try {
    await client.connect();
    console.log("Conectado a PostgreSQL");

    // Crear la base de datos 'agronova' si no existe
    await client.query("CREATE DATABASE agronova");
    console.log('Base de datos "agronova" creada');
  } catch (err) {
    if (err.code === "42P04") {
      console.log('La base de datos "agronova" ya existe');
    } else {
      console.error("Error al crear la base de datos:", err);
    }
  } finally {
    await client.end();
  }
};

// Conexión a la base de datos 'agronova' para crear la tabla y agregar productos
const setupDatabase = async () => {
  const client = new Client({
    user: "postgres", // Usuario por defecto de PostgreSQL
    host: "localhost",
    port: 5432, // Puerto por defecto de PostgreSQL
    database: "agronova", // Nombre de la base de datos
    password: "123456", // Reemplaza con tu contraseña de PostgreSQL
  });

  try {
    await client.connect();
    console.log('Conectado a la base de datos "agronova"');

    // Crear la tabla 'products'
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255),
        category VARCHAR(255),
        price DECIMAL
      );
    `;
    await client.query(createTableQuery);
    console.log('Tabla "products" creada');

    // Insertar productos en la tabla 'products'
    const insertProductsQuery = `
      INSERT INTO products (product_name, category, price) VALUES
        ('Desbrozadora', 'Herramienta', 450000),
        ('Pulverizador', 'Herramienta', 115000),
        ('Sistema de riego por goteo', 'Herramienta', 1200000),
        ('Abonos foliares', 'Abonos', 32000),
        ('Abonos orgánicos', 'Abonos', 45000),
        ('Abonos minerales', 'Abonos', 25000),
        ('Maíz', 'Semillas', 95000),
        ('Arroz', 'Semillas', 88000),
        ('Frijol', 'Semillas', 92000);
    `;
    await client.query(insertProductsQuery);
    console.log('Productos insertados en la tabla "products"');
  } catch (err) {
    console.error("Error al configurar la base de datos:", err);
  } finally {
    await client.end();
  }
};

// Ejecutar ambos pasos
const runSetup = async () => {
  await createDatabase(); // Crear base de datos (si no existe)
  await setupDatabase(); // Crear tabla y agregar productos
};

runSetup();
