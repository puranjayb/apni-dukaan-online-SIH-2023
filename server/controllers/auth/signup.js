require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    newUser
      .save()
      .then((savedUser) => {
        const token = jwt.sign(
          {
            email: savedUser.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        );

        return res.status(201).json({
          message: "User created successfully",
          token,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Internal Server Error",
          error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = signup;
