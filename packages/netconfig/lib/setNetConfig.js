import ora from 'ora'
import {
  log,
  printErrorLog,
  runScript,
  pressContinue,
  chalker
} from '@sys-cli/utils'
import { SET_NETWORK, SCRIPT_PATH } from './constant.js'

/**
 * exec shell script
 */
const execSetNetwork = async (args) => {
  const setNetExec = await runScript(
    SET_NETWORK,
    SCRIPT_PATH,
    `${args.ifname} ${args.ipaddr} ${args.netmask} ${args.gateway}`
  )
  return setNetExec
}

/**
 * modify netconf
 */
const modNetConfig = async (netconf) => {
  const spinner = ora(
    chalker.info('🚀 Start setting up local network services...')
  ).start()
  try {
    const result = await execSetNetwork(netconf)
    setTimeout(() => {
      spinner.stop()
      if (result) {
        log.success('🎉 Network setup successful ~')
        return result
      }
    }, 500)
  } catch (e) {
    spinner.stop()
    printErrorLog(e)
  }
}

/**
 * dispatcher
 */
const setNetConfig = async (netconf, opts) => {
  if (opts.yes) {
    await modNetConfig(netconf)
  } else {
    let stopped = false
    while (!stopped) {
      const enter = await pressContinue()
      if (enter) {
        stopped = true
        await modNetConfig(netconf)
      }
    }
  }
}

export default setNetConfig
