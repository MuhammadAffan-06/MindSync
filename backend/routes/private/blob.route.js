const express = require("express");
const blobController = require("../../controller/blob-controller"); 
const router = express.Router();

router.post("/upload", blobController.getBlobUploadUrl); 

module.exports = router;