import { app } from 'electron'
import path from 'path'

// App configuration
export const APP_CONFIG = {
  name: 'Cherry Studio',
  version: app.getVersion(),
  userAgent: `Cherry Studio/${app.getVersion()}`,
  
  // Paths
  dataPath: path.join(app.getPath('userData'), 'data'),
  logsPath: path.join(app.getPath('userData'), 'logs'),
  tempPath: path.join(app.getPath('userData'), 'temp'),
  
  // Window settings
  window: {
    main: {
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600
    },
    mini: {
      width: 400,
      height: 600,
      minWidth: 300,
      minHeight: 400
    }
  },
  
  // Development settings
  isDev: process.env.NODE_ENV === 'development',
  isPackaged: app.isPackaged
}

export default APP_CONFIG