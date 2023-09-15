const bcrypt = require("bcrypt");
const User = require("../../models/User");

const profile = async (req, res) => {
  const userPassword = req.user.password;
  const { password } = req.body;

  const isMatch = bcrypt.compareSync(password, userPassword);

  if (isMatch) {
    return res.status(200).json({ message: "Password is correct", isMatch });
  } else {
    return res.status(400).json({ message: "Password is incorrect", isMatch });
  }
};

module.exports = profile;
