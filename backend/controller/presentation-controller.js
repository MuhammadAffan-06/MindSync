const mongoose = require("mongoose");
const Presentation = require("../models/presentation");
const Slide = require("../models/slide");

// Generate a unique join code
const generateJoinCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

exports.createPresentation = async (req, res) => {
  try {
    const presenterId = req.user?.id;

    const newPresentation = await Presentation.create({
      title:"Untitlied Presentation",
      presenterId,
      joinCode: generateJoinCode(),
    });

    res.status(201).json({ message: "Presentation created successfully", newPresentation });
  } catch (error) {
    res.status(500).json({ message: "Failed to create presentation" });
  }
};

exports.getPresentation = async (req, res) => {
  try {
    const presenterId = req.user?.id;
    const { presentationId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(presentationId)) {
      return res.status(400).json({ message: "Invalid presentation ID." });
    }

    const presentation = await Presentation.findOne({ presenterId, _id: presentationId })
      .populate("slideIds")
      .lean();

    if (!presentation) {
      return res.status(404).json({ message: "Presentation not found." });
    }

    presentation.slideIds = presentation.slideIds
      .sort((a, b) => a.index - b.index)
      .map(({ __v, _id, index, presentationId, ...slide }) => slide);

    delete presentation.__v;

    res.status(200).json(presentation);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve presentation" });
  }
};

exports.getPresentations = async (req, res) => {
  try {
    const presenterId = req.user?.id;
    if (!presenterId) {
      return res.status(401).json({ error: "Unauthorized. Presenter ID missing." });
    }
    const presentations = await Presentation.find({ presenterId })
      .populate("slideIds")
      .lean();

    if (!presentations || presentations.length === 0) {
      return res.status(404).json({ error: "No presentations found for this presenter." });
    }

    const result = presentations.map((presentation) => {
      const slides = presentation.slideIds.sort((a, b) => a.index - b.index);
      const thumbnailURL = slides.length > 0 && slides[0].thumbnailUrl ? slides[0].thumbnailUrl : "";

      return {
        thumbnailURL,
        title: presentation.title,
        presentationId: presentation._id
      };
    });

    res.status(200).json({presentations: result});
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve presentations" });
  }
};

exports.savePresentation = async (req, res) => {
  try {
    const presenterId = req.user?.id;
    const { slides, presentationTitle, presentationId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(presentationId)) {
      return res.status(400).json({ message: "Invalid presentation ID." });
    }

    const presentation = await Presentation.findOne({ _id: presentationId, presenterId });

    if (!presentation) {
      return res.status(404).json({ message: "Presentation not found." });
    }

    const bulkOps = slides.map((slide, index) => ({
      updateOne: {
        filter: { clientId: slide.clientId, presentationId },
        update: {
          $set: {
            clientId: slide.clientId,
            type: slide.type,
            content: slide.content,
            thumbnailUrl: slide.thumbnailUrl,
            correctAnswer: slide.correctAnswer,
            presentationId,
            index,
          },
        },
        upsert: true,
      },
    }));

    await Slide.bulkWrite(bulkOps);

    await Slide.deleteMany({
      presentationId,
      clientId: { $nin: slides.map((s) => s.clientId) },
    });

    const updatedSlides = await Slide.find({ presentationId }).select("_id");

    presentation.slideIds = updatedSlides.map((slide) => slide._id);
    presentation.title = presentationTitle;

    await presentation.save();

    res.status(200).json({ message: "Presentation updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update presentation" });
  }
};


exports.goLive = async (req, res) => {
  try {
    const presenterId = req.user?.id;
    const { presentationId } = req.body;
    const io = req.app.get("socketio");
    const livePresentations = req.app.get("livePresentations");

    if (!mongoose.Types.ObjectId.isValid(presentationId)) {
      return res.status(400).json({ message: "Invalid presentation ID." });
    }

    let presentation = await Presentation.findOne({ _id: presentationId, presenterId })
      .populate("slideIds")
      .lean();

    if (!presentation) {
      return res.status(404).json({ message: "Presentation not found or unauthorized." });
    }
    if (presentation.slideIds.length === 0) {
      return res.status(404).json({ message: "Cannot live empty Presentation." });
    }


    const joinCode = presentation.joinCode;

    presentation.slideIds = presentation.slideIds
      .sort((a, b) => a.index - b.index)
      .map((slide) =>{
        const newSlide = {
          correctAnswer: slide.correctAnswer,
          type: slide.type,
          content: slide.content,
        }
        if(slide.type != "PlainText"){
          try{
            const parsedContent = JSON.parse(slide.content);
            newSlide.parsedContent = parsedContent;
          
          }catch{
            console.log("Error in slide data, Unable to parse JSON content")
            console.log(slide);
            console.log("unable to parse JSON content of ",slide.content);
          }
        }
        return newSlide;
      });
    const activePresentation = {
      slides: presentation.slideIds,
      participants: {},
      joinCode,
      presenterId: presentation.presenterId.toString(),
      activeSlide: 0,
      title: presentation.title,
      getActiveSlide() {
        return this.slides[this.activeSlide] || null;
      }

    }

    if (!livePresentations[joinCode]) {
      livePresentations[joinCode] = activePresentation;

      res.status(200).json({ message: "Presentation is now live" });
    } else {
      res.status(400).json({ message: "Presentation is already live" });

    }

  } catch (error) {
    res.status(500).json({ message: "Failed to go live" });
  }
};

exports.isLive = async (req, res) => {
  const { joinCode } = req.body;
  const livePresentations = req.app.get("livePresentations");

  
  res.status(200).json({ isLive:Boolean(livePresentations[joinCode]) });

};
