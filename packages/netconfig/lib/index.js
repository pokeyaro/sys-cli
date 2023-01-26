import { log, checkOsVer } from '@sys-cli/utils'
import Command from '@sys-cli/command'
import getNetConfig from './getNetConfig.js'
import setNetConfig from './setNetConfig.js'
import checkSyntax from './checkSyntax.js'

/**
 * Examples:
 * [interactive]     sys-cli netconfig
 * [non-interactive] sys-cli netconfig --ifname eth0 --ipaddr 10.95.0.50 --netmask 255.255.255.0 --gateway 10.95.0.1 -y
 */
class NetconfCommand extends Command {
  get command() {
    return 'netconfig'
  }
  get description() {
    return 'linux system network interface configuration'
  }
  get options() {
    return [
      ['-c, --cidr <ip/mask>', 'classless inter-domain routing'],
      ['-g, --gateway <gateway>', 'gateway address'],
      ['-i, --ipaddr <ipaddr>', 'ipv4 address'],
      ['-m, --netmask <netmask>', 'subnet mask'],
      ['-n, --ifname <ifname>', 'nic device interface name'],
      ['-y, --yes', 'whether to skip the interaction', false]
    ]
  }
  async action([opts]) {
    // 1.Pre check syntax
    log.verbose('netconfig', opts)
    checkSyntax(opts)

    // 2.Generate network configuration
    const netConf = await getNetConfig(opts)
    log.verbose('netconfig', netConf)

    // 3.Configure network services and restart
    const netServe = await setNetConfig(netConf, opts)
    log.verbose('netserve', netServe)
  }
  preAction() {
    // 0.Check command execution environment
    checkOsVer()
  }
}

const Netconf = (instance) => {
  return new NetconfCommand(instance)
}

export default Netconf
