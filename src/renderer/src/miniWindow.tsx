import React from 'react'
import { createRoot } from 'react-dom/client'

function MiniWindow() {
  return (
    <div style={{
      padding: '20px',
      background: '#1a1a1a',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h2>🍒 Cherry Studio Mini</h2>
      <p>Mini window for quick access</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.electronAPI?.closeWindow()}
          style={{
            padding: '10px 20px',
            background: '#667eea',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<MiniWindow />)
}