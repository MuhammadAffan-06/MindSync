const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const { signup, login, verify } = require("../../controller/auth-controller");
const verifyToken = require("../../middleware/verifyToken");

const presenterRouter = express.Router();
presenterRouter.post("/signup", signup);
presenterRouter.post("/login", login);
presenterRouter.get("/verify", verifyToken, verify);

presenterRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

presenterRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth", session: false }),
  async (req, res) => {
    // If no user is found, immediately redirect with an error
    if (!req.user) {
      console.error("Authentication failed or user not found");
      return res.redirect(`${process.env.CLIENT_BASE_URL}/auth?error=Authentication%20failed.`);
    }

    try {
      // Check if the user already exists by googleId or email
      let existingUser = await User.findOne({ googleId: req.user.googleId });
      if (!existingUser && req.user.email) {
        existingUser = await User.findOne({ email: req.user.email });
      }

      let user = existingUser;
      if (user) {
        console.log("Existing user found");
      } else {
        // Create a new user if none exists
        user = new User({
          name: req.user.name,
          email: req.user.email,
          googleId: req.user.googleId,
          picture: req.user.picture,
          role: "presenter"
        });
        await user.save();
        console.log("New user created successfully");
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.redirect(
        `${process.env.CLIENT_BASE_URL}/auth/success?token=${encodeURIComponent(token)}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
      );
    } catch (error) {
      console.error("Error handling user authentication:", error);
      res.redirect(`${process.env.CLIENT_BASE_URL}/auth?error=Something%20went%20wrong.`);
    }
  }
);

module.exports = presenterRouter;
