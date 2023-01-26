import os from 'node:os'
import chalker from './chalk.js'

// limit os version
const LIMIT_OS_ENV = ['linux', 'darwin']

const checkOsVer = () => {
  const version = os.platform().toLowerCase()
  if (LIMIT_OS_ENV.indexOf(version) === -1) {
    throw new Error(chalker.warn('Unsupported OS distribution type'))
  }
}

export default checkOsVer
