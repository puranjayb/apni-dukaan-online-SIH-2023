const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Store name is required"],
  },
  description: {
    type: String,
    required: [true, "Store description is required"],
  },
  url: {
    type: String,
    unique: true,
    required: [true, "Store URL is required"],
  },
  logo: {
    type: String,
    required: [true, "Store logo is required"],
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Store owner is required"],
  },
});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
