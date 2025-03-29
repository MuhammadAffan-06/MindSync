const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");

// Sign-up API
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Validate email format
    if (!validator.isEmail(email)) {
      console.log("Invalid email format");
      return res.status(400).json({ message: "Invalid email format" });
    }
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    console.log("Sign-up successful");

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login API
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!user.password && user.googleId){
      return res.status(400).json({ message: "Password not set, login via google." });
    
    }
    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT secret missing from env.");
      return res.status(500).json({ message: "Server configuration error" });
    }


    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Respond with the token and user info
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role, name: user.name },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Verify API
const verify = async (req, res) => {
    res.status(200).json({message:"valid token"});
 

};

module.exports = {
  signup,
  login,
  verify
};
