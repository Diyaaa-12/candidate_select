const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// POST /api/candidates — Add candidate
router.post('/', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const saved = await candidate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/candidates — Get all
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/candidates/:id
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;