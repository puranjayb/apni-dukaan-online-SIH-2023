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

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  if (user.store)
    return res.status(400).json({ message: "Store already exists" });

  const { name, description } = req.body;
  const logoFile = req.file;

  if (!logoFile) {
    return res.status(400).json({ message: "No logo file provided" });
  }

  try {
    const fileName =
      Date.now() +
      "_" +
      logoFile.originalname.toLowerCase().replace(/[^a-z0-9]/g, "") +
      "." +
      logoFile.originalname.split(".").pop().toLowerCase();
    const storage = getStorage(firebaseApp);
    const ImagesRef = ref(storage, "images/logos/" + fileName);

    await uploadBytes(ImagesRef, logoFile.buffer);

    const logoURL = await getDownloadURL(ImagesRef);

    const newStore = new Store({
      name,
      description,
      logo: logoURL,
      owner: user._id,
    });

    await newStore.save();

    user.store = newStore._id;
    await user.save();

    res
      .status(201)
      .json({ message: "Store created successfully", newStore, user });
  } catch (error) {
    console.error("Error uploading logo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createStore;
