const Presentation = require("../models/presentation");
const Slide = require("../models/slides");

// Generate a unique join code
const generateJoinCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

// Create a new presentation
exports.createPresentation = async (req, res) => {
  try {
    const { title, presenterId } = req.body;

    // Validate required fields
    if (!title || !presenterId) {
      return res
        .status(400)
        .json({ error: "Title and presenterId are required." });
    }

    // Check for existing active presentation with the same presenterId
    const existingPresentation = await Presentation.findOne({
      presenterId,
      isLive: true,
    });
    if (existingPresentation) {
      return res.status(400).json({
        error:
          "You already have a live presentation. Please end it before creating a new one.",
      });
    }

    // Create a new presentation
    const newPresentation = await Presentation.create({
      title,
      presenterId,
      joinCode: generateJoinCode(),
    });

    res
      .status(201)
      .json({ message: "Presentation created successfully", newPresentation });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create presentation", details: error.message });
  }
};

// Make a presentation live
exports.goLive = async (req, res) => {
  try {
    const { presentationId } = req.body;

    // Fetch the presentation by ID
    const presentation = await Presentation.findById(presentationId);

    if (!presentation) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    // Toggle the isLive status
    const newLiveStatus = !presentation.isLive;

    const updatedPresentation = await Presentation.findByIdAndUpdate(
      presentationId,
      { isLive: newLiveStatus },
      { new: true }
    );

    console.log(`Presentation isLive status: ${updatedPresentation.isLive}`);

    // Retrieve the Socket.IO instance from the app
    const io = req.app.get("socketio");

    if (!io) {
      throw new Error("Socket.IO instance not found in app");
    }

    const joinCode = updatedPresentation.joinCode;

    // Emit an event to the room associated with the joinCode
    const eventMessage = newLiveStatus
      ? "Presentation is now live"
      : "Presentation is no longer live";
    io.to(joinCode).emit("presentation-live-toggle", {
      message: eventMessage,
      presentation: updatedPresentation,
    });

    res.status(200).json({
      message: eventMessage,
      updatedPresentation,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to toggle presentation live status",
      details: error.message,
    });
  }
};
exports.joinPresentation = async (req, res) => {
  try {
    const { joinCode, userId } = req.body;

    // Find the presentation by joinCode and populate the slideIds
    const presentation = await Presentation.findOne({ joinCode }).populate(
      "slideIds"
    );

    if (!presentation) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    if (!presentation.isLive) {
      return res.status(400).json({ error: "Presentation is not live" });
    }

    // Check if the user is already a participant
    const isParticipant = presentation.participants.some(
      (participant) => participant.userId === userId
    );

    if (isParticipant) {
      return res
        .status(400)
        .json({ error: "User has already joined the presentation" });
    }

    // Add the user to the participants array
    const updatedPresentation = await Presentation.findByIdAndUpdate(
      presentation._id,
      { $push: { participants: { userId } } }, // Add the user to the participants array
      { new: true }
    ).populate("slideIds");

    // Retrieve the Socket.IO instance from the app
    const io = req.app.get("socketio");

    if (!io) {
      throw new Error("Socket.IO instance not found in app");
    }

    // Emit an event to the room associated with the joinCode
    io.to(joinCode).emit("user-joined", {
      message: "A new user has joined the presentation",
      participantCount: updatedPresentation.participants.length, // Emit the number of participants
    });

    res.status(200).json({
      message: "Joined presentation successfully",
      presentation: updatedPresentation,
      slides: updatedPresentation.slideIds, // Include the slides in the response
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to join presentation",
      details: error.message,
    });
  }
};
// Add participant using join code
// exports.addParticipant = async (req, res) => {
//   try {
//     const { joinCode, userId } = req.body;

//     const presentation = await Presentation.findOne({ joinCode, isLive: true });

//     if (!presentation) {
//       return res
//         .status(404)
//         .json({ error: "No live presentation found with this join code" });
//     }

//     presentation.participants.push({ userId });
//     await presentation.save();

//     res
//       .status(200)
//       .json({ message: "Participant added successfully", presentation });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to add participant", details: error.message });
//   }
// };
