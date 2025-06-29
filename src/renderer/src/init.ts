// Initialize renderer process
console.log('Cherry Studio Renderer - Initializing...')

// Test opendal module availability
if (window.electronAPI?.testOpendal) {
  window.electronAPI.testOpendal().then((result) => {
    if (result.success) {
      console.log('✅ opendal module test passed:', result.message)
    } else {
      console.error('❌ opendal module test failed:', result.message)
    }
  }).catch((error) => {
    console.error('❌ opendal module test error:', error)
  })
}

// Display system information
if (window.electronAPI) {
  console.log('Platform:', window.electronAPI.platform)
  console.log('Electron Version:', window.electronAPI.version)
}

console.log('Cherry Studio Renderer - Initialization complete')