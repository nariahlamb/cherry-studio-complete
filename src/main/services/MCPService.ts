import { EventEmitter } from 'events'

class MCPService extends EventEmitter {
  private initialized = false

  initialize(): void {
    if (this.initialized) {
      return
    }

    console.log('MCPService: Initializing...')
    
    // Test opendal module loading
    try {
      const opendal = require('opendal')
      console.log('✅ MCPService: opendal module loaded successfully')
      console.log('MCPService: opendal version:', opendal.version || 'unknown')
    } catch (error) {
      console.error('❌ MCPService: Failed to load opendal module:', error)
    }

    this.initialized = true
    console.log('MCPService: Initialization complete')
  }

  isInitialized(): boolean {
    return this.initialized
  }

  shutdown(): void {
    console.log('MCPService: Shutting down...')
    this.initialized = false
  }
}

const mcpService = new MCPService()
export default mcpService