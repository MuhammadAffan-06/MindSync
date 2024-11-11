const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const connectDB = require("./dbconfig/dbconfig");
const port = process.env.PORT || 8080;
const passport = require("./utils/passportConfig");
const session = require('express-session');


app.use(session({
  secret: "CreativeAuthority", // Replace with your secret
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(
  cors({
    origin: ["http://localhost:3000", "https://mind-sync-u9h4.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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
