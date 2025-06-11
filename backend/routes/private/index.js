const express = require("express");
const presenterRouter = require("./presenter.route");
const presentationRouter = require("./presentation.route");
const blobRouter = require("./blob.route");
const verifyToken = require("../../middleware/verifyToken");

const privateRouter = express.Router();

privateRouter
  .use("/auth", presenterRouter)
  .use("/presentation", verifyToken, presentationRouter)
  .use("/blob", verifyToken, blobRouter); 

module.exports = privateRouter;
