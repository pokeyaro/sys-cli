import inquirer from 'inquirer'
import PressToContinuePrompt from 'inquirer-press-to-continue'
import chalker from './chalk.js'

const pressContinue = async () => {
  inquirer.registerPrompt('press-to-continue', PressToContinuePrompt)
  const { key: enterKey } = await inquirer.prompt({
    name: 'key',
    type: 'press-to-continue',
    anyKey: true,
    pressToContinueMessage: chalker.tips('🛰  Press y to continue...')
  })
  if (enterKey.value.toLowerCase() === 'y') {
    console.log('')
    return true
  } else {
    return false
  }
}

export default pressContinue
