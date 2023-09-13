const Store = require("../../models/Store");
const Product = require("../../models/Product");

const products = async (req, res) => {
  const { id } = req.body;

  try {
    const response = [];
    const products = [];

    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    response.push(store);

    for (const prodId of store.products) {
      const product = await Product.findOne({ _id: prodId });

      if (product) {
        products.push(product);
      } else {
        store.products = store.products.filter(
          (productId) => productId !== prodId,
        );
        await store.save();
      }
    }

    response.push(products);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = products;
