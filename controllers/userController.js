const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, password, phone, profileImage, address } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      profileImage,
      address,
    });

    const token = generateToken(user);
    res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//pagination yapılı
const getUsers = async (req, res) => {
  const limit = req.body.limit || 10;
  const offset = req.body.offset || 0;

  try {
    const totalUsers = await User.count();
    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const users = await User.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      data: users,
      totalPages: totalPages,
      currentPage: currentPage,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    res.status(200).json({
      data: user,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, phone, profileImage, address } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(500).json({
        error: "user not found",
      });
    }
    const updatedUser = await user.update({
      phone: phone,
      profileImage: profileImage,
      address: address,
    });
    res.status(200).json({
      data: updatedUser,
      message: "Users updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) {
      res.status(500).json({
        error: "user not found",
      });
    }
    await user.destroy();
    res.status(200).json({
      data: user,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
};
