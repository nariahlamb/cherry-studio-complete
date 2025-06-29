const { downloadNpmPackage } = require('./utils')

async function downloadNpm(platform) {
  console.log(`Starting npm package download for platform: ${platform || 'all'}`)

  if (!platform || platform === 'mac') {
    console.log('Downloading macOS packages...')
    downloadNpmPackage(
      '@libsql/darwin-arm64',
      'https://registry.npmjs.org/@libsql/darwin-arm64/-/darwin-arm64-0.4.7.tgz'
    )
    downloadNpmPackage('@libsql/darwin-x64', 'https://registry.npmjs.org/@libsql/darwin-x64/-/darwin-x64-0.4.7.tgz')
  }

  if (!platform || platform === 'linux') {
    console.log('Downloading Linux packages...')
    downloadNpmPackage(
      '@libsql/linux-arm64-gnu',
      'https://registry.npmjs.org/@libsql/linux-arm64-gnu/-/linux-arm64-gnu-0.4.7.tgz'
    )
    downloadNpmPackage(
      '@libsql/linux-arm64-musl',
      'https://registry.npmjs.org/@libsql/linux-arm64-musl/-/linux-arm64-musl-0.4.7.tgz'
    )
    downloadNpmPackage(
      '@libsql/linux-x64-gnu',
      'https://registry.npmjs.org/@libsql/linux-x64-gnu/-/linux-x64-gnu-0.4.7.tgz'
    )
    downloadNpmPackage(
      '@libsql/linux-x64-musl',
      'https://registry.npmjs.org/@libsql/linux-x64-musl/-/linux-x64-musl-0.4.7.tgz'
    )
  }

  if (!platform || platform === 'windows') {
    console.log('Downloading Windows packages...')
    downloadNpmPackage(
      '@libsql/win32-x64-msvc',
      'https://registry.npmjs.org/@libsql/win32-x64-msvc/-/win32-x64-msvc-0.4.7.tgz'
    )
    
    // Note: Removed @strongtz/win32-arm64-msvc as it was causing issues
    // Only download if specifically needed for ARM64 builds
    if (process.env.BUILD_ARM64 === 'true') {
      console.log('ARM64 build requested, downloading ARM64 package...')
      downloadNpmPackage(
        '@strongtz/win32-arm64-msvc',
        'https://registry.npmjs.org/@strongtz/win32-arm64-msvc/-/win32-arm64-msvc-0.4.7.tgz'
      )
    } else {
      console.log('Skipping ARM64 package for x64-only build')
    }
  }

  console.log('npm package download completed!')
}

const platformArg = process.argv[2]
downloadNpm(platformArg).catch(error => {
  console.error('Failed to download npm packages:', error)
  process.exit(1)
})