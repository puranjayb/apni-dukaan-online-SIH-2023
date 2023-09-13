const Order = require("../../models/Order");

const orders = async (req, res) => {
  const { user } = req;

  try {
    const orders = await Order.find({ user });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = orders;
