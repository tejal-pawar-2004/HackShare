const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experianceSchema = new Schema({
  hackathonName: {
    type: String,
    required: true,
    trim: true,
  },
  hackathonDate: {
    type: Date,
    required: true,
  },
  hackathonLocation: {
    type: String,
    required: true,
    trim: true,
  },
  projectTitle: {
    type: String,
    required: true,
    trim: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String], // will split by commas
    required: true,
  },
  challenges: {
    type: String,
  },
  learnings: {
    type: String,
    required: true,
  },
  teamMembers: {
    type: [String],
  },
  projectLink: {
    type: String,
  },
  images: [
    {
      type: String, // store URLs or file paths
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Experiance", experianceSchema);
