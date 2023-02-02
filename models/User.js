const Sequelize = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  profileImage: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
});

sequelize
  .sync()
  .then(() => console.log("User model created"))
  .catch((error) => console.error("Error creating user model: ", error));

module.exports = User;
