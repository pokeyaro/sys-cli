import path from 'node:path'
import fse from 'fs-extra'
import semver from 'semver'
import { program } from 'commander'
import { dirname } from 'dirname-filename-esm'
import { log, chalker } from '@sys-cli/utils'

const __dirname = dirname(import.meta)
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fse.readJsonSync(pkgPath)

const LOWEST_NODE_VERSION = '14.0.0'

// Check Node version
const checkNodeVersion = () => {
  log.verbose('node version', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(
      chalker.error(
        `sys-cli needs to install Node.js interpreter version ${LOWEST_NODE_VERSION} or later`
      )
    )
  }
}

// front hook
const preAction = () => {
  checkNodeVersion()
}

export default function createCLI() {
  log.verbose(pkg.version)
  // Main command base construction
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(`Version ${pkg.version}`)
    .option('-d, --debug', 'whether to enable debug mode', false)
    .hook('preAction', preAction)

  // Listen to the debug status attribute
  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  // Listen for commands that don't exist
  program.on('command:*', (obj) => {
    log.error('unknown command: ' + obj[0])
  })

  return program
}
