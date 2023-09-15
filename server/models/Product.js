const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
    required: [true, "Product ID is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: [true, "Product store is required"],
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
