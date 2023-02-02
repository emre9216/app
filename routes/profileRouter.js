// routes/index.js
const express = require("express");
const {
  getUserById,
  changePassword,
  updateUser,
} = require("../controllers/profileController");
const authenticate = require("../middlewares/auth");
const router = express.Router();

router.get("/", authenticate, getUserById);

router.put("/change-password", authenticate, changePassword);

router.put("/update", authenticate, updateUser);

module.exports = router;
