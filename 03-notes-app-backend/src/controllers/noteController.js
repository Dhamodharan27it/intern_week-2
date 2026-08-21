const mongoose = require('mongoose');
const Note = require('../models/Note');

async function getNotes(req, res, next) {
  try { res.json(await Note.find({ owner: req.user.id }).sort({ updatedAt: -1 })); } catch (error) { next(error); }
}

async function getNote(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid note id' });
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) { next(error); }
}

async function createNote(req, res, next) {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
    const note = await Note.create({ title, content, owner: req.user.id });
    res.status(201).json(note);
  } catch (error) { next(error); }
}

async function updateNote(req, res, next) {
  try {
    const note = await Note.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, req.body, { new: true, runValidators: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) { next(error); }
}

async function deleteNote(req, res, next) {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) { next(error); }
}

module.exports = { getNotes, getNote, createNote, updateNote, deleteNote };
