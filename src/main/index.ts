// don't reorder this file, it's used to initialize the app data dir and
// other which should be run before the main process is ready
// eslint-disable-next-line
import './bootstrap'

import '@main/config'

import { electronApp, optimizer } from '@electron-toolkit/utils'
import { replaceDevtoolsFont } from '@main/utils/windowUtil'
import { app } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import Logger from 'electron-log'

import { isDev, isWin } from './constant'
import { registerIpc } from './ipc'
import { configManager } from './services/ConfigManager'
import mcpService from './services/MCPService'
import {
  CHERRY_STUDIO_PROTOCOL,
  handleProtocolUrl,
  registerProtocolClient,
  setupAppImageDeepLink
} from './services/ProtocolClient'
import selectionService, { initSelectionService } from './services/SelectionService'
import { registerShortcuts } from './services/ShortcutService'
import { TrayService } from './services/TrayService'
import { windowService } from './services/WindowService'

Logger.initialize()

/**
 * Disable chromium's window animations
 * main purpose for this is to avoid the transparent window flashing when it is shown
 * (especially on Windows for SelectionAssistant Toolbar)
 * Know Issue: https://github.com/electron/electron/issues/12130#issuecomment-627198990
 */
if (isWin) {
  app.commandLine.appendSwitch('wm-window-animations-disabled')
}

// Enable features for unresponsive renderer js call stacks
app.commandLine.appendSwitch('enable-features', 'DocumentPolicyIncludeJSCallStacksInCrashReports')
app.on('web-contents-created', (_, webContents) => {
  webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Document-Policy': ['include-js-call-stacks-in-crash-reports']
      }
    })
  })
})

// This allows for a single instance of the app
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window instead.
    const mainWindow = windowService.getMainWindow()
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }

    // Handle protocol URL from second instance
    const url = commandLine.find((arg) => arg.startsWith(CHERRY_STUDIO_PROTOCOL))
    if (url) {
      handleProtocolUrl(url)
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.kangfenmao.CherryStudio')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    registerProtocolClient()
    registerIpc()
    registerShortcuts()

    await configManager.init()

    if (isDev) {
      try {
        await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      } catch (e) {
        console.error('Failed to install extensions:', e)
      }
    }

    windowService.createMainWindow()

    if (isDev) {
      replaceDevtoolsFont()
    }

    initSelectionService()

    // Initialize MCP service
    mcpService.initialize()

    // Initialize tray service
    TrayService.getInstance()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (windowService.getAllWindows().length === 0) windowService.createMainWindow()
    })

    // Handle protocol URL on app launch
    if (process.platform !== 'darwin') {
      const url = process.argv.find((arg) => arg.startsWith(CHERRY_STUDIO_PROTOCOL))
      if (url) {
        handleProtocolUrl(url)
      }
    }

    // Setup AppImage deep link for Linux
    if (process.platform === 'linux') {
      setupAppImageDeepLink()
    }
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('open-url', (event, url) => {
    event.preventDefault()
    handleProtocolUrl(url)
  })

  // In this file you can include the rest of your app"s main process
  // code. You can also put them in separate files and require them here.
}