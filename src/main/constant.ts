import { app } from 'electron'
import path from 'path'

export const isDev = process.env.NODE_ENV === 'development'
export const isWin = process.platform === 'win32'
export const isMac = process.platform === 'darwin'
export const isLinux = process.platform === 'linux'

export const APP_NAME = 'Cherry Studio'
export const APP_VERSION = app.getVersion()
export const USER_AGENT = `${APP_NAME}/${APP_VERSION}`

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'resources')
  : path.join(__dirname, '../../resources')

export const CHERRY_STUDIO_DATA_PATH = path.join(app.getPath('userData'), 'data')
export const CHERRY_STUDIO_LOGS_PATH = path.join(app.getPath('userData'), 'logs')
export const CHERRY_STUDIO_TEMP_PATH = path.join(app.getPath('userData'), 'temp')

export const WINDOW_BOUNDS = {
  width: 1200,
  height: 800,
  minWidth: 800,
  minHeight: 600
}

export const MINI_WINDOW_BOUNDS = {
  width: 400,
  height: 600,
  minWidth: 300,
  minHeight: 400
}

export const SELECTION_TOOLBAR_BOUNDS = {
  width: 300,
  height: 50
}

export const SELECTION_ACTION_BOUNDS = {
  width: 400,
  height: 300
}