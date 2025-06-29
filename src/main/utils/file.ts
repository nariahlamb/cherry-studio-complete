import fs from 'fs'
import path from 'path'
import { app } from 'electron'

export function initAppDataDir(): void {
  const userDataPath = app.getPath('userData')
  const dataPath = path.join(userDataPath, 'data')
  const logsPath = path.join(userDataPath, 'logs')
  const tempPath = path.join(userDataPath, 'temp')

  // Create directories if they don't exist
  const dirs = [dataPath, logsPath, tempPath]
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export function readJsonFile(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error reading JSON file:', error)
    return null
  }
}

export function writeJsonFile(filePath: string, data: any): void {
  try {
    const content = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, content, 'utf-8')
  } catch (error) {
    console.error('Error writing JSON file:', error)
  }
}