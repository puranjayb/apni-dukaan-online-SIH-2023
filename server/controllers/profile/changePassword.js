const bcrypt = require("bcrypt");
const User = require("../../models/User");

const changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.user;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const filter = { email };
    const update = { password: hashedPassword };

    const newUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (newUser) {
      return res.status(200).json({
        message: "Password changed successfully",
        user: newUser,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = changePassword;
