import { app, Menu, nativeImage, Tray } from 'electron'
import path from 'path'
import { windowService } from './WindowService'

export class TrayService {
  private static instance: TrayService
  private tray: Tray | null = null

  private constructor() {}

  static getInstance(): TrayService {
    if (!TrayService.instance) {
      TrayService.instance = new TrayService()
    }
    return TrayService.instance
  }

  init(): void {
    if (this.tray) {
      return
    }

    // Create tray icon
    const iconPath = path.join(__dirname, '../../resources/tray_icon.png')
    let trayIcon
    
    try {
      trayIcon = nativeImage.createFromPath(iconPath)
      if (trayIcon.isEmpty()) {
        // Fallback to a simple icon if file doesn't exist
        trayIcon = nativeImage.createEmpty()
      }
    } catch (error) {
      console.warn('Failed to load tray icon, using empty icon:', error)
      trayIcon = nativeImage.createEmpty()
    }

    this.tray = new Tray(trayIcon)
    this.tray.setToolTip('Cherry Studio')

    // Create context menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show Cherry Studio',
        click: () => {
          const mainWindow = windowService.getMainWindow()
          if (mainWindow) {
            mainWindow.show()
            mainWindow.focus()
          } else {
            windowService.createMainWindow()
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        click: () => {
          app.quit()
        }
      }
    ])

    this.tray.setContextMenu(contextMenu)

    // Handle tray click
    this.tray.on('click', () => {
      const mainWindow = windowService.getMainWindow()
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.hide()
        } else {
          mainWindow.show()
          mainWindow.focus()
        }
      } else {
        windowService.createMainWindow()
      }
    })
  }

  destroy(): void {
    if (this.tray) {
      this.tray.destroy()
      this.tray = null
    }
  }

  getTray(): Tray | null {
    return this.tray
  }
}