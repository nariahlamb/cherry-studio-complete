declare global {
  interface Window {
    electronAPI?: {
      // Window controls
      minimizeWindow: () => Promise<void>
      maximizeWindow: () => Promise<void>
      closeWindow: () => Promise<void>
      isWindowMaximized: () => Promise<boolean>
      
      // App info
      getVersion: () => Promise<string>
      getPlatform: () => Promise<string>
      
      // Test opendal
      testOpendal: () => Promise<{ success: boolean; message: string }>
      
      // System info
      platform: string
      version: string
    }
  }
}

export {}