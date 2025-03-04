const express = require("express");
const presentationController = require("../../controller/presentation-controller");
const presentationRouter = express.Router();

presentationRouter
  .post("/presentation", presentationController.createPresentation)
  .post("/join", presentationController.joinPresentation)
  .put("/presentation/live", presentationController.goLive);

module.exports = presentationRouter;
