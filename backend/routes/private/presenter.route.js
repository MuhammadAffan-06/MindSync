const { signup, login, googleLogin } = require("../../controller/auth-controller");
const express = require("express");
const presenterRouter = express.Router();

presenterRouter.post("/signup", signup).post("/login", login).post("/google",googleLogin);

module.exports = presenterRouter;
