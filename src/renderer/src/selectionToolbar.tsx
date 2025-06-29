import React from 'react'
import { createRoot } from 'react-dom/client'

function SelectionToolbar() {
  return (
    <div style={{
      padding: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '5px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }}>
      <button style={{
        padding: '5px 10px',
        background: '#667eea',
        border: 'none',
        borderRadius: '3px',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer'
      }}>
        Ask AI
      </button>
      <button style={{
        padding: '5px 10px',
        background: '#764ba2',
        border: 'none',
        borderRadius: '3px',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer'
      }}>
        Translate
      </button>
      <button style={{
        padding: '5px 10px',
        background: '#f093fb',
        border: 'none',
        borderRadius: '3px',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer'
      }}>
        Summarize
      </button>
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<SelectionToolbar />)
}