import { useState } from 'react'
import CandidateForm from './components/CandidateForm'
import CandidateList from './components/CandidateList'
import JobForm from './components/JobForm'
import ShortlistedCandidates from './components/ShortlistedCandidates'
import Auth from './components/Auth'

function App() {
  const [shortlisted, setShortlisted] = useState([])
  const [aiResult, setAiResult] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [activeTab, setActiveTab] = useState('candidates')

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  if (!token) {
    return <Auth setToken={setToken} />
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>🎯 Candidate Shortlisting System</h1>
        <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['candidates', 'match'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab ? '#3498db' : '#ecf0f1',
              color: activeTab === tab ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'candidates' ? '👥 Candidates' : '🔍 Match / AI'}
          </button>
        ))}
      </div>

      {activeTab === 'candidates' && (
        <>
          <CandidateForm onAdd={() => setRefresh(prev => !prev)} />
          <CandidateList refresh={refresh} />
        </>
      )}

      {activeTab === 'match' && (
        <>
          <JobForm setShortlisted={setShortlisted} setAiResult={setAiResult} />
          <ShortlistedCandidates candidates={shortlisted} aiResult={aiResult} />
        </>
      )}
    </div>
  )
}

export default App