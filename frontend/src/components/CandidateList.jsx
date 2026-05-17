import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://candidate-selection-backend-i4gj.onrender.com'

function CandidateList({ refresh }) {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${API}/candidates`)
        setCandidates(res.data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchCandidates()
  }, [refresh])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this candidate?')) return
    try {
      await axios.delete(`${API}/candidates/${id}`)
      setCandidates(candidates.filter(c => c._id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <p>⏳ Loading candidates...</p>

  return (
    <div style={cardStyle}>
      <h2>👥 All Candidates ({candidates.length})</h2>
      <input
        placeholder="🔍 Search by name or skill..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ ...inputStyle, marginBottom: '15px' }}
      />

      {filtered.length === 0 && <p>No candidates found.</p>}

      {filtered.map(c => (
        <div key={c._id} style={itemStyle}>
          <div>
            <strong style={{ fontSize: '16px' }}>{c.name}</strong>
            <span style={{ color: '#666', marginLeft: '10px' }}>{c.email}</span><br />
            <span>🛠 {c.skills.join(', ')}</span><br />
            <span>📅 {c.experience} year(s) experience</span>
          </div>
          <button onClick={() => handleDelete(c._id)} style={deleteBtnStyle}>🗑</button>
        </div>
      ))}
    </div>
  )
}

const cardStyle = { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }
const itemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' }
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }
const deleteBtnStyle = { background: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }

export default CandidateList