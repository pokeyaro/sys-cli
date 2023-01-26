import chalk from 'chalk'

const prompt = (val) => {
  return chalk.magenta(val)
}

const bolder = (val) => {
  return chalk.bold(val)
}

const infoMsg = (val) => {
  return chalk.cyan(val)
}

const warning = (val) => {
  return chalk.yellowBright(val)
}

const error = (val) => {
  return chalk.bgRedBright(val)
}

const chalker = {
  tips: prompt,
  info: infoMsg,
  warn: warning,
  error: error,
  bold: bolder
}

export default chalker
