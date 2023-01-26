import path from 'node:path'
import { Netmask } from 'netmask'
import { dirname } from 'dirname-filename-esm'
import { arrayIntRange } from '@sys-cli/utils'

// get directory
const __dirname = dirname(import.meta)

export const SCRIPT_PATH = path.resolve(__dirname, '../script')
export const TEMPLATE_PATH = path.resolve(__dirname, '../template')

// script name
export const GET_OS_RELEASE = 'os-release.sh'
export const GET_IF_NAME = 'ifname-array.sh'
export const SET_NETWORK = 'set-network.sh'

// mask list
export const MASK_VALUE_LISTS = new Array()
export const MAX_MASK_NUM = 32
const numberList = arrayIntRange(MAX_MASK_NUM)
numberList.forEach((num) => {
  const obj = new Netmask(`0.0.0.0/${num}`)
  MASK_VALUE_LISTS.push(obj.mask)
})

// error description
export const VALIDATE_IP_DESC = 'Please enter a valid IPv4 address'
export const VALIDATE_MASK_DESC =
  'Please enter a valid netmask, bitmask 24-29 is recommended'
