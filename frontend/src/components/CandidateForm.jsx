import { useState } from 'react'
import axios from 'axios'

const API = 'https://candidate-selection-backend-i4gj.onrender.com'

function CandidateForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', skills: '', experience: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.skills || !form.experience) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/candidates`, {
        name: form.name,
        email: form.email,
        skills: form.skills.split(',').map(s => s.trim()),
        experience: Number(form.experience)
      })
      setForm({ name: '', email: '', skills: '', experience: '' })
      onAdd()
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding candidate')
    }
    setLoading(false)
  }

  return (
    <div style={cardStyle}>
      <h2>➕ Add Candidate</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gap: '10px' }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={inputStyle} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
        <input name="skills" placeholder="Skills: React, Node.js, MongoDB" value={form.skills} onChange={handleChange} style={inputStyle} />
        <input name="experience" placeholder="Years of Experience" type="number" value={form.experience} onChange={handleChange} style={inputStyle} />
        <button onClick={handleSubmit} disabled={loading} style={btnStyle}>
          {loading ? 'Adding...' : '➕ Add Candidate'}
        </button>
      </div>
    </div>
  )
}

const cardStyle = { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }
const btnStyle = { padding: '10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' }

export default CandidateForm