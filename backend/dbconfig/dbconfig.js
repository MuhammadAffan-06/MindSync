const mongoose = require("mongoose");
require("dotenv").config;
const dbURI = process.env.DATABASE_CONNECTION_STRING;
// const dbURI = process.env.LOCAL_URI;
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(dbURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database not connected");
    console.error(error);
  }
};
const getDbReadyState = () => {
  return mongoose.connection.readyState
};

module.exports = {
  connectDb,
  getDbReadyState
};
