import fs from 'fs'
import path from 'path'
import os from 'os'

const configPath = path.join(os.homedir(), '.bsalecliconfig')

interface Config {
  baseURL: string
  token: string
}

export function loadConfig(): Config | null {
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf8')
    return JSON.parse(config) as Config
  }

  return null
}

export function saveConfig(config: Config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8')
  console.log(`configuration was stored at ${configPath}`)
}

export function configure(baseURL: string, token: string) {
  const config: Config = { baseURL, token }
  saveConfig(config)
}
