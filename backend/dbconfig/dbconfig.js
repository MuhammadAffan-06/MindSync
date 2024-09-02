const mongoose = require("mongoose");
require("dotenv").config;
const dbURI = process.env.DATABASE_CONNECTION_STRING;
// const dbURI = process.env.LOCAL_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database not connected");
    console.error(error);
  }
};

module.exports = connectDB;
