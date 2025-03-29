const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization token missing" });
  }
};

module.exports =  verifyToken ;
