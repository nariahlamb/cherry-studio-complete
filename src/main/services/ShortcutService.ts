import { globalShortcut } from 'electron'
import { windowService } from './WindowService'

export function registerShortcuts(): void {
  console.log('ShortcutService: Registering global shortcuts...')

  // Register Ctrl+Shift+C to show/hide main window
  try {
    const ret = globalShortcut.register('CommandOrControl+Shift+C', () => {
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

    if (!ret) {
      console.warn('ShortcutService: Failed to register CommandOrControl+Shift+C')
    } else {
      console.log('ShortcutService: Registered CommandOrControl+Shift+C')
    }
  } catch (error) {
    console.error('ShortcutService: Error registering shortcuts:', error)
  }
}

export function unregisterShortcuts(): void {
  console.log('ShortcutService: Unregistering all shortcuts...')
  globalShortcut.unregisterAll()
}