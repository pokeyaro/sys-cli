import log from 'npmlog'
import isDebug from './isDebug.js'
import chalker from './chalk.js'

if (isDebug()) {
  log.level = 'verbose'
} else {
  log.level = 'info'
}

log.heading = chalker.bold('sys-cli')
log.addLevel('success', 2000, { fg: 'green', bg: '', bold: true })
log.addLevel('failed', 5000, { fg: 'yellow', bg: '', bold: true })

export default log

export const printErrorLog = (type, e) => {
  if (isDebug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}
