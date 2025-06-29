import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

function SelectionAction() {
  const [selectedText, setSelectedText] = useState('')
  const [response, setResponse] = useState('')

  return (
    <div style={{
      padding: '20px',
      background: '#1a1a1a',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>Selection Action</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Selected Text:</label>
        <textarea
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          placeholder="Paste your selected text here..."
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            background: '#2a2a2a',
            border: '1px solid #444',
            borderRadius: '5px',
            color: 'white',
            resize: 'vertical'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button style={{
          padding: '8px 15px',
          background: '#667eea',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Ask AI
        </button>
        <button style={{
          padding: '8px 15px',
          background: '#764ba2',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Translate
        </button>
        <button style={{
          padding: '8px 15px',
          background: '#f093fb',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Summarize
        </button>
      </div>
      
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Response:</label>
        <div style={{
          width: '100%',
          height: '100%',
          padding: '10px',
          background: '#2a2a2a',
          border: '1px solid #444',
          borderRadius: '5px',
          color: 'white',
          overflow: 'auto'
        }}>
          {response || 'AI response will appear here...'}
        </div>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<SelectionAction />)
}