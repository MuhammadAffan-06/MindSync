const presenterRouter = require("./presenter.route");
const express = require('express');
const privateRouter = express.Router();

privateRouter
    .use("/auth", presenterRouter);

module.exports = privateRouter;
