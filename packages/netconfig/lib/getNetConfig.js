import { isIPv4 } from 'is-ip'
import { Netmask } from 'netmask'
import { log, makeInput, makeList, runScript, chalker } from '@sys-cli/utils'
import {
  GET_IF_NAME,
  SCRIPT_PATH,
  MAX_MASK_NUM,
  MASK_VALUE_LISTS,
  VALIDATE_IP_DESC,
  VALIDATE_MASK_DESC
} from './constant.js'

/**
 * api: get network info
 */
const getNetInfo = (ipaddr, netmask) => {
  const maskObj = new Netmask(`${ipaddr}/${netmask}`)
  return {
    networkAddress: maskObj.base,
    firstAddress: maskObj.first,
    lastAddress: maskObj.last,
    broadcastAddress: maskObj.broadcast,
    subnetMask: maskObj.mask,
    subnetMaskLength: maskObj.bitmask,
    cidrSubnet: `${ipaddr}/${maskObj.bitmask}`
  }
}

/**
 * validate gateway value
 */
const validateGateway = (v, obj) => {
  const maskObj = new Netmask(obj.cidrSubnet)
  if (isIPv4(v) && maskObj.contains(v)) {
    if (v === obj.networkAddress) {
      return chalker.warn('The network address cannot be used')
    }
    if (v === obj.broadcastAddress) {
      return chalker.warn('The broadcast address cannot be used')
    }
    if (v === obj.cidrSubnet.split('/')[0]) {
      return chalker.warn('The default gateway conflicts with the ip address')
    }
    return true
  }
  return chalker.warn(
    `Please enter a valid default gateway, optional address (${obj.firstAddress}-${obj.lastAddress})`
  )
}

/**
 * validate cidr format
 */
const validateCidr = (cidr) => {
  const cidrSplit = cidr.split('/')
  const ipaddr = cidrSplit[0]
  const bitmask = parseInt(cidrSplit[1], 10)
  if (
    cidrSplit.length !== 2 ||
    !isIPv4(ipaddr) ||
    typeof bitmask !== 'number' ||
    isNaN(bitmask) ||
    0 >= bitmask ||
    bitmask > MAX_MASK_NUM
  ) {
    throw new Error(chalker.warn('cidr format is incorrect'))
  }
  const netmask = MASK_VALUE_LISTS[bitmask - 1]
  return {
    ipaddr,
    netmask
  }
}

/**
 * interactive input box: ip address
 */
const inputIpAddr = () => {
  return makeInput({
    message: 'Please enter IP address',
    defaultValue: '',
    validate(v) {
      return (isIPv4(v) && true) || chalker.warn(VALIDATE_IP_DESC)
    }
  })
}

/**
 * interactive input box: netmask
 */
const inputNetmask = () => {
  return makeInput({
    message: 'Please enter Netmask',
    defaultValue: '',
    validate(v) {
      if (MASK_VALUE_LISTS.includes(v)) {
        return true
      }
      return chalker.warn(VALIDATE_MASK_DESC)
    }
  })
}

/**
 * interactive input box: gateway
 */
const inputGateway = (params) => {
  return makeInput({
    message: 'Please enter Gateway',
    defaultValue: '',
    validate(v) {
      return validateGateway(v, params)
    }
  })
}

/**
 * interactive checkbox: ifname
 */
const inputIfName = (device) => {
  return makeList({
    choices: device,
    message: 'Please enter the nic device number',
    defaultValue: 'eth0',
    loop: false,
    pageSize: 4
  })
}

/**
 * exec shell script: get all nic device names on the host
 */
const ifNameData = async () => {
  const ifNameArr = new Array()
  const ifNameExec = await runScript(GET_IF_NAME, SCRIPT_PATH)
  const ifNameFmt = ifNameExec.replaceAll('\n', ',').split(',')
  ifNameFmt.forEach((element) => {
    if (element.indexOf('unknown') === -1) {
      ifNameArr.push({
        name: element + '\t 🙆🏻',
        value: element.split(' ')[0]
      })
    } else {
      ifNameArr.push({
        name: element + '\t 🙅‍♂️',
        value: element.split(' ')[0]
      })
    }
  })
  // log.verbose('ifNameArr', ifNameArr)
  return ifNameArr
}

/**
 * Interactive and non-interactive options: ifname
 */
const readIfName = async (opts) => {
  const { ifname = null } = opts
  let getIfName
  if (ifname) {
    getIfName = ifname
  } else {
    getIfName = await inputIfName(ifNameData)
  }
  return getIfName
}

/**
 * Interactive and non-interactive options: ipaddr
 */
const readIpAddr = async (opts) => {
  const { ipaddr = null } = opts
  let getIpAddr
  if (ipaddr) {
    if (!isIPv4(ipaddr)) {
      throw new Error(chalker.warn(VALIDATE_IP_DESC))
    }
    getIpAddr = ipaddr
  } else {
    getIpAddr = await inputIpAddr()
  }
  return getIpAddr
}

/**
 * Interactive and non-interactive options: netmask
 */
const readNetmask = async (opts) => {
  const { netmask = null } = opts
  let getNetmask
  if (netmask) {
    if (!MASK_VALUE_LISTS.includes(netmask)) {
      throw new Error(chalker.warn(VALIDATE_MASK_DESC))
    }
    getNetmask = netmask
  } else {
    getNetmask = await inputNetmask()
  }
  return getNetmask
}

/**
 * Interactive and non-interactive options: gateway
 */
const readGateway = async (opts, ...params) => {
  const { gateway = null } = opts
  let getGateway
  if (gateway) {
    const retVal = validateGateway(gateway, ...params)
    if (retVal !== true || typeof retVal === 'string') {
      throw new Error(chalker.warn(retVal))
    }
    getGateway = gateway
  } else {
    getGateway = await inputGateway(...params)
  }
  return getGateway
}

/**
 * dispatcher
 */
const getNetConfig = async (opts) => {
  let addIfName, addIpAddr, addNetmask, addGateway
  // get ifname
  addIfName = await readIfName(opts)
  // use cidr format
  if (opts.cidr) {
    const cidrData = validateCidr(opts.cidr)
    // split ip
    addIpAddr = cidrData.ipaddr
    // split netmask
    addNetmask = cidrData.netmask
  } else {
    // get ip
    addIpAddr = await readIpAddr(opts)
    // get netmask
    addNetmask = await readNetmask(opts)
  }
  // network info
  const netInfo = getNetInfo(addIpAddr, addNetmask)
  log.verbose('netInfo', netInfo)
  // get gw
  addGateway = await readGateway(opts, netInfo)
  // summary
  let container = new Object()
  container = {
    ifname: addIfName,
    ipaddr: addIpAddr,
    netmask: addNetmask,
    gateway: addGateway
  }
  return container
}

export default getNetConfig
