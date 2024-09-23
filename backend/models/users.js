const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: function () {
      return !this.googleId; // Only require password if there's no Google ID
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "presenter",
  },
  // Fields specific to Google users
  googleId: {
    type: String,
    unique: true,
    sparse: true, // This allows this field to be unique only when present
  },
  picture: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
