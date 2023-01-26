import { log, checkOsVer } from '@sys-cli/utils'
import Command from '@sys-cli/command'
import setOsConfig from './setOsConfig.js'

class OsconfCommand extends Command {
  get command() {
    return 'osconfig'
  }
  get description() {
    return 'linux system basic configuration'
  }
  get options() {
    return [
      ['-f, --force', 'whether to force update configuration', false],
      ['-n, --hostname <hostname>', 'system hostname']
    ]
  }
  async action([opts]) {
    log.verbose('osconfig', opts)
    await setOsConfig(opts)
  }
  preAction() {
    checkOsVer()
  }
}

const Osconf = (instance) => {
  return new OsconfCommand(instance)
}

export default Osconf
