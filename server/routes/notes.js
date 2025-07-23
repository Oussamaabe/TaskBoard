const express = require("express");
const route = express.Router();
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");

route.route("/").get(getAllNotes).post(createNote);
route.route("/:noteId").get(getNote).put(updateNote).delete(deleteNote);

module.exports = route;
