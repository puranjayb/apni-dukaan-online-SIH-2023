const User = require("../../models/User");

const edit = async (req, res) => {
  const user = req.user;
  const { name, phone } = req.body;

  const filter = { email: user.email };
  let update = {};
  if (name) update.name = name;
  if (phone) update.phone = phone;

  if (!update) return res.status(400).json({ message: "Bad request" });

  const newUser = await User.findOneAndUpdate(filter, update, { new: true });

  if (newUser)
    return res.status(200).json({ message: "User updated", user: newUser });
  else return res.status(500).json({ message: "Internal server error" });
};

module.exports = edit;
