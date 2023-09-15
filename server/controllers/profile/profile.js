const User = require("../../models/User");

const profile = async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ user });
};

module.exports = profile;
