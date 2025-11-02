const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  hackathon: {
    type: Schema.Types.ObjectId,
    ref: "Hackathon",
    required: true,
  },
  teamName: {
    type: String,
    trim: true,
  },
  teamMembers: [
    {
      name: { type: String, required: true },
      yearOfDegree: { type: String },
      collegeName: { type: String },
    },
  ],
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
