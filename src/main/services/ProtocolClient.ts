import { app, shell } from 'electron'
import { windowService } from './WindowService'

export const CHERRY_STUDIO_PROTOCOL = 'cherry-studio'

export function registerProtocolClient(): void {
  console.log('ProtocolClient: Registering protocol handler...')
  
  // Set as default protocol client
  if (!app.isDefaultProtocolClient(CHERRY_STUDIO_PROTOCOL)) {
    app.setAsDefaultProtocolClient(CHERRY_STUDIO_PROTOCOL)
  }

  console.log(`ProtocolClient: Registered ${CHERRY_STUDIO_PROTOCOL}:// protocol`)
}

export function handleProtocolUrl(url: string): void {
  console.log('ProtocolClient: Handling protocol URL:', url)
  
  // Show main window when protocol URL is opened
  const mainWindow = windowService.getMainWindow()
  if (mainWindow) {
    mainWindow.show()
    mainWindow.focus()
  } else {
    windowService.createMainWindow()
  }

  // Parse and handle the URL
  try {
    const parsedUrl = new URL(url)
    console.log('ProtocolClient: Parsed URL:', parsedUrl.pathname, parsedUrl.searchParams)
    
    // Handle different protocol actions here
    // For now, just log the action
  } catch (error) {
    console.error('ProtocolClient: Error parsing protocol URL:', error)
  }
}

export function setupAppImageDeepLink(): void {
  // Linux AppImage deep link setup
  if (process.platform === 'linux' && process.env.APPIMAGE) {
    console.log('ProtocolClient: Setting up AppImage deep link...')
    // Additional setup for Linux AppImage if needed
  }
}