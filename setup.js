const { Client } = require("pg");

// Conexión a PostgreSQL 
const createDatabase = async () => {
  const client = new Client({
    user: "postgres", 
    host: "localhost",
    port: 5432, 
    password: "123456", 
  });

  try {
    await client.connect();
    console.log("Conectado a PostgreSQL");

    // Crear la base de datos
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


const setupDatabase = async () => {
  const client = new Client({
    user: "postgres", 
    host: "localhost",
    port: 5432, 
    database: "agronova", 
    password: "123456", 
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
        price DECIMAL,
        image_url VARCHAR(255)
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

const runSetup = async () => {
  await createDatabase(); 
  await setupDatabase(); 
};

runSetup();
