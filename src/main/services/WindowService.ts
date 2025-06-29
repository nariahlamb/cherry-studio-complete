import { BrowserWindow, shell } from 'electron'
import path from 'path'
import { isDev } from '../constant'

class WindowService {
  private mainWindow: BrowserWindow | null = null
  private windows: Map<string, BrowserWindow> = new Map()

  createMainWindow(): BrowserWindow {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#2f3241',
        symbolColor: '#74b1be'
      },
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegration: false,
        contextIsolation: true
      }
    })

    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow?.show()
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (isDev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    }

    this.windows.set('main', this.mainWindow)
    return this.mainWindow
  }

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  getAllWindows(): BrowserWindow[] {
    return Array.from(this.windows.values())
  }

  closeAllWindows(): void {
    this.windows.forEach(window => {
      if (!window.isDestroyed()) {
        window.close()
      }
    })
    this.windows.clear()
    this.mainWindow = null
  }
}

export const windowService = new WindowService()