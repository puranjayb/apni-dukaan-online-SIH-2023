const Store = require("../../models/Store");
const Product = require("../../models/Product");

const products = async (req, res) => {
  const { id } = req.body;

  const response = [];
  const products = [];

  const store = await Store.findById(id);
  if (!store) return res.status(404).json({ message: "Store not found" });

  response.push(store);

  for (var prodId of store.products) {
    const product = await Product.findOne({ _id: prodId });
    if (!product) {
      products = products.filter((prod) => prod._id !== prodId);
    }
    products.push(product);
  }

  response.push(products);

  return res.status(200).json(response);
};

module.exports = products;
