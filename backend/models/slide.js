const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  presentationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
    required: true,
  },
  // title: { type: String, required: true }, // Slide title
  type: {
    type: String,
    enum: ["PlainText", "MCQ", "WordCloud"], // Types of slides
    required: true,
  },
  content: { type: String, required: true },
  clientId: { type: String, required: true },
  correctAnswer: { type: String},
  thumbnailUrl: { type: String },
  index: {type:Number, required : true}

});

const Slide = mongoose.model("Slide", SlideSchema);

module.exports = Slide;
