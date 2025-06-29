import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Remove spinner once React app loads
const spinner = document.getElementById('spinner')
if (spinner) {
  spinner.style.display = 'none'
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}

console.timeEnd('init')
console.log('Cherry Studio - React app loaded')