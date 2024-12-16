const Slide = require("../models/slides");
const Presentation = require("../models/presentation");

// Create a new slide
exports.createSlide = async (req, res) => {
  try {
    const { presentationId, title, type, content } = req.body;

    // Validate that the presentation exists
    const presentation = await Presentation.findById(presentationId);
    if (!presentation) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    // Create the slide
    const newSlide = new Slide({
      presentationId,
      title,
      type,
      content,
    });

    // Save the slide
    const savedSlide = await newSlide.save();

    // Update the presentation's slideIds array
    presentation.slideIds.push(savedSlide._id);
    await presentation.save();

    res.status(201).json({ message: "Slide created successfully", slide: savedSlide });
  } catch (error) {
    res.status(500).json({ error: "Failed to create slide", details: error.message });
  }
};
exports.getSlidesByPresentation = async (req, res) => {
  try {
    const { presentationId } = req.params;

    const slides = await Slide.find({ presentationId });
    if (!slides.length) {
      return res.status(404).json({ error: "No slides found for this presentation" });
    }

    res.status(200).json({ message: "Slides retrieved successfully", slides });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve slides", details: error.message });
  }
};
exports.updateSlide = async (req, res) => {
  try {
    const { slideId } = req.params;
    const { title, type, content } = req.body;

    // Find and update the slide
    const updatedSlide = await Slide.findByIdAndUpdate(
      slideId,
      { title, type, content },
      { new: true }
    );

    if (!updatedSlide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    res.status(200).json({ message: "Slide updated successfully", slide: updatedSlide });
  } catch (error) {
    res.status(500).json({ error: "Failed to update slide", details: error.message });
  }
};
exports.deleteSlide = async (req, res) => {
  try {
    const { slideId } = req.params;

    // Find and delete the slide
    const deletedSlide = await Slide.findByIdAndDelete(slideId);

    if (!deletedSlide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    // Remove the slide from the associated presentation's slideIds array
    await Presentation.findByIdAndUpdate(deletedSlide.presentationId, {
      $pull: { slideIds: deletedSlide._id },
    });

    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete slide", details: error.message });
  }
};