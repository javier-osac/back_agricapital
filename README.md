BACKEND AGRONOVA

API REST básica implementando los requerimientos solicitados, con manejo de productos agrícolas en memoria.

API REST Básica:
•	GET /api/products: Devuelve listado completo de productos
•	GET /api/products/:id: Detalle de producto específico (opcional implementado)


Instalación: 
https://github.com/javier-osac/back_agricapital.git
cd back_agricapital
npm install
npm start

2. Lógica y Validaciones
Cálculo de precios: Aplica descuentos

Manejo de errores:
404 si producto no existe
400 para solicitudes inválidas
500 para errores internos


3.  Estructura del proyecto 

![image](https://github.com/user-attachments/assets/73dfbc38-9938-42b8-a400-cda7b3aebee7)


4. Endpoints Implementados:

Método	Ruta	Descripción
GET	/api/products	Lista todos los productos
GET	/api/products/:id	Detalle de producto por ID


 Ejemplo de Respuesta
GET /api/products/1
{
  "id": 1,
  "name": "Desbrozadora",
  "price": 450000,
  "discount": "0%",
  "finalPrice": 450000,
  "category": "herramientas"
}

 Validaciones Implementadas
1.	Cálculo de precio final:

function applyDiscount(price, discount) {
  return discount !== "0%" 
    ? price * (1 - parseFloat(discount)/100)
    : price;
}
Manejo de errores:
if (!product) {
  return res.status(404).json({ error: "Producto no encontrado" });
}

Calidad de Código:
•	ESLint: Configuración estándar para JavaScript
•	Prettier: Formateo automático de código
•	Estructura por capas: Separación clara de responsabilidades



