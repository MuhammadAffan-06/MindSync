const express = require("express");
const validator = require("validator");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("./models/users");
const connectDB = require("./dbconfig/dbconfig");
port = process.env.PORT || 8080;
app.use(express.json());
connectDB();
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello Affan");
});

app.post("/register", async (req, res) => {
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
});
