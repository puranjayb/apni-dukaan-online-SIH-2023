const Product = require("../../models/Product");

const getProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = getProduct;
