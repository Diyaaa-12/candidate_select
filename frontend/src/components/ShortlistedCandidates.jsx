function ShortlistedCandidates({ candidates, aiResult }) {
  const colors = {
    High:   { border: '#27ae60', bg: '#eafaf1', text: '#27ae60' },
    Medium: { border: '#f39c12', bg: '#fef9e7', text: '#f39c12' },
    Low:    { border: '#e74c3c', bg: '#fdedec', text: '#e74c3c' }
  }

  return (
    <div>
      {candidates.length > 0 && (
        <div style={cardStyle}>
          <h2>📊 Shortlisted Candidates ({candidates.length})</h2>
          {candidates.map((c, i) => {
            const color = colors[c.tier] || colors.Low
            return (
              <div key={i} style={{
                border: `2px solid ${color.border}`,
                background: color.bg,
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '16px' }}>#{i + 1} {c.name}</strong>
                    <span style={{ color: '#666', marginLeft: '10px' }}>{c.email}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: color.text, fontWeight: 'bold', fontSize: '18px' }}>
                      {c.matchScore}%
                    </span><br />
                    <span style={{ color: color.text, fontWeight: 'bold' }}>{c.tier} Match</span>
                  </div>
                </div>
                <p style={{ margin: '8px 0 0' }}>
                  ✅ Matched: <strong>{c.matchedSkills.length > 0 ? c.matchedSkills.join(', ') : 'None'}</strong>
                </p>
                <p style={{ margin: '4px 0 0' }}>📅 Experience: {c.experience} years</p>
              </div>
            )
          })}
        </div>
      )}

      {aiResult && (
        <div style={{ ...cardStyle, background: '#f8f0ff', border: '2px solid #8e44ad' }}>
          <h2>🤖 AI Recommendation</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial', lineHeight: '1.8', margin: 0 }}>
            {aiResult}
          </pre>
        </div>
      )}
    </div>
  )
}

const cardStyle = { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }

export default ShortlistedCandidates