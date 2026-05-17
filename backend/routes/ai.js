const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const fetch = require('node-fetch');
router.post('/shortlist')
router.post('/shortlist', async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find({
      experience: { $gte: Number(minExperience) }
    });

    if (candidates.length === 0) {
      return res.json({ result: 'No candidates found matching the criteria.' });
    }

    const candidateList = candidates.map((c, i) =>
      `${i + 1}. Name: ${c.name} | Skills: ${c.skills.join(', ')} | Experience: ${c.experience} years`
    ).join('\n');

    const prompt = `
You are an expert technical recruiter AI.

Job Requirements:
- Required Skills: ${requiredSkills.join(', ')}
- Minimum Experience: ${minExperience} years

Candidates:
${candidateList}

Please provide:
1. Ranked list from best fit to least fit
2. Match percentage for each candidate
3. Brief reason for each candidate
4. Top 2 candidates recommended for interview
`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  })
});

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    console.log('Groq response:', JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(500).json({ error: `Groq Error: ${data.error.message}` });
    }

    const result =
  data?.choices?.[0]?.message?.content ||
  'No AI response generated.';
    res.json({ result });

  } catch (err) {
    console.error('AI route error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;