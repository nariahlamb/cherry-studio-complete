import { ipcMain } from 'electron'
import { windowService } from './services/WindowService'

export function registerIpc() {
  // Window management
  ipcMain.handle('window:minimize', () => {
    const mainWindow = windowService.getMainWindow()
    if (mainWindow) {
      mainWindow.minimize()
    }
  })

  ipcMain.handle('window:maximize', () => {
    const mainWindow = windowService.getMainWindow()
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    }
  })

  ipcMain.handle('window:close', () => {
    const mainWindow = windowService.getMainWindow()
    if (mainWindow) {
      mainWindow.close()
    }
  })

  ipcMain.handle('window:isMaximized', () => {
    const mainWindow = windowService.getMainWindow()
    return mainWindow?.isMaximized() || false
  })

  // App info
  ipcMain.handle('app:getVersion', () => {
    return process.versions.electron
  })

  ipcMain.handle('app:getPlatform', () => {
    return process.platform
  })

  // Test opendal module
  ipcMain.handle('test:opendal', () => {
    try {
      const opendal = require('opendal')
      console.log('✅ opendal module loaded successfully in main process')
      return { success: true, message: 'opendal module loaded successfully' }
    } catch (error) {
      console.error('❌ Failed to load opendal module:', error)
      return { success: false, message: error.message }
    }
  })
}