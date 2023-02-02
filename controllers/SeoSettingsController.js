const SeoSettings = require("../models/SeoSettings");

const getSeoSettings = async (req, res) => {
  try {
    const seoSettings = await SeoSettings.findAll();
    res.json({ seoSettings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSeoSettings = async (req, res) => {
  try {
    const { title, description, author, tags } = req.body;
    const seoSettings = await SeoSettings.findByPk(1);
    await seoSettings.update({
      title,
      description,
      author,
      tags,
    });
    res.json({
      message: "SeoSettings updated",
      seoSettings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSeoSettings,
  updateSeoSettings,
};
