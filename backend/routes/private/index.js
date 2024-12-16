const presenterRouter = require("./presenter.route");
const presentationRouter = require("./presentation.route")
const slideRouter = require("./slide-route")
const express = require('express');
const privateRouter = express.Router();

privateRouter
    .use("/auth", presenterRouter)
    .use("/presentation", presentationRouter)
    .use("/slide", slideRouter)

module.exports = privateRouter;
