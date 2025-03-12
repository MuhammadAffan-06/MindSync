const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const connectDB = require("./dbconfig/dbconfig");
const port = process.env.PORT || 8080;
const passport = require("./utils/passportConfig");
const session = require("express-session");
const socketIo = require("socket.io");
const http = require("http");

// Session configuration
app.use(
  session({
    secret: "CreativeAuthority",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use `secure: true` if your app is served over HTTPS
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mind-sync-u9h4.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Store Socket.IO instance in the app
app.set("socketio", io);

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle joining a presentation room
  socket.on("join-presentation", ({ joinCode, userId }) => {
    socket.join(joinCode);
    console.log(`User ${userId} joined presentation with code: ${joinCode}`);

    // Notify the room that a new user has joined
    io.to(joinCode).emit("user-joined", {
      message: "A new user has joined the presentation",
      userId,
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Enable preflight requests for all routes
app.options("*", cors());

// Parse JSON request bodies
app.use(express.json());

// app.get("/create-meeting", (req, res) => {
//   const roomName = `MindSync-${Date.now()}`;
//   const meetingURL = `https://meet.jit.si/${roomName}`;
//   res.json({ meetingURL });
// });
// Health check endpoint
app.get("/health-check", (req, res) => {
  res.json({ message: "server up. all ok." });
});

// Use routes
app.use("/", routes);

// Connect to the database
connectDB();

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
