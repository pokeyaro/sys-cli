import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { log, runScript } from '@sys-cli/utils'

// get directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const scriptPath = path.resolve(__dirname, '../script')

/**
 * exec shell script
 */
const execSetHostname = async (host) => {
  return await runScript('set-hostname.sh', scriptPath, host)
}

/**
 * dispatcher
 */
const setOsConfig = async (opts) => {
  if (opts.force) {
    const host = opts.hostname
    await execSetHostname(host)
    log.success('🎉 The hostname is set successfully ~')
  } else {
    log.failed('🫥  Please use the --force option to actually execute!')
  }
}

export default setOsConfig
