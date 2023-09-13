const bcrypt = require("bcrypt");
const User = require("../../models/User");

const profile = async (req, res) => {
  const userPassword = req.user.password;
  const { password } = req.body;

  if (bcrypt.compareSync(password, userPassword))
    return res
      .status(200)
      .json({ message: "Password is correct", isMatch: true });
  else
    return res
      .status(400)
      .json({ message: "Password is incorrect", isMatch: false });
};

module.exports = profile;
