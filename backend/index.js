const express = require("express");
const app = express();
const routes = require("./routes/index");
const connectDB = require("./dbconfig/dbconfig");
port = process.env.PORT || 8080;
app.use(express.json());
app.use("/", routes);
connectDB();
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
