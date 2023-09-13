require("dotenv").config();

const express = require("express");
const passport = require("./passport.config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { initializeFirebase } = require("./firebase.config");
initializeFirebase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const storeRoutes = require("./routes/store");

app.use("/auth", authRoutes);
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoutes,
);
app.use("/store", storeRoutes);

/* const User = require("./models/User");
app.get("/test", (req, res) => {
  jwt.verify(req.body.auth, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    console.log(user);
    return res.status(200).json({
      message: "Authentication successful",
      user,
    });
  });
});
 */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB\n", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
