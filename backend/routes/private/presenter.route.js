const { signup, login } = require("../../controller/auth-controller");
const express = require("express");
const presenterRouter = express.Router();

presenterRouter.post("/signup", signup).post("/login", login);

module.exports = presenterRouter;
