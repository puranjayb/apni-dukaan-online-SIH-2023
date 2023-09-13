const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const login = async (req, res) => {
  const { email, password } = req.query;

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json({ message: "Invalid Credentials" });

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({ message: "Login successful", token });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = login;
