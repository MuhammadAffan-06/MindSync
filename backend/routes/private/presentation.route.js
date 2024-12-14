const express = require("express")
const presentationController = require("../../controller/presentation-controller")
const presentationRouter = express.Router();

presentationRouter
    .post("/presentation", presentationController.createPresentation)
    .put("/presentation/live", presentationController.goLive)
    .put("/presentation/add", presentationController.addParticipant)

module.exports = presentationRouter