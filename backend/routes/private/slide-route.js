const express = require("express");
const slideController = require("../../controller/slide-controller");
const slideRouter = express.Router();


slideRouter
    .get("/slides/:presentationId", slideController.getSlidesByPresentation)
    .post("/create", slideController.createSlide)
    .put("/update/slide", slideController.updateSlide)
    .delete("/delete/:slideId", slideController.deleteSlide)


module.exports = slideRouter;
    