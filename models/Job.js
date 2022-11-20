const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
    },
    position: {
      type: String,
      required: [true, "Please provide position name"],
    },
    status: {
      type: String,
      enum: ["current", "declined", "accepted", "completed", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = model("Job", jobSchema);
