const mongoose = require("mongoose");

const timeRecordSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TimeRecord = mongoose.model("TimeRecord", timeRecordSchema);

module.exports = { TimeRecord };
