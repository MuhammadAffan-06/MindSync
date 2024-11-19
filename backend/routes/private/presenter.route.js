const { signup, login } = require("../../controller/auth-controller");
const passport = require("../../utils/passportConfig");
const express = require("express");
const User = require("../../models/users");
const presenterRouter = express.Router();

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

    if (req.user) {
      try {
        // Check if user already exists in the database based on googleId or email
        let existingUser = await User.findOne({ googleId: req.user.googleId });

        if (!existingUser) {
          // If no user with the provided googleId, check by email
          existingUser = await User.findOne({ email: req.user.email });
        }

        if (existingUser) {
          // If user exists, redirect to localhost:3000/
          console.log("Existing user found, redirecting...");
          return res.redirect("http://localhost:3000/");
        }

        // If user does not exist, create a new user
        const newUser = new User({
          name: req.user.name,
          email: req.user.email,
          googleId: req.user.googleId,
          picture: req.user.picture,
          role: "presenter", // Assign a role as per your requirement
        });

        await newUser.save();
        console.log("New user created successfully, redirecting...");
        res.redirect("http://localhost:3000/");
      } catch (error) {
        console.error("Error handling user authentication:", error);
        res.redirect("/login?error=Something%20went%20wrong.");
      }
    } else {
      console.log("Authentication failed or user not found");
      res.redirect("/login?error=Authentication%20failed.");
    }
  }
);

module.exports = presenterRouter;
