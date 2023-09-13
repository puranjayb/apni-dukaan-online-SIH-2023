const express = require("express");
const passport = require("../passport.config");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  products,
  addProduct,
  url,
  orders,
  createOrder,
} = require("../controllers/store");

router.get("/products", products);
router.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addProduct,
);
router.get("/url", url);
router.get("/orders", passport.authenticate("jwt", { session: false }), orders);
router.post(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  createOrder,
);

module.exports = router;
