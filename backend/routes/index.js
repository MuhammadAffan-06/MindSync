const express = require("express");
const router = express.Router();
const privateRouter = require("./private/index");

router.use(privateRouter);

module.exports = router;
