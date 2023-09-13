const mongoose = require("mongoose");

// ...

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

    const storage = getStorage(firebaseApp);

    // Generate a new ObjectId for the store
    const storeId = new mongoose.Types.ObjectId();

    const fileName =
      "logo" + logoFile.originalname.split(".").pop().toLowerCase();

    const imagesRef = ref(storage, `images/stores/${storeId}/${fileName}`);

    // Upload the logo to Firebase Storage with the correct path
    await uploadBytes(imagesRef, logoFile.buffer);

    // Create a new store with the generated ObjectId and the logo URL
    const newStore = new Store({
      _id: storeId,
      name,
      description,
      url,
      logo: await getDownloadURL(imagesRef), // Set the logo URL here
      owner: user._id,
    });

    // Save the store to MongoDB
    await newStore.save();

    // Update the user with the store reference
    user.store = storeId;
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
