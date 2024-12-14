const Presentation = require("../models/presentation");
const Slide = require("../models/slides");

// Generate a unique join code
const generateJoinCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// Create a new presentation
exports.createPresentation = async (req, res) => {
    try {
      const { title, presenterId } = req.body;
  
      // Validate required fields
      if (!title || !presenterId) {
        return res.status(400).json({ error: "Title and presenterId are required." });
      }
  
      // Check for existing active presentation with the same presenterId
      const existingPresentation = await Presentation.findOne({
        presenterId,
        isLive: true,
      });
      if (existingPresentation) {
        return res
          .status(400)
          .json({ error: "You already have a live presentation. Please end it before creating a new one." });
      }
  
      // Create a new presentation
      const newPresentation = await Presentation.create({
        title,
        presenterId,
        joinCode: generateJoinCode(),
      });
  
      res.status(201).json({ message: "Presentation created successfully", newPresentation });
    } catch (error) {
      res.status(500).json({ error: "Failed to create presentation", details: error.message });
    }
  };

// Make a presentation live
exports.goLive = async (req, res) => {
    try {
      const { presentationId } = req.body;
  
      // Fetch the presentation and set it to live
      const updatedPresentation = await Presentation.findByIdAndUpdate(
        presentationId,
        { isLive: true },
        { new: true }
      );
  
      if (!updatedPresentation) {
        return res.status(404).json({ error: "Presentation not found" });
      }
  
      // Retrieve the Socket.IO instance from the app
      const io = req.app.get("socketio");
  
      if (!io) {
        throw new Error("Socket.IO instance not found in app");
      }
  
      const joinCode = updatedPresentation.joinCode;
  
      // Emit an event to the room associated with the joinCode
      io.to(joinCode).emit("presentation-live", {
        message: "Presentation is now live",
        presentation: updatedPresentation,
      });
  
      res.status(200).json({ message: "Presentation is now live", updatedPresentation });
    } catch (error) {
      res.status(500).json({ error: "Failed to make presentation live", details: error.message });
    }
  };
  

// Add participant using join code
exports.addParticipant = async (req, res) => {
  try {
    const { joinCode, userId } = req.body;

    const presentation = await Presentation.findOne({ joinCode, isLive: true });

    if (!presentation) {
      return res.status(404).json({ error: "No live presentation found with this join code" });
    }

    presentation.participants.push({ userId });
    await presentation.save();

    res.status(200).json({ message: "Participant added successfully", presentation });
  } catch (error) {
    res.status(500).json({ error: "Failed to add participant", details: error.message });
  }
};
