const mongoose = require("mongoose");

const PresentationSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Presentation title
  presenterId: {
    type: mongoose.Schema.Types.ObjectId, // Presenter ID (e.g., user ID or email)
    ref: "User",
    required: true,
  },
  slideIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slide", // Reference to Slide documents
    },
  ],
  joinCode: { type: String, unique: true }, // Unique join code for users
 
});

const Presentation = mongoose.model("Presentation", PresentationSchema);

module.exports = Presentation;
