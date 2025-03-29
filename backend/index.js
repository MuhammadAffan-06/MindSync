const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const { connectDb, getDbReadyState } = require("./dbconfig/dbconfig");
const port = process.env.PORT;
const clientBaseUrl = process.env.CLIENT_BASE_URL;
const serverDomain = process.env.SERVER_DOMAIN;
const passport = require("./utils/passportConfig");
const http = require("http");
const { setupSocket } = require("./socketio");




if(!port) {
  console.error("PORT is not defined in .env file");
  process.exit(1);
}

if(!clientBaseUrl) {
  console.error("CLIENT_BASE_URL is not defined in .env file");
  process.exit(1);
}
if(!serverDomain) {
  console.error("SERVER_DOMAIN is not defined in .env file");
  process.exit(1);
}
app.use(
  cors({
    origin: [ clientBaseUrl, "https://mind-sync-u9h4.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.options("*", cors());

const server = http.createServer(app);
const io = setupSocket(server, app);
app.set("socketio", io);

app.get("/health-check", (req, res) => {
  const dbState = getDbReadyState();
  const dbStatus = dbState === 1 ? "Connected" : "Not Connected";

  res.json({
    message: "Server is running.",
    database: dbStatus,
    uptime: process.uptime(),
  });
});

// Use routes
app.use("/", routes);

// Connect to the database
connectDb();

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${serverDomain}:${port}`);
});
