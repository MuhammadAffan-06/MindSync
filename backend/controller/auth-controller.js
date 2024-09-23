const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");

//Sign-up API
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res
        .status(401)
        .json({ message: "Fill out all the fields correctly" });
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    if (!validator.isEmail(email)) {
      console.log("Error in the email format");
      return res.status(401).json({ message: "Invalid email format" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    return res.status(200).json({ message: "User added " });
    console.log("Sign up Successful");
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Respond with the token and user info
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
};
