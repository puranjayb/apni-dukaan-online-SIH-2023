const User = require("../../models/User");

const verify = async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    message: "Authentication successful",
    user,
  });
};

module.exports = verify;
