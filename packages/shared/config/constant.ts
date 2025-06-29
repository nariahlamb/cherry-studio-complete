// Shared constants between main and renderer processes

export const occupiedDirs = [
  'databases',
  'embeddings',
  'temp',
  'logs'
]

export const APP_CONSTANTS = {
  NAME: 'Cherry Studio',
  PROTOCOL: 'cherry-studio',
  
  // File extensions
  SUPPORTED_IMAGE_EXTENSIONS: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
  SUPPORTED_DOCUMENT_EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt', '.md'],
  
  // Limits
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_MESSAGE_LENGTH: 10000,
  
  // URLs
  HOMEPAGE: 'https://cherry-ai.com',
  DOCS_URL: 'https://docs.cherry-ai.com',
  GITHUB_URL: 'https://github.com/CherryHQ/cherry-studio'
}

export default APP_CONSTANTS