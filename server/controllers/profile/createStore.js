const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");
const { firebaseApp } = require("../../firebase.config");
const Store = require("../../models/Store");
const User = require("../../models/User");

const createStore = async (req, res) => {
  const { email } = req.user;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user already has a store
    if (user.store) {
      return res.status(400).json({ message: "Store already exists" });
    }

    const { name, description, url } = req.body;
    const logoFile = req.file;

    if (!logoFile) {
      return res.status(400).json({ message: "No logo file provided" });
    }

    const fileName =
      Date.now() +
      "_" +
      logoFile.originalname.toLowerCase().replace(/[^a-z0-9]/g, "") +
      "." +
      logoFile.originalname.split(".").pop().toLowerCase();

    const storage = getStorage(firebaseApp);
    const imagesRef = ref(storage, "images/logos/" + fileName);

    // Upload the logo to Firebase Storage
    await uploadBytes(imagesRef, logoFile.buffer);

    const logoURL = await getDownloadURL(imagesRef);

    // Create a new store
    const newStore = new Store({
      name,
      description,
      url,
      logo: logoURL,
      owner: user._id,
    });

    // Save the store to MongoDB
    await newStore.save();

    // Update the user with the store reference
    user.store = newStore._id;
    await user.save();

    return res.status(201).json({
      message: "Store created successfully",
      newStore,
      user,
    });
  } catch (error) {
    console.error("Error in create store:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createStore;
