// routes/index.js
const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticate, getUsers);

router.get("/single", authenticate, getUserById);

router.post("/add", authenticate, createUser);

router.put("/update", authenticate, updateUser);

router.delete("/delete", authenticate, deleteUser);

module.exports = router;
