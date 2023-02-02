const Sequelize = require("sequelize");
const sequelize = require("../db");

const SeoSettings = sequelize.define("SeoSettings", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tags: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
sequelize
  .sync()
  .then(() => console.log("seo model created"))
  .catch((error) => console.error("Error creating seo model: ", error));
module.exports = SeoSettings;
