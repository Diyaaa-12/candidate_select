const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/candidates', require('./routes/candidates'));
app.use('/match', require('./routes/match'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/auth', require('./routes/auth'));   // ← this must be here

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));