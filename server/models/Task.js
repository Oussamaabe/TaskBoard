const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  nameCategory: {
    type: String,
    default: "all",
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Task", TaskSchema);
