const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [255, "Name cannot exceed 255 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  donationAmount: {
    type: Number,

    min: [1, "Donation amount must be at least 1"],
    validate: {
      validator: Number.isInteger,
      message: "Donation amount must be an integer",
    },
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    maxlength: [500, "Message cannot exceed 500 characters"],
  },
});

// Exporting the model
module.exports = mongoose.model("Donor", donorSchema);
