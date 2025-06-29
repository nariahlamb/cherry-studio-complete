import { app } from 'electron'
import Store from 'electron-store'

export enum ConfigKeys {
  Language = 'language',
  Theme = 'theme',
  LaunchToTray = 'launchToTray',
  Tray = 'tray',
  TrayOnClose = 'trayOnClose',
  ZoomFactor = 'ZoomFactor',
  Shortcuts = 'shortcuts',
  ClickTrayToShowQuickAssistant = 'clickTrayToShowQuickAssistant',
  EnableQuickAssistant = 'enableQuickAssistant',
  AutoUpdate = 'autoUpdate',
  TestPlan = 'testPlan',
  TestChannel = 'testChannel',
  EnableDataCollection = 'enableDataCollection',
  SelectionAssistantEnabled = 'selectionAssistantEnabled',
  SelectionAssistantTriggerMode = 'selectionAssistantTriggerMode',
  SelectionAssistantFollowToolbar = 'selectionAssistantFollowToolbar',
  SelectionAssistantRemeberWinSize = 'selectionAssistantRemeberWinSize',
  SelectionAssistantFilterMode = 'selectionAssistantFilterMode',
  SelectionAssistantFilterList = 'selectionAssistantFilterList'
}

export class ConfigManager {
  private store: Store
  private subscribers: Map<string, Array<(newValue: any) => void>> = new Map()

  constructor() {
    this.store = new Store()
  }

  async init(): Promise<void> {
    console.log('ConfigManager initialized')
  }

  getLanguage(): string {
    const locale = app.getLocale()
    return this.get(ConfigKeys.Language, locale)
  }

  setLanguage(lang: string) {
    this.setAndNotify(ConfigKeys.Language, lang)
  }

  getTheme(): string {
    return this.get(ConfigKeys.Theme, 'system')
  }

  setTheme(theme: string) {
    this.setAndNotify(ConfigKeys.Theme, theme)
  }

  get(key: string, defaultValue?: any): any {
    return this.store.get(key, defaultValue)
  }

  set(key: string, value: any): void {
    this.store.set(key, value)
  }

  private setAndNotify(key: string, value: any): void {
    this.set(key, value)
    this.notifySubscribers(key, value)
  }

  private notifySubscribers(key: string, value: any): void {
    const callbacks = this.subscribers.get(key)
    if (callbacks) {
      callbacks.forEach(callback => callback(value))
    }
  }

  subscribe(key: string, callback: (newValue: any) => void): void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, [])
    }
    this.subscribers.get(key)!.push(callback)
  }

  unsubscribe(key: string, callback: (newValue: any) => void): void {
    const callbacks = this.subscribers.get(key)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }
}

export const configManager = new ConfigManager()