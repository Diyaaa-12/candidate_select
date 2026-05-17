import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api'

function JobForm({ setShortlisted, setAiResult }) {
  const [requiredSkills, setRequiredSkills] = useState('')
  const [minExperience, setMinExperience] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleMatch = async () => {
    if (!requiredSkills) return alert('Enter required skills')
    try {
      const res = await axios.post(`${API}/match`, {
        requiredSkills: requiredSkills.split(',').map(s => s.trim()),
        minExperience: Number(minExperience)
      })
      setShortlisted(res.data)
    } catch (err) {
      alert('Match error: ' + err.message)
    }
  }

  const handleAI = async () => {
    if (!requiredSkills) return alert('Enter required skills')
    setLoading(true)
    setAiResult('🤔 AI is analyzing candidates...')
    try {
      const res = await axios.post(`${API}/ai/shortlist`, {
        requiredSkills: requiredSkills.split(',').map(s => s.trim()),
        minExperience: Number(minExperience)
      })
      setAiResult(res.data.result)
    } catch (err) {
      setAiResult('❌ AI Error: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div style={cardStyle}>
      <h2>💼 Job Requirements</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        <input
          placeholder="Required Skills: React, Node.js, MongoDB"
          value={requiredSkills}
          onChange={e => setRequiredSkills(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Minimum Experience (years)"
          type="number"
          value={minExperience}
          onChange={e => setMinExperience(e.target.value)}
          style={inputStyle}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleMatch} style={{ ...btnStyle, background: '#27ae60' }}>
            🔍 Match Candidates
          </button>
          <button onClick={handleAI} disabled={loading} style={{ ...btnStyle, background: '#8e44ad' }}>
            {loading ? '⏳ AI Thinking...' : '🤖 AI Shortlist'}
          </button>
        </div>
      </div>
    </div>
  )
}

const cardStyle = { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }
const btnStyle = { padding: '10px 20px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1, fontSize: '15px' }

export default JobForm