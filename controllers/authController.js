const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const signup = async (req, res) => {
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

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = generateToken(user);
    res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { signup, login };
