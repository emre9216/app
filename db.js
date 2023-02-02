const Sequelize = require("sequelize");

const sequelize = new Sequelize("panel", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
