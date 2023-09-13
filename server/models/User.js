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
      validator: (value) => {
        return /\d{10}/.test(value);
      },
      message: "Phone number is not valid",
    },
    required: [true, "Phone number is required"],
  },
  isSeller: {
    type: Boolean,
    default: false,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: function () {
      return this.isSeller === true;
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
