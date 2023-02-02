const Sequelize = require("sequelize");
const sequelize = require("../db");

const HeaderMenu = sequelize.define("headerMenu", {
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
  hasParent: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  hasChild: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  parentId: {
    type: Sequelize.INTEGER,
  },
  childId: {
    type: Sequelize.INTEGER,
  },
});

sequelize
  .sync()
  .then(() => console.log("Header Menu model created"))
  .catch((error) => console.error("Error creating Header Menu model: ", error));

module.exports = HeaderMenu;
