const fs = require('fs')
const path = require('path')
const os = require('os')

function downloadNpmPackage(packageName, url) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'npm-download-'))

  const targetDir = path.join('./node_modules/', packageName)
  const filename = packageName.replace('/', '-') + '.tgz'

  // Skip if directory already exists
  if (fs.existsSync(targetDir)) {
    console.log(`${targetDir} already exists, skipping download...`)
    return
  }

  try {
    console.log(`Downloading ${packageName}...`, url)
    const { execSync } = require('child_process')
    
    // Use PowerShell on Windows for better compatibility
    if (process.platform === 'win32') {
      execSync(`powershell -Command "Invoke-WebRequest -Uri '${url}' -OutFile '${filename}'"`)
      execSync(`powershell -Command "tar -xf '${filename}'"`)
      execSync(`powershell -Command "Remove-Item '${filename}'"`)
      execSync(`powershell -Command "New-Item -ItemType Directory -Force -Path '${targetDir}'"`)
      execSync(`powershell -Command "Move-Item -Path 'package\\*' -Destination '${targetDir}' -Force"`)
      execSync(`powershell -Command "Remove-Item -Path 'package' -Recurse -Force"`)
    } else {
      execSync(`curl --fail -o ${filename} ${url}`)
      execSync(`tar -xvf ${filename}`)
      execSync(`rm -rf ${filename}`)
      execSync(`mkdir -p ${targetDir}`)
      execSync(`mv package/* ${targetDir}/`)
    }
  } catch (error) {
    console.error(`Error processing ${packageName}: ${error.message}`)
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename)
    }
    throw error
  }

  fs.rmSync(tempDir, { recursive: true, force: true })
}

module.exports = {
  downloadNpmPackage
}