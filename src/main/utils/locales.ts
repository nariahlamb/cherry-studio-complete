export const locales = {
  'en': 'English',
  'zh-CN': '中文（简体）',
  'zh-TW': '中文（繁體）',
  'ja': '日本語',
  'ko': '한국어',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'pt': 'Português',
  'ru': 'Русский',
  'ar': 'العربية',
  'hi': 'हिन्दी'
}

export const defaultLanguage = 'en'

export function getLanguageName(code: string): string {
  return locales[code] || code
}

export function getSupportedLanguages(): string[] {
  return Object.keys(locales)
}