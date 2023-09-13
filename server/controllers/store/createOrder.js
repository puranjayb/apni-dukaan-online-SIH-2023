const Product = require("../../models/Product");
const Order = require("../../models/Order");

const createOrder = async (req, res) => {
  const { user } = req;
  const { products, store, totalPrice } = req.body;
  console.log(req.body);

  try {
    // Validate products and update quantities
    const updateProductPromises = products.map(async (productId) => {
      const product = await Product.findById(productId.product);
      if (!product) {
        throw new Error(`${productId.product} not found`);
      }
      if (product.quantity < productId.quantity) {
        throw new Error(
          `${productId.product} does not have enough stock to fulfill this order`,
        );
      }

      product.quantity -= productId.quantity;

      return product.save();
    });

    // Wait for all product updates to complete
    await Promise.all(updateProductPromises);

    const newOrder = new Order({
      products,
      user: user._id,
      store,
      totalPrice,
      createdAt: Date.now(),
    });

    await newOrder.save();

    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createOrder;
