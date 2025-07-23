const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
