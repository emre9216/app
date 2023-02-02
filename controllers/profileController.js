const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUserById = async (req, res) => {
  if (req.body.id === req.user.id) {
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
  } else {
    res.status(500).json({
      error: "You try to see someone else profile.",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const id = req.user.id;
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await user.update({
      password: hashedPassword,
    });
    res.status(200).json({
      data: updatedUser,
      message: "Users updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { phone, profileImage, address } = req.body;
    const id = req.user.id;
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

module.exports = { getUserById, changePassword, updateUser };
