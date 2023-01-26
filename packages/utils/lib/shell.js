import util from 'node:util'
import path from 'node:path'
import child_process from 'child_process'
import fse from 'fs-extra'
import chalker from './chalk.js'
import { printErrorLog } from './log.js'
import { trimSpace } from './operation.js'

export const runScript = async (filename, scriptPath, params = null) => {
  const scriptFile = path.join(scriptPath, filename)
  fse.chmodSync(scriptFile, '0755')
  const exec = util.promisify(child_process.exec)
  const run = async function () {
    if (params === null) {
      return await exec(`/bin/bash ${filename}`, {
        cwd: scriptPath
      })
    } else {
      return await exec(`/bin/bash ${filename} ${params}`, {
        cwd: scriptPath
      })
    }
  }
  return await run()
    .then((result) => {
      return trimSpace(result.stdout)
    })
    .catch((err) => {
      const errorDetail = {
        code: err.code,
        cmd: err.cmd,
        stdout: trimSpace(err.stdout)
      }
      printErrorLog('error', errorDetail)
      throw new Error(chalker.error('Script internal execution error!'))
    })
}
