import { BrowserWindow } from 'electron'

export function replaceDevtoolsFont(): void {
  // Replace devtools font for better readability in development
  const windows = BrowserWindow.getAllWindows()
  windows.forEach(window => {
    if (window.webContents.isDevToolsOpened()) {
      window.webContents.devToolsWebContents?.executeJavaScript(`
        const style = document.createElement('style')
        style.textContent = \`
          .console-message-text,
          .console-message,
          .source-code {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
            font-size: 12px !important;
          }
        \`
        document.head.appendChild(style)
      `)
    }
  })
}

export function setWindowBounds(window: BrowserWindow, bounds: { width: number; height: number; x?: number; y?: number }): void {
  window.setBounds(bounds)
}

export function centerWindow(window: BrowserWindow): void {
  window.center()
}