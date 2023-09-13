const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");
const { firebaseApp } = require("../../firebase.config");

const Store = require("../../models/Store");
const Product = require("../../models/Product");

const addProduct = async (req, res) => {
  const { user } = req;
  const storeId = req.body.store;

  const store = await Store.findById(storeId);
  if (!store) return res.status(404).json({ message: "Store not found" });

  if (!store.owner.equals(user._id))
    return res.status(401).json({ message: "Unauthorized" });

  const { name, description, price, quantity } = req.body;

  const imageFile = req.file;

  try {
    const fileName =
      Date.now() +
      "_" +
      imageFile.originalname.toLowerCase().replace(/[^a-z0-9]/g, "") +
      "." +
      imageFile.originalname.split(".").pop().toLowerCase();

    const storage = getStorage(firebaseApp);
    const ImagesRef = ref(
      storage,
      "images/stores/" + store._id + "/products/" + fileName,
    );

    await uploadBytes(ImagesRef, imageFile.buffer);

    const image = await getDownloadURL(ImagesRef);

    const product = new Product({
      name,
      description,
      image,
      price,
      quantity,
      store: store._id,
    });
    await product.save();

    store.products.push(product._id);
    await store.save();

    return res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addProduct;
