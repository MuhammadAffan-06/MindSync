const presenterRouter = require("./presenter.route");
const presentationRouter = require("./presentation.route");
const slideRouter = require("./slide-route");
const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const privateRouter = express.Router();

privateRouter
  .use("/auth", presenterRouter)
  .use("/presentation",verifyToken, presentationRouter)
  .use("/slide", verifyToken, slideRouter);

module.exports = privateRouter;
