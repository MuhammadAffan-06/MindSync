const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");


function setupSocket(server, app) {
  console.log("Initializing WebSocket (Socket.IO) Server");

  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://172.20.7.193:3000",
        "https://mind-sync-u9h4.vercel.app",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const livePresentations = {};
  app.set("livePresentations", livePresentations);

  io.use(authenticateUser);

  io.on("connection", handleSocketConnection(io, livePresentations));

  return io;
}

// Middleware for authentication
function authenticateUser(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication Error: No token provided"));

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Authentication Error: Invalid token"));
    socket.user = decoded;
    next();
  });
}

function handleSocketConnection(io, livePresentations) {
  return (socket) => {
    console.log(`User connected: ${socket.id}, User ID: ${socket.user.id}`);

    socket.on("join-presentation", handleJoinPresentation(socket, livePresentations));
    socket.on("presentation-next-slide", handleSlideChange(socket, io, livePresentations, 1));
socket.on("presentation-previous-slide", handleSlideChange(socket, io, livePresentations, -1));
    socket.on("presentation-answer-submit", handleAnswerSubmit(socket, livePresentations));
    socket.on("presentation-end", handlePresentationEnd(socket, io, livePresentations));
    socket.on("disconnect", handleDisconnect(socket, io, livePresentations));
  };
}
function getPresentationJoinCode(socket) {
  return Array.from(socket.rooms).find((room) => room !== socket.id);
}

// Event Handlers
function handleJoinPresentation(socket, livePresentations) {
  return (joinCode, callback) => {
    const livePresentation = livePresentations[joinCode];
    console.log(`${socket.user.name}(${socket.user.id}) attempting to join ${joinCode}`);

    if (livePresentation) {
      livePresentation.participants[socket.user.id] = {
        answers: new Array(livePresentation.slides.length).fill(null),
        name: socket.user.name
      };
      socket.join(joinCode);
      callback(true, livePresentation.title, livePresentation.getActiveSlide());
    } else {
      callback(false, "Presentation not found");
    }
  };
}

function handleSlideChange(socket, io, livePresentations, direction) {
  return (callback) => {
    const joinCode = getPresentationJoinCode(socket);
    if (!joinCode) {
      console.log("User not in any presentation room");
      return;
    }

    const livePresentation = livePresentations[joinCode];
    if (!livePresentation) {
      console.log(`Presentation ${joinCode} not found.`);
      return;
    }

    if (socket.user.id !== livePresentation.presenterId) {
      console.log(`Unauthorized slide change attempt by user ${socket.user.id}`);
      return;
    }

    const newSlideIndex = livePresentation.activeSlide + direction;
    callback(newSlideIndex === livePresentation.slides.length-1? 1: newSlideIndex ===0? 0:0.5);
    if (newSlideIndex < 0 ) {
      console.log("Slide change out of bounds");
      return;
    }
    if(newSlideIndex === livePresentation.slides.length){

      endPresentation(io, joinCode, livePresentations);
      return;
    }

    livePresentation.activeSlide = newSlideIndex;
    const newSlide = livePresentation.getActiveSlide();
    io.to(joinCode).emit("presentation-data", newSlide);
    console.log(`Slide changed by presenter (${socket.user.id}) to slide #${livePresentation.activeSlide}`);
  };
}

function handleAnswerSubmit(socket, livePresentations) {
  return (answer, callback) => {
    const joinCode = getPresentationJoinCode(socket);
    if (!joinCode) {
      console.log("User not in any presentation room");
      callback(false, "Not in presentation");
      return;
    }

    const livePresentation = livePresentations[joinCode];
    if (!livePresentation) {
      callback(false, "Presentation not found");
      return;
    }

    const participant = livePresentation.participants[socket.user.id];
    if (!participant) {
      callback(false, "Participant not found");
      return;
    }

    const activeSlideIndex = livePresentation.activeSlide;
    if (participant.answers[activeSlideIndex]) {
      callback(false, "Already submitted");
    } else {
      participant.answers[activeSlideIndex] = answer;
      callback(true, "Submitted");
      console.log(`Answer submitted by ${socket.user.name}(${socket.user.id}) for slide #${activeSlideIndex}`);
    }
  };
}

function handlePresentationEnd(socket, io, livePresentations) {
  return () => {
    const joinCode = getPresentationJoinCode(socket);
    if (!joinCode) {
      console.log("User not in any presentation room");
      return;
    }

    const livePresentation = livePresentations[joinCode];
    if (!livePresentation) {
      console.log(`Presentation ${joinCode} not found.`);
      return;
    }

    if (socket.user.id !== livePresentation.presenterId) {
      console.log(`Unauthorized attempt to end presentation by ${socket.user.id}`);
      return;
    }

    endPresentation(io, joinCode, livePresentations);
  };
}

function handleDisconnect(socket, io, livePresentations) {
  return () => {
    console.log(`User disconnected: ${socket.id}`);

    Object.entries(livePresentations).forEach(([joinCode, presentation]) => {
      if (presentation.presenterId.toString() === socket.user.id) {
        console.log(`Presenter ${socket.user.id} disconnected. Ending presentation ${joinCode}.`);
        endPresentation(io, joinCode, livePresentations);
      }
    });
  };
}
function calculateResult(livePresentation) {
  const { slides, participants,presenterId } = livePresentation;

  const slideAnswerKey = slides.map((slide) => {
    const { correctAnswer, content } = slide;

    let marks = 0;
    if(correctAnswer){
      const parsedContent = JSON.parse(content);
      marks = parsedContent.marks || 0;
    
    }

    return { correctAnswer, marks };
  });
  const leaderboard = Object.entries(participants).filter(([userId])=>userId!==presenterId).map(
    ([userId, { answers,name }]) => {
      let totalMarks = 0;

      answers.forEach((answer, index) => {
        const { correctAnswer, marks } = slideAnswerKey[index];
        if (answer && correctAnswer && answer === correctAnswer) {
          totalMarks += marks;
        }
      });

      return {
        name: name,
        marksAchieved: totalMarks,
      };
    }
  );

  leaderboard.sort((a, b) => b.marksAchieved - a.marksAchieved);

  return leaderboard;
}

function endPresentation(io, joinCode, livePresentations) {
  const livePresentation = livePresentations[joinCode];
  const leaderboard = calculateResult(livePresentation);


  io.to(joinCode).emit("presentation-ended", {
    message: "Presentation has ended.",
    leaderboard,
  });

  const room = io.sockets.adapter.rooms.get(joinCode);
  if (room) {
    room.forEach((socketId) => {
      const clientSocket = io.sockets.sockets.get(socketId);
      clientSocket?.leave(joinCode);
    });
  }

  delete livePresentations[joinCode];
  console.log(`Presentation ${joinCode} ended.`);
}

module.exports = { setupSocket };
