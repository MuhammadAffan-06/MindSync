const express = require("express");
const presentationController = require("../../controller/presentation-controller");
const presentationRouter = express.Router();
const verifyToken = require("../../middleware/verifyToken");

presentationRouter
  .post("/presentation", verifyToken, presentationController.createPresentation)
  .put("/presentation/live", presentationController.goLive)
  .put("/presentation/add", presentationController.addParticipant);

module.exports = presentationRouter;
