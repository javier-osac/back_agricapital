module.exports = (client) => {
  const getAllProducts = async (req, res) => {
    try {
      const result = await client.query("SELECT * FROM products");
      const productosConDescuento = result.rows.map((product) => {
        const descuento = product.category.toLowerCase() === "abonos" ? 0.1 : 0;
        const precioFinal = parseFloat(product.price) * (1 - descuento);
        return {
          ...product,
          descuento: descuento * 100 + "%",
          precio_final: precioFinal.toFixed(2),
        };
      });

      res.json(productosConDescuento);
    } catch (error) {
      console.error("Error al obtener los productos", error);
      res.status(500).json({
        error: "Hubo un error al obtener los productos",
        message: error.message,
      });
    }
  };

  const getProductById = async (req, res) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    try {
      const result = await client.query("SELECT * FROM products WHERE id = $1", [
        productId,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      const product = result.rows[0];

      // Lógica de descuento
      let discount = 0;
      if (product.category.toLowerCase().trim() === "abonos") {
        discount = 10;
      }

      const discountAmount = (product.price * discount) / 100;
      const finalPrice = product.price - discountAmount;  

      res.json({
        ...product,
        discount: discount > 0 ? `${discount}%` : null,
        final_price: discount > 0 ? finalPrice : product.price,
      });
    } catch (error) {
      console.error("Error al obtener el producto", error);
      res.status(500).json({ error: "Hubo un error al obtener el producto" });
    }
  };

  return {
    getAllProducts,
    getProductById,
  };
};
