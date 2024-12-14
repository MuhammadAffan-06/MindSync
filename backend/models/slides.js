const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  presentationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
    required: true,
  },
  title: { type: String, required: true }, // Slide title
  type: {
    type: String,
    enum: ["quiz", "poll", "word-cloud"], // Types of slides
    required: true,
  },
  content: {
    question: { type: String, required: true }, // The question being asked
    options: [
      {
        text: { type: String, required: true }, // Option text
        // isCorrect: { type: Boolean, default: false }
      },
    ], // Options for quiz/poll
    maxMarks: { type: Number, default: 0 }, // Marks only for quizzes
  },
});

const Slide = mongoose.model("Slide", SlideSchema);

module.exports = Slide;
