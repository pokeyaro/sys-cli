import createNetconfigCommand from '@sys-cli/netconfig'
import createOsconfigCommand from '@sys-cli/osconfig'
import createCLI from './createCLI.js'
import './exception.js'

export default function (args) {
  // Register command
  const program = createCLI()
  // Assembly subcommand
  createNetconfigCommand(program)
  createOsconfigCommand(program)
  // Parsing command
  program.parse(process.argv)
}
