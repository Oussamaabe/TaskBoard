const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const Note = require("../models/Note");

const getAllNotes = asyncWrapper(async (req, res) => {
  const notes = await Note.find({});
  res.status(200).json({ notes });
});

const createNote = asyncWrapper(async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json({ note });
});

const getNote = asyncWrapper(async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    return next(createCustomError(`No note with id : ${noteId}`, 404));
  }

  res.status(200).json({ note });
});

const updateNote = asyncWrapper(async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!note) {
    return next(createCustomError(`No note with id : ${noteId}`, 404));
  }
  res.status(200).json({ note });
});

const deleteNote = asyncWrapper(async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });
  if (!note) {
    next(createCustomError(`No note with id : ${noteId}`, 404));
    return res.status(404).json({
      success: false,
      msg: `No note with id : ${noteId}`,
    });
  }
  res.status(200).json({ note });
});

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
};
