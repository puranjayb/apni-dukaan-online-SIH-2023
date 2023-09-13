const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: Number,
    validate: {
      validator: (e) => {
        return /\d{10}/.test(e);
      },
      message: "Phone number is not valid",
    },
    required: [true, "Phone number is required"],
  },
  isSeller: {
    type: Boolean,
    required: true,
    default: false,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: () => {
      return this.isSeller === true;
    },
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
