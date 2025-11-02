const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackathonSchema = Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  organizer: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  registrationDeadline: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
    default: "default-hackathon.jpg",
  },
  tags: [String],
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming",
  },
});


module.exports = mongoose.model("Hackathon", hackathonSchema);