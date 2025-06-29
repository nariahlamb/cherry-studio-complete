import { EventEmitter } from 'events'

class SelectionService extends EventEmitter {
  private enabled = false

  isEnabled(): boolean {
    return this.enabled
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
    console.log(`SelectionService: ${enabled ? 'enabled' : 'disabled'}`)
  }

  handleSelection(text: string): void {
    if (!this.enabled) {
      return
    }

    console.log('SelectionService: Handling selection:', text.substring(0, 100))
    this.emit('selection', text)
  }
}

const selectionService = new SelectionService()

export function initSelectionService(): void {
  console.log('SelectionService: Initializing...')
  selectionService.setEnabled(true)
}

export default selectionService