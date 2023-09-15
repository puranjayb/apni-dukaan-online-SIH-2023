const express = require("express");
const passport = require("../passport.config");
const router = express.Router();

const {
  signup,
  logout,
  verify,
  login,
  verifyPassword,
} = require("../controllers/auth");

router.post("/signup", signup);
router.get("/login", login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout,
);
router.get("/verify", passport.authenticate("jwt", { session: false }), verify);
router.get(
  "/verify-password",
  passport.authenticate("jwt", { session: false }),
  verifyPassword,
);

module.exports = router;
