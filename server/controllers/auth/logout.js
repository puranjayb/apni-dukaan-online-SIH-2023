const logout = (req, res) => {
  return res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = logout;
