import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api'

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setMessage('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    setLoading(true)
    try {
      const url = isLogin ? `${API}/auth/login` : `${API}/auth/register`
      const res = await axios.post(url, { email, password })

      if (isLogin) {
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
      } else {
        setMessage('✅ Registered successfully! Please login.')
        setIsLogin(true)
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      // This now shows the REAL error
      if (err.response) {
        setError(err.response.data?.error || 'Server error')
      } else if (err.request) {
        setError('Cannot connect to server. Is backend running on port 5000?')
      } else {
        setError(err.message)
      }
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {/* Logo / Header */}
        <div style={headerStyle}>
          <div style={logoStyle}>🎯</div>
          <h1 style={{ margin: '10px 0 4px', fontSize: '24px', color: '#1a1a2e' }}>
            Candidate Shortlisting
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            AI-Powered Recruitment System
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={tabContainerStyle}>
          <button
            onClick={() => { setIsLogin(true); setError(''); setMessage('') }}
            style={{ ...tabStyle, ...(isLogin ? activeTabStyle : {}) }}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); setMessage('') }}
            style={{ ...tabStyle, ...(!isLogin ? activeTabStyle : {}) }}
          >
            Register
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div style={successBoxStyle}>
            {message}
          </div>
        )}
        {error && (
          <div style={errorBoxStyle}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              placeholder="you@example.com"
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...submitBtnStyle, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Please wait...' : isLogin ? '🔐 Login' : '📝 Create Account'}
          </button>
        </div>

        {/* Switch */}
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(''); setMessage('') }}
            style={{ color: '#4361ee', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>

      </div>
    </div>
  )
}

// ── Styles ──────────────────────────────────────────
const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
}

const cardStyle = {
  background: 'white',
  borderRadius: '16px',
  padding: '40px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '28px'
}

const logoStyle = {
  fontSize: '48px',
  marginBottom: '4px'
}

const tabContainerStyle = {
  display: 'flex',
  background: '#f0f0f0',
  borderRadius: '8px',
  padding: '4px',
  marginBottom: '24px'
}

const tabStyle = {
  flex: 1,
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  background: 'transparent',
  color: '#666',
  transition: 'all 0.2s'
}

const activeTabStyle = {
  background: 'white',
  color: '#4361ee',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 'bold',
  fontSize: '13px',
  color: '#444'
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1.5px solid #ddd',
  fontSize: '15px',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border 0.2s'
}

const submitBtnStyle = {
  padding: '14px',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '4px'
}

const errorBoxStyle = {
  background: '#fff0f0',
  border: '1px solid #ffcccc',
  color: '#c0392b',
  padding: '12px 16px',
  borderRadius: '8px',
  marginBottom: '16px',
  fontSize: '14px'
}

const successBoxStyle = {
  background: '#f0fff4',
  border: '1px solid #b7ebc8',
  color: '#27ae60',
  padding: '12px 16px',
  borderRadius: '8px',
  marginBottom: '16px',
  fontSize: '14px'
}

export default Auth