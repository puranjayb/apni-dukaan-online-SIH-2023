const Order = require("../../models/Order");
const Store = require("../../models/Store");

const orders = async (req, res) => {
  const storeId = req.user.store;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const orders = await Order.find({ store: storeId });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = orders;
