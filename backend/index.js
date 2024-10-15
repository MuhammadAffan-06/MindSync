const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const connectDB = require("./dbconfig/dbconfig");
port = process.env.PORT || 8080;
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mind-sync-u9h4.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.get('/health-check', (req, res) => {
  res.json({ message: "server up. all ok." })
})
app.use("/", routes);

connectDB();
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
