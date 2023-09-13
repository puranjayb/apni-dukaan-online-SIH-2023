const express = require("express");
const passport = require("../passport.config");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  profile,
  edit,
  changePassword,
  createStore,
  orders,
} = require("../controllers/profile");

router.get("/", profile);
router.post("/edit", edit);
router.post("/change-password", changePassword);
router.post("/create-store", upload.single("logo"), createStore);
router.get("/orders", orders);

module.exports = router;
