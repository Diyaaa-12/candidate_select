const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

router.post('/', async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find({
      experience: { $gte: Number(minExperience) }
    });

    const results = candidates.map(candidate => {
      const requiredLower = requiredSkills.map(s => s.toLowerCase());
      const matchedSkills = candidate.skills.filter(skill =>
        requiredLower.includes(skill.toLowerCase())
      );
      const score = (matchedSkills.length / requiredSkills.length) * 100;

      return {
        ...candidate.toObject(),
        matchedSkills,
        matchScore: Math.round(score),
        tier: score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low'
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;