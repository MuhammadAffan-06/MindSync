const express = require("express");
const presentationController = require("../../controller/presentation-controller");
const presentationRouter = express.Router();

presentationRouter
  .post("/create", presentationController.createPresentation)
  .get("/all", presentationController.getPresentations)
  .post("/get", presentationController.getPresentation)
  .post("/isLive", presentationController.isLive)
  .post("/save", presentationController.savePresentation)
  .post("/live", presentationController.goLive);

module.exports = presentationRouter;
