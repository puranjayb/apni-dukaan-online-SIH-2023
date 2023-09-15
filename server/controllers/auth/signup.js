require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: "Something went wrong",
    });
  }
};

module.exports = signup;
