const Sequelize = require("sequelize");
const sequelize = require("../db");

const FooterMenu = sequelize.define("footerMenu", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  target: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => console.log("Footer Menu model created"))
  .catch((error) => console.error("Error creating Footer Menu model: ", error));

module.exports = FooterMenu;
