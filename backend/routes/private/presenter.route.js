const { signup, login } = require("../../controller/auth-controller");
var passport = require("../../utils/passportConfig");
const express = require("express");
const presenterRouter = express.Router();

presenterRouter.post("/signup", signup).post("/login", login);

presenterRouter.get(
  "/google",
  (req, res, next) => {
    // Pass intent as state parameter for later retrieval in callback
    req.session.intent = req.query.intent;
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }
);

presenterRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    const intent = req.session.intent;
    delete req.session.intent;

    // Redirect user based on the outcome and intent
    if (intent === "signup" && req.user) {
      res.redirect("http://localhost:3000/");
    } else if (intent === "login" && req.user) {
      res.redirect("http://localhost:3000/");
    } else if (intent === "signup") {
      res.redirect("/signup?error=User%20already%20exists.%20Please%20log%20in.");
    } else if (intent === "login") {
      res.redirect("/login?error=User%20not%20found.%20Please%20sign%20up.");
    }
  }
);

module.exports = presenterRouter;
