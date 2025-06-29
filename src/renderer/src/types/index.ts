// Type definitions for renderer process

export type LanguageVarious = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'pt' | 'ru' | 'ar' | 'hi'

export enum ThemeMode {
  light = 'light',
  dark = 'dark',
  system = 'system'
}

export interface Shortcut {
  key: string
  action: string
  enabled: boolean
}

export interface OpendalTestResult {
  success: boolean
  message: string
}

export interface SystemInfo {
  platform: string
  version: string
  arch: string
}

export interface AppConfig {
  language: LanguageVarious
  theme: ThemeMode
  shortcuts: Shortcut[]
  enableDataCollection: boolean
}

// Global window interface
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
      testOpendal: () => Promise<OpendalTestResult>
      
      // System info
      platform: string
      version: string
    }
  }
}

export {}