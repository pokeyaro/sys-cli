import { printErrorLog } from '@sys-cli/utils'

// 监听用于异常处理的粗略机制，仅用作最后的手段
process.on('uncaughtException', (e) => printErrorLog('error', e))

// 监听promise的异常处理
process.on('unhandledRejection', (e) => printErrorLog('promise', e))
