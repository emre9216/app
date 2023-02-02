// routes/index.js
const express = require("express");
const {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/headerMenuController");
const authenticate = require("../middlewares/auth");
const router = express.Router();

router.post("/add", authenticate, createMenuItem);

router.get("/", getMenuItems);

router.get("/single", getMenuItemById);

router.put("/update", authenticate, updateMenuItem);

router.delete("/delete", authenticate, deleteMenuItem);

module.exports = router;
