const express = require("express");
const presentationController = require("../../controller/presentation-controller");
const presentationRouter = express.Router();

presentationRouter
  .post("/create", presentationController.createPresentation)
  .get("/all", presentationController.getPresentations) 
  .get("/:presentationId", presentationController.getPresentation) 
  .get("/isLive/:joinCode", presentationController.isLive)
  .post("/:presentationId/save",presentationController.savePresentation)
  .post("/:presentationId/live", presentationController.goLive);

module.exports = presentationRouter;
