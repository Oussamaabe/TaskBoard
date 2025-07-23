const mongoose = require("mongoose");

const CategSchema = new mongoose.Schema({
  nameCategory: {
    type: String,
    default: "all",
  },
  color: {
    type: String,
    default: "green",
  },
  userId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Category", CategSchema);
