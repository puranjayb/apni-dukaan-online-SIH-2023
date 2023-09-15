const Store = require("../../models/Store");

const url = async (req, res) => {
  try {
    const stores = await Store.find({}, "url");

    if (!stores) {
      return res.status(404).json({ message: "No stores found" });
    }

    const urls = stores.map((store) => store.url);

    return res.status(200).json({ urls });
  } catch (error) {
    console.error("Error fetching store URLs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = url;
