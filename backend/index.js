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

app.use(
  session({
    secret: "CreativeAuthority",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use `secure: true` if your app is served over HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://mind-sync-u9h4.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update to your frontend URL
    methods: ["GET", "POST"],
  },
});
app.set("socketio", io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join-presentation", ({ joinCode }) => {
    socket.join(joinCode);
    console.log(`User joined presentation with code: ${joinCode}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.options("*", cors());

app.use(express.json());

app.get("/health-check", (req, res) => {
  res.json({ message: "server up. all ok." });
});

app.use("/", routes);

connectDB();

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
