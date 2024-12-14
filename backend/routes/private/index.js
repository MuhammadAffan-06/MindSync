const presenterRouter = require("./presenter.route");
const presentationRouter = require("./presentation.route")
const express = require('express');
const privateRouter = express.Router();

privateRouter
    .use("/auth", presenterRouter)
    .use("/presentation", presentationRouter)

module.exports = privateRouter;
