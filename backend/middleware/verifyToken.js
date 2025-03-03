const jwt = require("jsonwebtoken");
require("dotenv").config();
function verifyjwt(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorize user");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(process.env.JWT_SECRET);
    next();
  } catch (e) {
    console.error(e);
    res.status(400).json("Token not valid");
  }
}

module.exports = verifyjwt;
