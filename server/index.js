require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("./passport.config");
var cors = require("cors");
const { initializeFirebase } = require("./firebase.config");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const storeRoutes = require("./routes/store");

app.use("/auth", authRoutes);
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoutes
);
app.use("/store", storeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the Express server
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Initialize Firebase
initializeFirebase();
