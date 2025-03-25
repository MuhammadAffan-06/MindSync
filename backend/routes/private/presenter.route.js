const { signup, login } = require("../../controller/auth-controller");
const passport = require("../../utils/passportConfig");
const express = require("express");
const User = require("../../models/users");
const presenterRouter = express.Router();
const jwt = require("jsonwebtoken");

// Signup and login routes
presenterRouter.post("/signup", signup).post("/login", login);

// Google authentication routes
presenterRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

presenterRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  async (req, res) => {
    console.log("User authenticated:", req.user);

    if (!req.user) {
      console.log("Authentication failed or user not found");
      return res.redirect("/login?error=Authentication%20failed.");
    }

    try {
      // Check if user already exists in the database based on googleId or email
      let existingUser = await User.findOne({ googleId: req.user.googleId });

      if (!existingUser) {
        // If no user with the provided googleId, check by email
        existingUser = await User.findOne({ email: req.user.email });
      }

      if (existingUser) {
        // If user exists, generate a token and include the profile picture URL
        const token = jwt.sign(
          {
            name: existingUser.name,
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role,
            picture: req.user.picture, // Include the profile picture URL
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Set the token in a cookie
        res.cookie("authToken", token, {
          httpOnly: false, // Allow JavaScript access
          secure: false, // Set to `false` for local development (HTTP)
          sameSite: "Lax",
        });

        console.log("Existing user found, redirecting...");
        return res.redirect("http://localhost:3000/dashboard");
      }

      // If user does not exist, create a new user
      const newUser = new User({
        name: req.user.name,
        email: req.user.email,
        googleId: req.user.googleId,
        picture: req.user.picture, // Save the profile picture URL
        role: "presenter", // Assign a role as per your requirement
      });

      await newUser.save();

      // Generate a token and include the profile picture URL
      const token = jwt.sign(
        {
          name: newUser.name,
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
          picture: newUser.picture, // Include the profile picture URL
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set the token in a cookie
      res.cookie("authToken", token, {
        httpOnly: false, // Allow JavaScript access
        secure: false, // Set to `false` for local development (HTTP)
        sameSite: "Lax",
      });

      console.log("New user created successfully, redirecting...");
      return res.redirect("http://localhost:3000/dashboard");
    } catch (error) {
      console.error("Error handling user authentication:", error);
      res.redirect("/login?error=Something%20went%20wrong.");
    }
  }
);

module.exports = presenterRouter;
