const express = require("express");
const passport = require("../passport.config");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { products, addProduct } = require("../controllers/store");

router.get("/products", products);

router.post(
  "/products/add",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addProduct,
);

module.exports = router;
