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
  isLive: { type: Boolean, default: false }, // Live status of the presentation
  joinCode: { type: String, unique: true }, // Unique join code for users
  participants: [
    {
      userId: { type: String }, // IDs of joined participants
    },
  ],
});

const Presentation = mongoose.model("Presentation", PresentationSchema);

module.exports = Presentation;
